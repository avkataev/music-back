import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Album } from '@prisma/client';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

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
  async update(id: number, dto: UpdateAlbumDto): Promise<Album> {
    try {
      return await this.prismaService.album.update({
        where: { id },
        data: dto,
        include: {
          artists: true,
          tracks: true,
        },
      });
    } catch {
      throw new NotFoundException('Альбом не найден');
    }
  }

  async remove(id: number): Promise<Album> {
    try {
      return await this.prismaService.album.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException('Альбом не найден');
    }
  }
}
