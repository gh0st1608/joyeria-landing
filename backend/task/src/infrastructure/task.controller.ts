import { Controller, Get, Post, Put, Delete, Body, Param, Inject } from '@nestjs/common';
import { ITaskRepository } from '../domain/repository/task.repository';
import { Task } from '../domain/entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  @Get()
  findAll() {
    return this.taskRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskRepository.findById(id);
  }

  @Post()
  create(@Body() task: Task) {
    return this.taskRepository.create(task);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() task: Partial<Task>) {
    return this.taskRepository.update(id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskRepository.delete(id);
  }
}