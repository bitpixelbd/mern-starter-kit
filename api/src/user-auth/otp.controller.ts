import { Body, Controller, Post, Request } from '@nestjs/common';

import { res } from '../common/response.helper';
import SmsService from "../email/sms.service";
import { SendOtpDto } from "./dto/sendOtp.dto";
import { OtpService } from './otp.service';
import { VerifyOtpDto } from './dto/verifyOtp.dto';

@Controller('auth')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly smsService: SmsService,
  ) { }

  @Post('send-otp')
  async sendOtp(@Body() payload: SendOtpDto) {
    const otp_req = await this.otpService.createOtp(payload?.phone);
    const text = `Welcome to ${process.env.APP_NAME}. Your OTP is: ${otp_req.otp}`

    if (process.env.NODE_ENV !== 'development') {
      await this.smsService.sendSMS(payload.phone, text);
    }

    return res.success({text}, 201)
  }

  @Post("verify-otp") 
  async verifyOtp (@Body() payload: VerifyOtpDto) {
    await this.otpService.verifyOtp(payload)
    return res.success({mesasge: "successfully verified"})
  }

}
