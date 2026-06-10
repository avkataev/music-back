import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateConcertDto {
  @ApiProperty({
    description: 'Название концерта',
    type: String,
    example: 'Концерт в Москве',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3)
  title: string;

  @ApiProperty({
    description: 'Дата и время концерта',
    type: String,
    example: '2025-12-31T20:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Страна',
    type: String,
    example: 'Россия',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'Город',
    type: String,
    example: 'Москва',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'Место проведения',
    type: String,
    example: 'Олимпийский',
  })
  @IsString()
  @IsNotEmpty()
  place: string;

  @ApiProperty({
    description: 'Ссылка на покупку билетов',
    type: String,
    example: 'https://tickets.ru/concert/123',
  })
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiPropertyOptional({
    description: 'ID артистов',
    type: [Number],
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  artistIds?: number[];
}
