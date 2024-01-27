import { Body, Controller, Post, Request } from '@nestjs/common';

import { res } from '../common/response.helper';
import { AdminPasswordResetService } from './admin.password-reset.service';
import { OtpService } from './otp.service';
import {SendOtpDto} from "./dto/sendOtp.dto";

@Controller('auth')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly adminPasswordResetService: AdminPasswordResetService,
  ) { }

  @Post('send-otp')
  async sendOtp(@Request() req, @Body() payload: SendOtpDto) {
    const otp_req = await this.otpService.createOtp({ phone: payload.phone })

    const text = `Welcome to ${process.env.APP_NAME}. Your OTP is: ${otp_req.otp}`

    /*if (!is_debug_mode) {
      await this.smsService.sendSMS(payload.phone, text);
      resData = ''
    }*/

    return res.success({}, 201)
  }

}
