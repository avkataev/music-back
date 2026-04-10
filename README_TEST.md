# Задание №1

```prisma
model User {
    id           String        @id @default(uuid())
    email        String        @unique
    password     String
    name         String
    role         Role          @default(USER)
    createdAt    DateTime      @default(now())
    updatedAt    DateTime      @updatedAt()
    
    @@map("users")
}

model Subscription {
    id                  String   @id @default(uuid())
    userId              String
    status              SubscriptionStatus
    currentPeriodStart  DateTime
    currentPeriodEnd    DateTime
    createdAt           DateTime @default(now())
    updatedAt           DateTime @updatedAt()
    
    user User @relation(fields: [userId], references: [id])
    
    @@index([userId])
    @@index([status])
    
    @@map("subscriptions")
}

model Payment {
    id                 String        @id @default(uuid())
    externalPaymentId  String        @unique
    userId             String?
    amount             Int
    currency           String
    status             PaymentStatus
    paidAt             DateTime?
    createdAt          DateTime      @default(now())
    
    user User? @relation(fields: [userId], references: [id])
    
    @@index([userId])
    @@index([status])
    
    @@map("payments")
}

model WebhookEvent {
    id                String             @id @default(uuid())
    providerEventId   String             @unique
    eventType         String
    payload           Json
    status            WebhookEventStatus
    error             String?
    createdAt         DateTime           @default(now())
    processedAt       DateTime?
    
    @@index([status])
    @@index([createdAt])

    @@map("webhook_events")
}

enum SubscriptionStatus {
  active
  expired
  canceled
}

enum PaymentStatus {
  pending
  succeeded
  failed
}

enum WebhookEventStatus {
  received
  processed
  failed
}

```

# Задание №2
## Controller
```ts
@Controller('/webhooks/payment')
export class PaymentWebhookController {
  constructor(private readonly service: PaymentWebhookService) {}

  @Post()
  async handle(@Req() req: Request, @Res() res: Response) {
    try {
      await this.service.process(req);
      return res.status(HttpStatus.OK).json({ ok: true });
    } catch (err: any) {
      if (err.status) {
        return res.status(err.status).json({ error: err.message });
      }

      // 5xx → провайдер должен ретраить
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'internal error' });
    }
  }
}
```
## Service
1) Валидация данных
проверка providerEventId, externalPaymentId, amount, eventType
в случае провала 400 ошибка 
2) Дедупликация webhook
Проверяем providerEventId, если уже есть такой ретёрним
Если нет, создаем новый

