import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({
    description: 'Заголовок новости',
    type: String,
    example: 'Новый альбом исполнителя',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3)
  title: string;

  @ApiProperty({
    description: 'Описание новости',
    type: String,
    example: 'Исполнитель анонсировал новый альбом',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'ID артиста',
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  artistId: number;
}
