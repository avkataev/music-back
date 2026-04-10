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
  @IsString()
  @IsNotEmpty()
  @Length(3)
  title: string;

  @IsOptional()
  @IsInt()
  releaseYear?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  coverUrl?: string;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsString()
  type?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  genres?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  languages?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  countries?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  cities?: string[];
}
