import { ObjectLiteral, Repository } from 'typeorm';

/**
 * Универсальная функция для сидов.
 * @param repo - Repository вашей сущности (Movie, Album, Artist)
 * @param seedData - Массив объектов (Partial<T>)
 * @param name - Человеческое имя для логов
 */
export async function seedEntity<T extends ObjectLiteral>(
  repo: Repository<T>,
  seedData: Partial<T>[],
  name: string,
) {
  const count = await repo.count();

  if (count > 0) {
    console.log(`⚙️  Skip: ${name} already seeded`);
    return;
  }

  // @ts-ignore
  const entities = seedData.map((item) => repo.create(item));
  await repo.save(entities);
  console.log(`✅ Seed: ${name} created (${entities.length})`);
}
