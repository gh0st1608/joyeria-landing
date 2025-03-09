import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskMongoose } from '../infrastructure/schemas/task.schema';
import { ITaskRepository } from '../domain/repository/task.repository';
import { Task } from '../domain/entities/task.entity';

@Injectable()
export class TaskMongoRepository implements ITaskRepository {
  constructor(
    @InjectModel(TaskMongoose.name) private taskModel: Model<TaskMongoose>,
  ) {}

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    return tasks.map(task => new Task(task.id, task.title, task.description, task.completed));
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    return new Task(task.id, task.title, task.description, task.completed);
  }

  async create(task: Task): Promise<Task> {
    const created = await this.taskModel.create(task);
    return new Task(created.id, created.title, created.description, created.completed);
  }

  async update(id: string, task: Partial<Task>): Promise<Task> {
    const updated = await this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
    return new Task(updated.id, updated.title, updated.description, updated.completed);
  }

  async delete(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id).exec();
  }
}