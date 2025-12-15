import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginRequest {
  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({ message: 'Почта не может быть пустой' })
  @IsEmail({}, { message: 'Некорректный формат почты' })
  email: string;

  @IsString({ message: 'Пароль должно быть строкой' })
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @MinLength(6, { message: 'Пароль не может быть меньше 6 символов' })
  @MaxLength(128, { message: 'Пароль не может быть превышать 128 символов' })
  password: string;
}
