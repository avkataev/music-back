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
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { News } from '@prisma/client';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({
    summary: 'Создание новости',
    description: 'Создает новую новость',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Новость создана' })
  @Post()
  create(@Body() dto: CreateNewsDto): Promise<News> {
    return this.newsService.create(dto);
  }

  @ApiOperation({
    summary: 'Получить список новостей',
    description: 'Возвращает список всех новостей',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Новости найдены' })
  @Get()
  findAll(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @ApiOperation({
    summary: 'Получить новость по id',
    description: 'Возвращает информацию о новости',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Новость найдена' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Новость не найдена',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Обновить новость',
    description: 'Обновляет данные новости по id',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Новость обновлена' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Новость не найдена',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
    return this.newsService.update(+id, dto);
  }

  @ApiOperation({
    summary: 'Удалить новость по id',
    description: 'Удаляет новость из базы данных',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Новость удалена' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Новость не найдена',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
