import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    description: 'Название трека',
    type: String,
    example: 'Группа крови',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3)
  title: string;

  @ApiPropertyOptional({
    description: 'Позиция в альбоме',
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  position?: number;

  @ApiPropertyOptional({
    description: 'Длительность трека',
    type: String,
    example: '4:35',
  })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiPropertyOptional({
    description: 'Текст песни',
    type: String,
  })
  @IsOptional()
  @IsString()
  lyrics?: string;

  @ApiProperty({
    description: 'ID альбома',
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  albumId: number;

  @ApiPropertyOptional({
    description: 'ID артистов (feat)',
    type: [Number],
    example: [2, 3],
  })
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  featArtistIds?: number[];
}
