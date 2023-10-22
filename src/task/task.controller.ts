import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@src/auth/guard';
import { TaskService } from './task.service';
import { GetUser } from '@src/auth/decorator';
import { CreateTaskDto, EditTaskDto, GetTaskByCategory } from './dto';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  

  @Get('all')
  getTask(@GetUser('id') user_id: number) {
    return this.taskService.getTask(user_id)
  }

  @Get('category')
  getTasksByCategory(
    @GetUser('id') user_id: number,
    @Body() dto?: GetTaskByCategory
  ) {
      return this.taskService.getTasksByCategory(user_id, dto)
  }

  @Get(':id')
  getTaskById(
    @GetUser('id') user_id: number,
    @Param('id', ParseIntPipe) task_id: number
  ) {
    return this.taskService.getTaskById(user_id, task_id)
  }

  @Post('create')
  createTask(@GetUser('id') user_id: number, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(user_id, dto)
  } 

  @Patch(':id')
  editTaskById(
    @GetUser('id') user_id: number,
    @Param('id', ParseIntPipe) task_id: number,
    @Body() dto: EditTaskDto
  ) {
    return this.taskService.editTaskById(user_id, task_id, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTaskById(
    @GetUser('id') user_id: number,
    @Param('id', ParseIntPipe) task_id: number
  ) {
    return this.taskService.deleteTaskById(user_id, task_id)
  }
}
