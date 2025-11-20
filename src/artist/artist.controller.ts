import { Controller, Get, Param } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistEntity } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll(): Promise<ArtistEntity[]> {
    return this.artistService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.artistService.findById(+id);
  }
}
