import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PROCESSOR } from 'src/common/constants';

import { PrismaModule } from '../prisma/prisma.module';
import { ProductController } from './controller/product.controller';
import { StoreController } from './controller/store.controller';
import { WithdrawalController } from './controller/withdrawal.controller';
import { ProductService } from './services/product.services';
import { StoreService } from './services/store.services';
import { WithdrawalService } from './services/withdrawal.services';


@Module({
  providers: [ ProductService ,StoreService, WithdrawalService ],
  exports: [],
  imports: [
    PrismaModule,
    ConfigModule,
    BullModule.registerQueueAsync(
      {name: PROCESSOR.NAMES.SENIOR_PLACES,}
    ),
  ],
  controllers: [
   ProductController,
   StoreController,
   WithdrawalController
  ]
})

export class VendorModule { }