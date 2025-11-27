import { Controller, Get, Param } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from '@prisma/client';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.albumService.findById(+id);
  }
}
