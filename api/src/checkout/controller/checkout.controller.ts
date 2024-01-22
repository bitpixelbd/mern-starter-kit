/* eslint-disable */
import { Body, Controller, HttpException, HttpStatus, Post, Query, Req, UseGuards } from "@nestjs/common";
import { HasRoles } from "src/auth/jwt/has-roles.decorator";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import { RolesGuard } from "src/auth/jwt/roles.guard";
import { res } from "src/common/response.helper";
import EmailService from 'src/email/email.service';
import SmsService from "src/email/sms.service";

import { CheckoutDto } from "../dto/checkout.dto";
import { CheckouthService } from '../services/checkout.services';
import { Role } from "src/auth/dto/role.enum";

@HasRoles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('checkout')
export class CheckoutController {

    constructor(
        private readonly checkouthService: CheckouthService,
        // private readonly emailService: EmailService,
        // private readonly smsService: SmsService,
    ) { }

    @Post()
    async createOrder(@Body() data : CheckoutDto,@Req() req) {
        const {id} = req.user
        const response = await this.checkouthService.createCheckout(data,Number(id))
        return res.success(response)
    }

    // @Post('login')
    // async loginUser(@Body() data: UserLoginDto) {
    //     const user = await this.userAuthService.loginUser(data)
    //     return res.success(user)
    // }

    // @Post('otp/verify')
    // async verifyOtp(@Body() otp: VerifyOtpDto) {
    //     const response = await this.userAuthService.verifyUser(otp)
    //     return res.success(response)
    // }
}
