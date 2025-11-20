import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }
  async findById(id: number): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({
      where: { id: id },
      relations: ['artists'],
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }
}
