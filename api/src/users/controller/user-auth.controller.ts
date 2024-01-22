import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from "@nestjs/common";
import { res } from "src/common/response.helper";
import EmailService from 'src/email/email.service';
import SmsService from "src/email/sms.service";

import { UserLoginDto, UserRegisterDto, VerifyOtpDto } from "../dto/user-auth.dto";
import { UserAuthService } from '../services/user-auth.services';
import { da } from "@faker-js/faker";

@Controller('auth/user')
export class UserAuthController {

    constructor(
        private readonly userAuthService: UserAuthService,
        private readonly emailService: EmailService,
        private readonly smsService: SmsService,
    ) { }

    @Post('register')
    async createUser(@Body() data: UserRegisterDto) {
        console.log("user", data?.email);
        const emailExists = await this.userAuthService.checkIfEmailExists(data.email)
        if (emailExists) {
            throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST)
        }
        // const phoneExist = await this.userAuthService.checkIfPhoneExists(data.phone)
        // if (phoneExist) {
        //     throw new HttpException("Phone already exists", HttpStatus.BAD_REQUEST)
        // }
        const request = await this.userAuthService.createUser(data)

        console.log("req" , request);

        const otp_req = await this.userAuthService.createOtp({ email: request.email });

        // const text = `Welcome to Ecommerce. Your OTP code is: ${otp_req.otp}`;
        // await this.emailService.sendEmail(request.email, 'Welcome to Ecommerce', text);
        // await this.smsService.sendSMS(request.phone, text);
        return res.success({ ...request, otp: otp_req?.otp, otp_send: true })
    }

    @Post('login')
    async loginUser(@Body() data: UserLoginDto) {
        const user  = await this.userAuthService.loginUser(data)
        return res.success(user)
    }

    @Post('otp/verify')
    async verifyOtp(@Body() otp: VerifyOtpDto) {
        const response = await this.userAuthService.verifyUser(otp)
        return res.success(response)
    }
}
