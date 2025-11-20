import { OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { movieSeed } from './data/movie.seed';
import { artistSeed } from './data/artist.seed';
import { albumSeed } from './data/album.seed';
import { MovieEntity } from '../movie/entities/movie.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { seedEntity } from './seed.utils';

export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}
  async onModuleInit() {
    await seedEntity(this.movieRepository, movieSeed, 'Movies');
    await seedEntity(this.artistRepository, artistSeed, 'Artists');
    await seedEntity(this.albumRepository, albumSeed, 'Albums');
  }
}
