import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import type { Response, Request } from 'express';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';
import type { User } from '@prisma/client';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Регистрация пользователя',
    description: 'Создает нового пользователя и возвращает access token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Пользователь зарегистрирован',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Пользователь с такой почтой уже существует',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return await this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: 'Вход в систему',
    description: 'Аутентифицирует пользователя и возвращает access token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный вход',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден или неверный пароль',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return await this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: 'Обновить токены',
    description: 'Обновляет access token используя refresh token из cookies',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Токены обновлены',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Недействительный refresh-токен',
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'Выход из системы',
    description: 'Удаляет refresh token из cookies',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный выход',
    schema: {
      example: true,
    },
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Authorization()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Получить текущий профиль',
    description: 'Возвращает информацию о текущем пользователе',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Информация о пользователе',
  })
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  me(@Authorized() user: User) {
    return user;
  }

  @Authorization()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Получить информацию о пользователе',
    description: 'Возвращает информацию о пользователе по refresh token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Информация о пользователе',
  })
  @Get('info')
  @HttpCode(HttpStatus.OK)
  async info(@Req() req: Request) {
    return await this.authService.info(req);
  }
}
