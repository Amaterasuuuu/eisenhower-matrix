import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ValidateCommand } from '../command';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly commandBus: CommandBus) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization'];
    const user = await this.commandBus.execute(new ValidateCommand(token));
    req.user = user;
    return !!user;
  }
}
