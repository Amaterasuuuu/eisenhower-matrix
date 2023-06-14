import { TaskType } from 'src/task/enum';

export class CreateTaskCommand {
  constructor(
    public readonly title: string,
    public readonly desctiption: string,
    public readonly type: TaskType,
    public readonly date?: Date,
    public readonly deadline?: Date,
  ) {}
}
