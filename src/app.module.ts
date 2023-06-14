import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: process.env.MONGO_NAME,
    }),
    TaskModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
