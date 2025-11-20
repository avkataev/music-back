import { IsString, IsNotEmpty, Length, IsBoolean } from "class-validator";

export class UpdateTaskDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    title: string;
    
    @IsBoolean()
    isCompleted: boolean;
}