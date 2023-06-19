import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { CommandHandlers } from './command';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        // expiresIn: `${60 * 60 * 8}s`,
        // signOptions: { expiresIn: `${60 * 60 * 8}s` },
      }),
      inject: [ConfigService],
    }),
    CqrsModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [...CommandHandlers],
})
export class AuthModule {}
