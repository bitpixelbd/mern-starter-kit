import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { PROCESSOR } from 'src/common/constants';

@Module({
    imports: [
        BullModule.registerQueueAsync(
            {
                name: PROCESSOR.NAMES.SENIOR_PLACES
            }
        ),

    ],
    controllers: [AudioController],
    providers: [],
})
export class AudioModule { }
