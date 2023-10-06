import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string
}

export class EditCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string
}