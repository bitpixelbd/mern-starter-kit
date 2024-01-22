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
// import { UsersService } from './users/users.service';
// import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AttachmentsModule } from './attachments/attachments.module';
// import { PartnerModule } from './partner/partner.module.ts.old';
import { BullModule } from '@nestjs/bull';
import { AppProcessor } from './app.processor';
import { CheckoutModule } from './checkout/checkout.module';
import { PROCESSOR } from './common/constants';
import { EmailModule } from './email/email.module';
import { PasswordModule } from './password/password.module';
import { CarModule } from './test-croud/car.module';
import { VendorModule } from './vendor-dashboard/vendor-dashboard.module';

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
    /*TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('database'),
      inject: [ConfigService],
    }),*/
    PrismaModule,
    CheckoutModule,
    CarModule,
    VendorModule,
    CrudModule,
    AuthModule,
    // CaslModule,
    AttachmentsModule,
    UsersModule,
    AdminModule,
    // GscModule,
    // CareHomeDetails,
    // SearchModule,
    // PartnerModule,
    // GoogleMapModule,
    UsersModule,
    // HomeModule,
    // CareHomesModule,
    // AudioModule,
    EmailModule,
    PasswordModule
  ],
  controllers: [AppController],
  providers: [AppService, AppProcessor],
})
export class AppModule { }
