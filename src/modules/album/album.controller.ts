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
import { AlbumService } from './album.service';
import { Album } from '@prisma/client';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({
    summary: 'Создание альбома',
    description: 'Создает новый альбом',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Альбом создан' })
  @Post()
  create(@Body() dto: CreateAlbumDto): Promise<Album> {
    return this.albumService.create(dto);
  }

  @ApiOperation({
    summary: 'Получить список альбомов',
    description: 'Возвращает список всех альбомов',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Альбомы найдены' })
  @Get()
  findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @ApiOperation({
    summary: 'Получить альбом по id',
    description: 'Возвращает информацию об альбоме',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Альбом найден' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Альбом не найден',
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.albumService.findById(+id);
  }

  @ApiOperation({
    summary: 'Обновить альбом',
    description: 'Обновляет данные альбома по id',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Альбом обновлен' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Альбом не найден',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    return this.albumService.update(+id, dto);
  }

  @ApiOperation({
    summary: 'Удалить альбом по id',
    description: 'Удаляет альбом из базы данных',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Альбом удален' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Альбом не найден',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumService.remove(+id);
  }
}
