import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { PROCESSOR } from 'src/common/constants';

@Controller('test/audio')
export class AudioController {
    constructor(
        @InjectQueue(PROCESSOR.NAMES.SENIOR_PLACES) private readonly seniorPlacesQueue: Queue,
    ) { }

    @Post()
    async transcode() {
        console.log("test job is running....")
        const audio_job = await this.seniorPlacesQueue.add(PROCESSOR.JOBS.AUDIO_JOB, {
            file: 'audio.mp3',
        });
        const video_job = await this.seniorPlacesQueue.add(PROCESSOR.JOBS.VIDEO_JOB, {
            file: 'video.mp4',
        });

        return { audio_job, video_job }
    }
}
