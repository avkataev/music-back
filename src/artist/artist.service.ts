import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}
  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }
  async findById(id: number): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne({
      where: { id: id },
      relations: ['albums'],
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }
}
