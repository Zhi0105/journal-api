import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@src/auth/guard';
import { CategoryService } from './category.service';
import { GetUser } from '@src/auth/decorator';
import { CreateCategoryDto, EditCategoryDto } from './dto';


@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('all')
  getCategories(@GetUser('id') user_id: number) {
    return this.categoryService.getCategories(user_id)
  }

  @Get(':id')
  getCategoryById(
    @GetUser('id') user_id: number,
    @Param('id', ParseIntPipe) category_id: number
    ) {
      return this.categoryService.getCategoryById(user_id, category_id)  
    }

  @Post('create')
  createCategory(@GetUser('id') user_id: number, @Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(user_id, dto)
  } 

  @Patch(':id')
  editCategoryById(
    @GetUser('id') user_id: number,
    @Param('id', ParseIntPipe) category_id: number,
    @Body() dto: EditCategoryDto
    ) {
    return this.categoryService.editCategoryById(user_id, category_id, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCategoryById(
    @GetUser('id') user_id: number,
    @Param('id', ParseIntPipe) category_id: number
  ) {
    return this.categoryService.deleteCategoryById(user_id, category_id)
  }
}
