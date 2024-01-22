import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PROCESSOR } from 'src/common/constants';
const SendGrid = require('@sendgrid/mail')

@Injectable()
export default class EmailService {
  constructor(
    private readonly configService: ConfigService,
    @InjectQueue(PROCESSOR.NAMES.SENIOR_PLACES) private seniorPlacesQueue: Queue
  ) {
    SendGrid.setApiKey(process.env.SENDGRID_KEY)
  }
  sendMailReset(mail) {
    return SendGrid.send(mail)
  }

  async sendEmail(to_email: string, subject = 'Senior Place', text: string, html = null) {
    const payload: any = {
      to: to_email,
      from: process.env.SENDER_EMAIL,
      subject: subject,
      text: text
    }
    if (html) {
      payload.html = html
    }
    try {
      const job = await this.seniorPlacesQueue.add(PROCESSOR.JOBS.EMAIL_SEND, payload)
      return { jobId: job.id, send_message: true }
    } catch (err) {
      throw new HttpException('Email sending has problem', HttpStatus.BAD_REQUEST)
    }
  }
}
