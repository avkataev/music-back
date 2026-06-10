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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Track } from '@prisma/client';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({
    summary: 'Создание трека',
    description: 'Создает новый трек',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Трек создан' })
  @Post()
  create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @ApiOperation({
    summary: 'Получить список треков',
    description: 'Возвращает список всех треков',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Треки найдены' })
  @Get()
  findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @ApiOperation({
    summary: 'Получить трек по id',
    description: 'Возвращает информацию о треке',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Трек найден' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Трек не найден',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Обновить трек',
    description: 'Обновляет данные трека по id',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Трек обновлен' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Трек не найден',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    return this.trackService.update(+id, dto);
  }

  @ApiOperation({
    summary: 'Удалить трек по id',
    description: 'Удаляет трек из базы данных',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Трек удален' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Трек не найден',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackService.remove(+id);
  }
}
