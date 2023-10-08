import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class GetTaskByCategory {
  @IsNumber()
  @IsOptional()
  category_id?: number
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  category_id: number
}

export class EditTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  category_id: number
  
}