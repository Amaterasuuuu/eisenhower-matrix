import {
  Query,
  Param,
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiTags,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ExceptionDto, FindByIdDto, SuccessDto } from '../utils';
import { Task } from './entity';
import { ITask } from './interface';
import { CreateTaskDto, GetAllTasksDto, GetAllTasksResponse } from './dto';
import {
  CompleteTaskCommand,
  CreateTaskCommand,
  DeleteTaskCommand,
} from './command';
import { GetAllTasksQuery } from './query';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get list of tasks by each type and a such date' })
  @ApiOkResponse({ description: 'List of tasks', type: GetAllTasksResponse })
  @ApiBadRequestResponse({ description: 'Invalid Date!', type: ExceptionDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ExceptionDto })
  async findAll(
    @Query() { page, limit, date }: GetAllTasksDto,
  ): Promise<GetAllTasksResponse> {
    return await this.queryBus.execute(new GetAllTasksQuery(page, limit, date));
  }

  @Post()
  @ApiOperation({ summary: 'Create new task' })
  @ApiOkResponse({ description: 'Created task', type: Task })
  @ApiBadRequestResponse({ description: 'Invalid Date!', type: ExceptionDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ExceptionDto })
  @ApiConflictResponse({
    description: 'Task with similar title for this day is already exists!',
    type: ExceptionDto,
  })
  async create(
    @Body() { title, description, type, date, deadline }: CreateTaskDto,
  ): Promise<ITask> {
    return await this.commandBus.execute(
      new CreateTaskCommand(title, description, type, date, deadline),
    );
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Complete such task' })
  @ApiOkResponse({
    description: 'Task was completed successfully',
    type: Task,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ExceptionDto })
  @ApiNotFoundResponse({
    description: 'Task is not defined!',
    type: ExceptionDto,
  })
  async complete(@Param() { id }: FindByIdDto): Promise<ITask> {
    return await this.commandBus.execute(new CompleteTaskCommand(id));
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete such task' })
  @ApiOkResponse({
    description: 'Task was deleted successfully',
    type: SuccessDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ExceptionDto })
  @ApiNotFoundResponse({
    description: 'Task is not defined!',
    type: ExceptionDto,
  })
  async delete(@Param() { id }: FindByIdDto): Promise<ITask> {
    return await this.commandBus.execute(new DeleteTaskCommand(id));
  }
}
