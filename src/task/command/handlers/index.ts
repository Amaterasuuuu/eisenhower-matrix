import { Provider } from '@nestjs/common';
import { CreateTaskHandler } from './create-task.handler';
import { DeleteTaskHandler } from './delete-task.handler';
import { CompleteTaskHandler } from './complete-task.handler';

export const CommandHandlers: Provider[] = [
  CreateTaskHandler,
  CompleteTaskHandler,
  DeleteTaskHandler,
];
