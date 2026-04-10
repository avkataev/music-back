import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from '@prisma/client';
import { ApiResponse } from '@nestjs/swagger';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiResponse({ status: HttpStatus.OK, description: 'Исполнитель создан' })
  @Post()
  create(@Body() dto: CreateArtistDto) {
    return this.albumService.create(dto);
  }

  @Get()
  findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.albumService.findById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumService.remove(+id);
  }
}
