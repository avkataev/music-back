import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from '../movie/entities/movie.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, ArtistEntity, AlbumEntity])],
  providers: [SeedService],
})
export class SeedModule {}
