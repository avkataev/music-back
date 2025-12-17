import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Artist } from '@prisma/client';
import { CreateArtistDto } from './dto/create.artist.dto';
import { UpdateArtistDto } from './dto/update.artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dto: CreateArtistDto): Promise<Artist> {
    const {
      title,
      dateStart,
      type,
      genres,
      description,
      countries,
      cities,
      imageUrl,
    } = dto;

    return await this.prismaService.artist.create({
      data: {
        title,
        dateStart,
        type,
        genres,
        description,
        countries,
        cities,
        imageUrl,
      },
    });
  }
  async findAll() {
    return await this.prismaService.artist.findMany();
  }
  async findById(id: number, userId: string) {
    const artist = await this.prismaService.artist.findUnique({
      where: { id: id },
      include: {
        albums: true,
      },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    // 2. Считаем общее количество лайков
    const totalLikes = await this.prismaService.artistLike.count({
      where: { artistId: id },
    });

    // 3. Проверяем, лайкал ли текущий пользователь
    let likedByMe = false;
    if (userId) {
      const existing = await this.prismaService.artistLike.findUnique({
        where: { userId_artistId: { userId, artistId: id } },
      });
      likedByMe = !!existing;
    }
    // 4. Возвращаем объединённый объект
    return {
      ...artist,
      totalLikes,
      likedByMe,
    };
  }
  async remove(id: number) {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return await this.prismaService.artist.delete({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateArtistDto): Promise<Artist> {
    const {
      title,
      dateStart,
      type,
      genres,
      description,
      countries,
      cities,
      imageUrl,
    } = dto;

    const artist = await this.prismaService.artist.update({
      where: { id },
      data: {
        title,
        dateStart,
        type,
        genres,
        description,
        countries,
        cities,
        imageUrl,
      },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async toggleArtistLike(userId: string, artistId: number) {
    // Проверяем, есть ли лайк
    const existing = await this.prismaService.artistLike.findUnique({
      where: { userId_artistId: { userId, artistId } },
    });

    if (existing) {
      // Если есть — удаляем
      await this.prismaService.artistLike.delete({
        where: { userId_artistId: { userId, artistId } },
      });
      return { liked: false };
    } else {
      // Если нет — создаём
      await this.prismaService.artistLike.create({
        data: { userId, artistId },
      });
      return { liked: true };
    }
  }
}
