import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'Название альбома',
    type: String,
    example: 'Группа крови',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3)
  title: string;

  @ApiPropertyOptional({
    description: 'Год выпуска',
    type: Number,
    example: 1988,
  })
  @IsOptional()
  @IsInt()
  releaseYear?: number;

  @ApiPropertyOptional({
    description: 'Описание альбома',
    type: String,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'URL обложки',
    type: String,
  })
  @IsOptional()
  @IsUrl()
  coverUrl?: string;

  @ApiPropertyOptional({
    description: 'Длительность в секундах',
    type: Number,
    example: 2400,
  })
  @IsOptional()
  @IsInt()
  duration?: number;

  @ApiPropertyOptional({
    description: 'Тип альбома',
    type: String,
    example: 'Studio Album',
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({
    description: 'Жанры',
    type: [String],
    example: ['Rock', 'Post Punk'],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  genres?: string[];

  @ApiPropertyOptional({
    description: 'Языки',
    type: [String],
    example: ['Russian'],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  languages?: string[];

  @ApiPropertyOptional({
    description: 'Страны',
    type: [String],
    example: ['Russia'],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  countries?: string[];

  @ApiPropertyOptional({
    description: 'Города',
    type: [String],
    example: ['Moscow'],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  cities?: string[];
}
