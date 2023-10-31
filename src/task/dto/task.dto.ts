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

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @IsNotEmpty()
  category_id: number
}

export class EditTaskDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  status?: string
  
  @IsNumber()
  @IsNotEmpty()
  category_id: number
  
}