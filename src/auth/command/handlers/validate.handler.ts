import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenDto, TokenPayloadDto } from 'src/auth/dto';
import { FindUserQuery } from 'src/user';
import { ValidateCommand } from '../commands';

@CommandHandler(ValidateCommand)
export class ValidateHandler implements ICommandHandler<ValidateCommand> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: ValidateCommand): Promise<TokenDto> {
    const { token } = command;

    try {
      const payload: TokenPayloadDto = this.jwtService.decode(
        token?.split(' ').pop(),
      ) as TokenPayloadDto;

      const user = await this.queryBus.execute(
        new FindUserQuery(payload?.email),
      );

      if (Date.now() > payload.exp) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
