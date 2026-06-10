import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Track } from '@prisma/client';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateTrackDto): Promise<Track> {
    const { title, position, duration, lyrics, albumId, featArtistIds } = dto;

    return await this.prismaService.track.create({
      data: {
        title,
        position,
        duration,
        lyrics,
        albumId,
        ...(featArtistIds?.length && {
          feat: { connect: featArtistIds.map((id) => ({ id })) },
        }),
      },
      include: {
        artists: true,
        feat: true,
        album: true,
      },
    });
  }

  async findAll(): Promise<Track[]> {
    return await this.prismaService.track.findMany({
      include: {
        artists: true,
        feat: true,
        album: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number): Promise<Track> {
    const track = await this.prismaService.track.findUnique({
      where: { id },
      include: {
        artists: true,
        feat: true,
        album: true,
      },
    });

    if (!track) {
      throw new NotFoundException('Трек не найден');
    }

    return track;
  }

  async update(id: number, dto: UpdateTrackDto): Promise<Track> {
    const { title, position, duration, lyrics, albumId, featArtistIds } = dto;

    try {
      return await this.prismaService.track.update({
        where: { id },
        data: {
          ...(title !== undefined && { title }),
          ...(position !== undefined && { position }),
          ...(duration !== undefined && { duration }),
          ...(lyrics !== undefined && { lyrics }),
          ...(albumId !== undefined && { albumId }),
          ...(featArtistIds !== undefined && {
            feat: {
              set: featArtistIds.map((id) => ({ id })),
            },
          }),
        },
        include: {
          artists: true,
          feat: true,
          album: true,
        },
      });
    } catch {
      throw new NotFoundException('Трек не найден');
    }
  }

  async remove(id: number): Promise<Track> {
    try {
      return await this.prismaService.track.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException('Трек не найден');
    }
  }
}