3) Сохраняем webhook
- дедупликация payment
- создание payment
- активация/продление subscription
- завершаем webhook
```ts
@Injectable()
export class PaymentWebhookService {
  async process(req: Request): Promise<void> {
    /* ----------------------------------------------
       1. Получение raw body
    ---------------------------------------------- */

    const rawBody = (req as any).rawBody as Buffer;
    if (!rawBody) {
      throw { status: 400, message: 'Empty body' };
    }

    let payload: any;
    try {
      payload = JSON.parse(rawBody.toString());
    } catch {
      throw { status: 400, message: 'Invalid JSON' };
    }

    /* ----------------------------------------------
       2. Валидация входа
    ---------------------------------------------- */

    const {
      providerEventId,
      externalPaymentId,
      amount,
      currency,
      paidAt,
      eventType,
    } = payload;

    if (!providerEventId || !externalPaymentId || !amount || !eventType) {
      throw { status: 400, message: 'Missing required fields' };
    }

    /* ----------------------------------------------
       3. Проверка подписи
    ---------------------------------------------- */

    const signature = req.headers['x-signature'] as string;
    if (!this.verifySignature(rawBody, signature)) {
      throw { status: 401, message: 'Invalid signature' };
    }

    /* ----------------------------------------------
       4. Дедупликация webhook
    ---------------------------------------------- */

    const existingEvent = await prisma.webhookEvent.findUnique({
      where: { providerEventId },
    });

    if (existingEvent) {
      // Повторный webhook — норма
      return;
    }

    /* ----------------------------------------------
       5. Сохраняем webhook_event (до бизнес-логики)
    ---------------------------------------------- */

    await prisma.webhookEvent.create({
      data: {
        providerEventId,
        eventType,
        payload,
        status: 'received',
      },
    });

    /* ----------------------------------------------
       6. Транзакция
    ---------------------------------------------- */

    await prisma.$transaction(async (tx) => {
      /* --------------------------------------------
         7. Дедупликация payment
      -------------------------------------------- */

      const existingPayment = await tx.payment.findUnique({
        where: { externalPaymentId },
      });

      if (existingPayment) {
        await tx.webhookEvent.update({
          where: { providerEventId },
          data: {
            status: 'processed',
            processedAt: new Date(),
          },
        });
        return;
      }

      /* --------------------------------------------
         8. Создание payment
      -------------------------------------------- */

      const payment = await tx.payment.create({
        data: {
          externalPaymentId,
          amount,
          currency,
          status: 'succeeded',
          paidAt: paidAt ? new Date(paidAt) : new Date(),
          userId: await this.resolveUserId(payload),
        },
      });

      /* --------------------------------------------
         9. Активация / продление subscription
      -------------------------------------------- */

      if (payment.userId) {
        const now = new Date();

        const subscription = await tx.subscription.findFirst({
          where: { userId: payment.userId },
        });

        if (!subscription) {
          await tx.subscription.create({
            data: {
              userId: payment.userId,
              status: 'active',
              currentPeriodStart: payment.paidAt ?? now,
              currentPeriodEnd: this.addOneMonth(payment.paidAt ?? now),
            },
          });
        } else {
          const periodStart =
            subscription.currentPeriodEnd > now
              ? subscription.currentPeriodEnd
              : now;

          await tx.subscription.update({
            where: { id: subscription.id },
            data: {
              status: 'active',
              currentPeriodStart: periodStart,
              currentPeriodEnd: this.addOneMonth(periodStart),
            },
          });
        }
      }

      /* --------------------------------------------
         10. Завершение webhook_event
      -------------------------------------------- */

      await tx.webhookEvent.update({
        where: { providerEventId },
        data: {
          status: 'processed',
          processedAt: new Date(),
        },
      });
    });
  }

  /* ======================================================
     Helpers
  ====================================================== */

  private verifySignature(rawBody: Buffer, signature?: string): boolean {
    if (!signature) return false;

    const expected = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(signature),
    );
  }

  private async resolveUserId(payload: any): Promise<string | null> {
    if (!payload.email) return null;

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    return user?.id ?? null;
  }

  private addOneMonth(date: Date): Date {
    const d = new Date(date);
    d.setMonth(d.getMonth() + 1);
    return d;
  }
}
```

# Задание №3
## webhook пришел дважды
- проверяем providerEventId
- находим запись в webhook_events
- ничего не делаем, возвращаем 200 OK
## webhook пришел раньше создания user
- ? отсечение на валидации данных
- 
- создаём payment с userId = NULL
- подписку не активируем
- позже связываем payment с user (job / при создании user)
## webhook пришел без email, но есть externalPaymentId
- принимаем webhook
- создаём payment по externalPaymentId
- email не обязателен для идемпотентности
- user можно определить позже
## webhook пришел с другой суммой, чем план
- создаём payment со статусом failed или manual_review
- подписку не трогаем
- логируем инцидент
## webhook пришел через неделю
- используем paidAt из webhook
- продлеваем подписку от:
  - currentPeriodEnd, если подписка ещё активна
  - иначе от paidAt
## сервер упал после записи payment, но до subscription
- следующий webhook:
  - увидит существующий payment
  - безопасно завершит обновление subscription
- дублей не будет
# Задание №4 (Debuggability и наблюдаемость)
