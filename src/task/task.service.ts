import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTaskDto, EditTaskDto, GetTaskByCategory } from './dto';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  getTask(user_id: number) {
    return this.prisma.task.findMany({
      where: {
        user_id
      },
      orderBy:{
        id: "asc"
      }
    })
  }

  getTasksByCategory(user_id: number, dto?: GetTaskByCategory) {

    // IF USER WANT TO GET TASK BY SPECIFIC CATEGORY
    if(dto){
      return this.prisma.task.findMany({
        where: {
          user_id,
          category_id: dto.category_id,
        }
      })
    }

    // IF NOT
    return this.prisma.task.findMany({
      where: {
        user_id
      }
    })
  }

  getTaskById(user_id: number, task_id: number) {
    return this.prisma.task.findFirst({
      where: {
        id: task_id,
        user_id
      }
    })
  }

  async createTask(user_id: number, dto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {
        user_id,
        ...dto
      }
    })
    return task
  } 

  async editTaskById(user_id: number, task_id: number, dto: EditTaskDto) {

    // GET TASK BY ID
    const task = await this.prisma.task.findUnique({
      where: {
        id: task_id
      }
    }) 

     //  CHECK IF USER OWNS THE TASK
    if(!task || task.user_id !== user_id){
      throw new ForbiddenException('Access to resources denied')
    }

     //  UPDATE OLD CATEGORY RECORD
    return this.prisma.task.update({
      where: {
        id: task_id
      },
      data: {
        ...dto
      }
    })


  }

  async deleteTaskById(user_id: number, task_id: number) {

    // GET TASK BY ID
    const task = await this.prisma.task.findUnique({
      where: {
        id: task_id
      }
    }) 

      //  CHECK IF USER OWNS THE TASK
    if(!task || task.user_id !== user_id){
      throw new ForbiddenException('Access to resources denied')
    }

    await this.prisma.task.delete({
      where: {
        id: task_id
      }
    })
  }
}
