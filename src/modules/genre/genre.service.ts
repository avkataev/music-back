import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Genre } from '@prisma/client';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateGenreDto): Promise<Genre> {
    const { title, description } = dto;

    return await this.prismaService.genre.create({
      data: {
        title,
        description: description || '',
      },
    });
  }

  async findAll(): Promise<Genre[]> {
    return await this.prismaService.genre.findMany({
      orderBy: {
        title: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.prismaService.genre.findUnique({
      where: { id },
    });

    if (!genre) {
      throw new NotFoundException('Жанр не найден');
    }

    return genre;
  }

  async update(id: number, dto: UpdateGenreDto): Promise<Genre> {
    const { title, description } = dto;

    try {
      return await this.prismaService.genre.update({
        where: { id },
        data: {
          ...(title !== undefined && { title }),
          ...(description !== undefined && { description }),
        },
      });
    } catch {
      throw new NotFoundException('Жанр не найден');
    }
  }

  async remove(id: number): Promise<Genre> {
    try {
      return await this.prismaService.genre.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException('Жанр не найден');
    }
  }
}
