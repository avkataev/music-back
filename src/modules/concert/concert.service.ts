import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Concert } from '@prisma/client';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@Injectable()
export class ConcertService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateConcertDto): Promise<Concert> {
    const { title, date, country, city, place, link, artistIds } = dto;

    return await this.prismaService.concert.create({
      data: {
        title,
        date: new Date(date),
        country,
        city,
        place,
        link,
        ...(artistIds?.length && {
          artists: { connect: artistIds.map((id) => ({ id })) },
        }),
      },
      include: {
        artists: true,
      },
    });
  }

  async findAll(): Promise<Concert[]> {
    return await this.prismaService.concert.findMany({
      include: {
        artists: true,
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<Concert> {
    const concert = await this.prismaService.concert.findUnique({
      where: { id },
      include: {
        artists: true,
      },
    });

    if (!concert) {
      throw new NotFoundException('Концерт не найден');
    }

    return concert;
  }

  async update(id: number, dto: UpdateConcertDto): Promise<Concert> {
    const { title, date, country, city, place, link, artistIds } = dto;

    try {
      return await this.prismaService.concert.update({
        where: { id },
        data: {
          ...(title !== undefined && { title }),
          ...(date !== undefined && { date: new Date(date) }),
          ...(country !== undefined && { country }),
          ...(city !== undefined && { city }),
          ...(place !== undefined && { place }),
          ...(link !== undefined && { link }),
          ...(artistIds !== undefined && {
            artists: {
              set: artistIds.map((id) => ({ id })),
            },
          }),
        },
        include: {
          artists: true,
        },
      });
    } catch {
      throw new NotFoundException('Концерт не найден');
    }
  }

  async remove(id: number): Promise<Concert> {
    try {
      return await this.prismaService.concert.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException('Концерт не найден');
    }
  }
}
