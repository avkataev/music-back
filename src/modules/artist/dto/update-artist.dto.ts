import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateArtistDto {
  @ApiProperty({
    description: 'Название исполнителяы',
    type: String,
    example: 'Кино',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3)
  title: string;

  @ApiPropertyOptional({
    description: 'Дата рождения или дата создания',
    type: Number,
    example: 1985,
  })
  @IsOptional()
  @IsInt()
  dateStart?: number;

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

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  countries?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  cities?: string[];

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
