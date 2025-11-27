import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from '@prisma/client';
import { CreateArtistDto } from './dto/create.artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post('create')
  create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }
  @Get()
  findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.artistService.findById(+id);
  }
}
