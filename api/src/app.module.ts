/* eslint-disable */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BullModule } from '@nestjs/bull';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppProcessor } from './app.processor';
import { AppService } from './app.service';
import { AttachmentsModule } from './attachments/attachments.module';
import { PROCESSOR } from './common/constants';
import configuration from './config';
import { CrudModule } from './crud/crud.module';
import { EmailModule } from './email/email.module';
import { PasswordModule } from './password/password.module';
import { PrismaModule } from './prisma/prisma.module';
// import { AuthModule } from './user-auth/user-auth.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASS
      },
    }),
    BullModule.registerQueueAsync(
      {
        name: PROCESSOR.NAMES.SENIOR_PLACES,
      }
    ),
    PrismaModule,
    CrudModule,
    UserAuthModule,
    AttachmentsModule,
    UsersModule,
    AdminModule,
    UsersModule,
    EmailModule,
    PasswordModule
  ],
  controllers: [AppController],
  providers: [AppService, AppProcessor],
})
export class AppModule { }
