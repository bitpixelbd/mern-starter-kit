import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PROCESSOR } from 'src/common/constants';

import { PrismaModule } from '../prisma/prisma.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';


@Module({
    providers: [CarService],
    exports: [],
    imports: [
        PrismaModule,
        ConfigModule,
        BullModule.registerQueueAsync(
            { name: PROCESSOR.NAMES.SENIOR_PLACES, }
        ),
    ],
    controllers: [
        CarController
    ]
})

export class CarModule { }