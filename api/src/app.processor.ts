import { Process, Processor } from "@nestjs/bull";
import * as Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';
import { Job } from "bull";
import { EmailInterface } from "./email/email.interface";
import { PROCESSOR } from "./common/constants";

@Processor(PROCESSOR.NAMES.SENIOR_PLACES)
export class AppProcessor {
    private nodemailerTransport: Mail
    constructor() {
        this.nodemailerTransport = nodemailer.createTransport({
            service: 'Gmail',
            port: 587,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD,
            },
        });
    }

    @Process(PROCESSOR.JOBS.EMAIL_SEND)
    async sendEmail(job: Job<EmailInterface>) {
        const { data } = job
        console.log("from senior places global processor email =>>>> ", data)
        await this.nodemailerTransport.sendMail(data);
    }

    @Process(PROCESSOR.JOBS.VIDEO_JOB)
    async videoJob(job: Job) {
        console.log('From processor video job =>>>> ', PROCESSOR.JOBS.VIDEO_JOB)
    }

    @Process(PROCESSOR.JOBS.AUDIO_JOB)
    async audioJob(job: Job) {
        console.log('From processor audio job =>>>> ', PROCESSOR.JOBS.AUDIO_JOB)
    }
}