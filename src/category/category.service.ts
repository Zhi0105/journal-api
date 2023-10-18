import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCategoryDto, EditCategoryDto } from './dto';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  getCategories(user_id: number) {
    return this.prisma.category.findMany({
      where: {
        user_id
      },
      orderBy:{
        id: "asc"
      }
    })
  }

  getCategoryById(user_id:number, category_id: number) {
    return this.prisma.category.findFirst({
      where: {
        id: category_id,
        user_id
      }
    })
  }

  async createCategory(user_id:number, dto: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: {
        user_id,
        ...dto
      }
    })

    return category
  } 

  async editCategoryById(user_id: number, category_id: number, dto: EditCategoryDto) {
    
    // GET CATEGORY BY ID
    const category = await this.prisma.category.findUnique({
      where: {
        id: category_id
      }
    }) 

    //  CHECK IF USER OWNS THE CATEGORY
    if(!category || category.user_id !== user_id){
      throw new ForbiddenException('Access to resources denied')
    }

    //  UPDATE OLD CATEGORY RECORD
    return this.prisma.category.update({
      where: {
        id: category_id
      },
      data: {
        ...dto
      }
    })

  }

  async deleteCategoryById(user_id: number, category_id: number) {

     // GET CATEGORY BY ID
    const category = await this.prisma.category.findUnique({
      where: {
        id: category_id
      }
    }) 

    //  CHECK IF USER OWNS THE CATEGORY
    if(!category || category.user_id !== user_id){
      throw new ForbiddenException('Access to resources denied')
    }

    await this.prisma.category.delete({
      where: {
        id: category_id
      }
    })
  }
}
