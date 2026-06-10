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
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Concert } from '@prisma/client';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @ApiOperation({
    summary: 'Создание концерта',
    description: 'Создает новый концерт',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Концерт создан' })
  @Post()
  create(@Body() dto: CreateConcertDto): Promise<Concert> {
    return this.concertService.create(dto);
  }

  @ApiOperation({
    summary: 'Получить список концертов',
    description: 'Возвращает список всех концертов',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Концерты найдены' })
  @Get()
  findAll(): Promise<Concert[]> {
    return this.concertService.findAll();
  }

  @ApiOperation({
    summary: 'Получить концерт по id',
    description: 'Возвращает информацию о концерте',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Концерт найден' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Концерт не найден',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concertService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Обновить концерт',
    description: 'Обновляет данные концерта по id',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Концерт обновлен' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Концерт не найден',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateConcertDto) {
    return this.concertService.update(+id, dto);
  }

  @ApiOperation({
    summary: 'Удалить концерт по id',
    description: 'Удаляет концерт из базы данных',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Концерт удален' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Концерт не найден',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concertService.remove(+id);
  }
}
