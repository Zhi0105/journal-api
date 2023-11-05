import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

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

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  start_date: Date

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  end_date: Date
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

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  start_date?: Date

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  end_date?: Date
  
  @IsNumber()
  @IsNotEmpty()
  category_id: number
  
}