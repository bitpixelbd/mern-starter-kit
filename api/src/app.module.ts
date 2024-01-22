/* eslint-disable */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuration from './config';
import { CrudModule } from './crud/crud.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { BullModule } from '@nestjs/bull';
import { AppProcessor } from './app.processor';
import { PROCESSOR } from './common/constants';
import { EmailModule } from './email/email.module';
import { PasswordModule } from './password/password.module';

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
    AuthModule,
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
