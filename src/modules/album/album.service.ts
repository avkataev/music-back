import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Album } from '@prisma/client';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateAlbumDto) {
    return await this.prismaService.album.create({
      data: dto,
    });
  }
  async findAll(): Promise<Album[]> {
    return await this.prismaService.album.findMany();
  }
  async findById(id: number): Promise<Album> {
    const album = await this.prismaService.album.findUnique({
      where: { id: id },
      include: {
        artists: true,
        tracks: true,
      },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }
  async remove(id: number) {
    const album = await this.prismaService.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return await this.prismaService.album.delete({
      where: { id },
    });
  }
}
