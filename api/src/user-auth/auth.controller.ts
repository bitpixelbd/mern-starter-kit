import { Body, Controller, HttpStatus, Post, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SendOtpDto } from './dto/sendOtp.dto';
import { OtpService } from './otp.service';
import { res } from 'src/common/response.helper';
import SmsService from 'src/email/sms.service';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';

@Controller("user/auth")
export class AuthController {
  constructor(
    private otpService:OtpService,
    private smsService: SmsService,
    private authService: AuthService
  ) {}

  @Post('register')
  async registration( @Body() payload: RegisterUserDto) {
      const saveUser = await this.authService.registerUser(payload)
      res.success(saveUser)
  }

}
