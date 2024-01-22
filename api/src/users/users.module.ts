import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserAuthService } from './services/user-auth.services';
import { UserAuthController } from './controller/user-auth.controller';
import { JwtSignService } from 'src/auth/jwt.sign.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import SmsService from 'src/email/sms.service';
import EmailService from 'src/email/email.service';
import { UserDashBoardService } from './services/user-dashboard.service';
import { UserDashBoardController } from './controller/user-dashboard.controller';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from 'src/email/email.module';
import { PROCESSOR } from 'src/common/constants';


@Module({
  providers: [
    UserAuthService,
    JwtSignService,
    SmsService,
    EmailService,
    UserDashBoardService,

  ],
  exports: [],
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt_secret'),
        // privateKey: configService.get<string>('keys.privateKey'),
        // publicKey: configService.get<string>('keys.publicKey'),
        signOptions: { /*expiresIn: '86400s', */algorithm: 'HS256' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    BullModule.registerQueueAsync(
      {
        name: PROCESSOR.NAMES.SENIOR_PLACES,
      }
    ),
  ],
  controllers: [
    UserAuthController,
    UserDashBoardController
  ]
})

export class UsersModule { }