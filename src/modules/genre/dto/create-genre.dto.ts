import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({
    description: 'Название жанра',
    type: String,
    example: 'Rock',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  title: string;

  @ApiPropertyOptional({
    description: 'Описание жанра',
    type: String,
    example: 'Рок-музыка',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
