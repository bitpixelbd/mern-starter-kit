import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PROCESSOR } from 'src/common/constants';

import { PrismaModule } from '../prisma/prisma.module';
import { CheckoutController } from './controller/checkout.controller';
import { CheckouthService } from './services/checkout.services';


@Module({
  providers: [ CheckouthService],
  exports: [],
  imports: [
    PrismaModule,
    ConfigModule,
    BullModule.registerQueueAsync(
      {
        name: PROCESSOR.NAMES.SENIOR_PLACES,
      }
    ),
  ],
  controllers: [
   CheckoutController
  ]
})

export class CheckoutModule { }