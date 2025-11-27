import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Album } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Album[]> {
    return await this.prismaService.album.findMany();
  }
  async findById(id: number): Promise<Album> {
    const album = await this.prismaService.album.findUnique({
      where: { id: id },
      include: {
        artists: true,
      },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }
}
