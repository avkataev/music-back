import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from '@prisma/client';
import { CreateArtistDto } from './dto/create.artist.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateArtistDto } from './dto/update.artist.dto';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { Authorized } from '../auth/decorators/authorized.decorator';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({
    summary: 'Создание исполнителя',
    description: 'Создает исполнителя',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Исполнитель создан' })
  @Post()
  create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @Authorization()
  @ApiOperation({
    summary: 'Получить список исполнителей',
    description: 'Возвращает список всех исполнителей',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Исполнители найдены' })
  @Get()
  findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Authorization()
  @ApiOperation({
    summary: 'Получить исполнителя по id',
    description: 'Возвращает информацию об исполнителе',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Исполнитель найден' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Исполнитель не найден',
  })
  @Get(':id')
  findById(@Param('id') id: string, @Authorized('id') userId: string) {
    return this.artistService.findById(+id, userId);
  }

  @ApiOperation({
    summary: 'Удалить исполнителя по id',
    description: 'Удаляет исполнителя из базы данных',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Исполнитель удален' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Исполнитель не найден',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistService.remove(+id);
  }

  @ApiOperation({
    summary: 'Обновить исполнителя',
    description: 'Обновляет данные исполнителя по id',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Исполнитель обновлен' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Исполнитель не найден',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateArtistDto) {
    return this.artistService.update(+id, dto);
  }

  @Authorization()
  @Post(':id/toggle-like')
  async toggleArtistLike(
    @Param('id') artistId: string,
    @Authorized('id') userId: string,
  ) {
    return this.artistService.toggleArtistLike(userId, +artistId);
  }
}
