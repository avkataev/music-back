import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Genre } from '@prisma/client';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiOperation({
    summary: 'Создание жанра',
    description: 'Создает новый жанр',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Жанр создан' })
  @Post()
  create(@Body() dto: CreateGenreDto): Promise<Genre> {
    return this.genreService.create(dto);
  }

  @ApiOperation({
    summary: 'Получить список жанров',
    description: 'Возвращает список всех жанров',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Жанры найдены' })
  @Get()
  findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @ApiOperation({
    summary: 'Получить жанр по id',
    description: 'Возвращает информацию о жанре',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Жанр найден' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Жанр не найден',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Обновить жанр',
    description: 'Обновляет данные жанра по id',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Жанр обновлен' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Жанр не найден',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGenreDto) {
    return this.genreService.update(+id, dto);
  }

  @ApiOperation({
    summary: 'Удалить жанр по id',
    description: 'Удаляет жанр из базы данных',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Жанр удален' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Жанр не найден',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
