import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entity';
import { QueryHandlers } from './query';
import { UserController } from './user.controller';
import { CommandHandlers } from './command';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
  ],
  providers: [...QueryHandlers, ...CommandHandlers],
  exports: [...QueryHandlers],
  controllers: [UserController],
})
export class UserModule {}
