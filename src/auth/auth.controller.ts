import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionDto } from 'src/utils';
import { LoginDto, TokenDto } from './dto';
import { LoginCommand } from './command';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ summary: "User's auth by email and password" })
  @ApiOkResponse({ type: TokenDto })
  @ApiBadRequestResponse({
    type: ExceptionDto,
    description: 'Invalid email or password',
  })
  async login(@Body() { email, password }: LoginDto): Promise<TokenDto> {
    return await this.commandBus.execute(new LoginCommand(email, password));
  }
}
