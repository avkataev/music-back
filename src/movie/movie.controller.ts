import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('movies')
export class MovieController {
  // constructor(private readonly movieService: MovieService) {}
  //
  // @Get()
  // findAll(): Promise<MovieEntity[]> {
  //   return this.movieService.findAll();
  // }
  //
  // @Post()
  // create(@Body() dto: CreateMovieDto) {
  //   return this.movieService.create(dto);
  // }
}
