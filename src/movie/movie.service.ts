import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {
  // constructor(
  //   @InjectRepository(MovieEntity)
  //   private readonly movieRepository: Repository<MovieEntity>,
  // ) {}
  //
  // async findAll(): Promise<MovieEntity[]> {
  //   return await this.movieRepository.find();
  // }
  //
  // async create(dto: CreateMovieDto): Promise<MovieEntity> {
  //   const movie = this.movieRepository.create(dto);
  //   return await this.movieRepository.save(movie);
  // }
}
