import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
