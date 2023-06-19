import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenDto, TokenPayloadDto } from 'src/auth/dto';
import { FindUserQuery } from 'src/user';
import { LoginCommand } from '../commands';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: LoginCommand): Promise<TokenDto> {
    const { email, password } = command;

    const user = await this.queryBus.execute(new FindUserQuery(email));
    const passMatch = await bcrypt.compare(password, user?.password || '');

    if (!user || !passMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload: TokenPayloadDto = {
      email,
      iat: Date.now(),
      exp: Date.now() + 1000 * 60 * 60 * 8,
    };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
