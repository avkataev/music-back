import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @Length(3)
  title: string;

  @IsOptional()
  @IsInt()
  dateStart?: number;

  @IsOptional()
  @IsString()
  type?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  genres?: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  countries?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  cities?: string[];

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
