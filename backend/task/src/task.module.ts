import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskMongoose, TaskSchema } from './infrastructure/schemas/task.schema';
import { TaskMongoRepository } from './infrastructure/task.repository';
import { TaskController } from './infrastructure/task.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TaskMongoose.name, schema: TaskSchema }])
  ],
  controllers: [TaskController],
  providers: [
    {
      provide: 'ITaskRepository',
      useClass: TaskMongoRepository,
    }
  ]
})
export class TaskModule {}