import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/task/entity';
import { ITask } from 'src/task/interface';
import { CreateTaskCommand } from '../commands';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<ITask>,
  ) {}

  async execute(command: CreateTaskCommand): Promise<ITask> {
    const { title, desctiption, type, date = new Date(), deadline } = command;

    const day = new Date(date);
    if (isNaN(day.getDate())) {
      throw new BadRequestException('Invalid Date!');
    }
    const timezone = day.getTimezoneOffset();
    day.setHours(0, 0 - timezone, 1);

    const exist = await this.taskModel.findOne({
      title,
      date: {
        $gt: day.getTime(),
        $lt: day.getTime() + 24 * 60 * 59 * 1000,
      },
    });
    if (exist) {
      throw new ConflictException(
        'Task with similar title for this day is already exists!',
      );
    }

    const newTask = new this.taskModel({
      title,
      desctiption,
      type,
      date,
      deadline,
    });

    return await newTask.save();
  }
}
