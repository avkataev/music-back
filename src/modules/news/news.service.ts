import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { News } from '@prisma/client';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateNewsDto): Promise<News> {
    const { title, description, artistId } = dto;

    return await this.prismaService.news.create({
      data: {
        title,
        description,
        artistId,
      },
      include: {
        artist: true,
      },
    });
  }

  async findAll(): Promise<News[]> {
    return await this.prismaService.news.findMany({
      include: {
        artist: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number): Promise<News> {
    const news = await this.prismaService.news.findUnique({
      where: { id },
      include: {
        artist: true,
      },
    });

    if (!news) {
      throw new NotFoundException('Новость не найдена');
    }

    return news;
  }

  async update(id: number, dto: UpdateNewsDto): Promise<News> {
    const { title, description, artistId } = dto;

    try {
      return await this.prismaService.news.update({
        where: { id },
        data: {
          ...(title !== undefined && { title }),
          ...(description !== undefined && { description }),
          ...(artistId !== undefined && { artistId }),
        },
        include: {
          artist: true,
        },
      });
    } catch {
      throw new NotFoundException('Новость не найдена');
    }
  }

  async remove(id: number): Promise<News> {
    try {
      return await this.prismaService.news.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException('Новость не найдена');
    }
  }
}
