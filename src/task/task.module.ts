import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entity/task.model';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './command/handlers';
import { TaskController } from './task.controller';
import { QueryHandlers } from './query';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    CqrsModule,
  ],
  controllers: [TaskController],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class TaskModule {}
