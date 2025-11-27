import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Artist } from '@prisma/client';
import { CreateArtistDto } from './dto/create.artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dto: CreateArtistDto): Promise<Artist> {
    const title = dto.title;
    const artist = await this.prismaService.artist.create({
      data: {
        title,
      },
    });
    return artist;
  }
  async findAll() {
    return await this.prismaService.artist.findMany();
  }
  async findById(id: number): Promise<Artist> {
    const artist = await this.prismaService.artist.findUnique({
      where: { id: id },
      include: {
        albums: true,
      },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }
}
