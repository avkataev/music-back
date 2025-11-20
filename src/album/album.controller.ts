import { Controller, Get, Param } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumEntity } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll(): Promise<AlbumEntity[]> {
    return this.albumService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.albumService.findById(+id);
  }
}
