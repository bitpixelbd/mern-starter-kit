/* eslint-disable */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { ROLE_USER, ROLE_VENDOR } from "src/common/constants";
import { JwtSignService } from "src/user-auth/jwt.sign.service";

import { PrismaService } from '../../prisma/prisma.service';
import { UserLoginDto, UserRegisterDto, VerifyOtpDto } from "../dto/user-auth.dto";

@Injectable()
export class UserAuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtSignService: JwtSignService
    ) { }

    async createUser(data: UserRegisterDto) {

        const hash = await bcrypt.hash(data.password.toString(), 10)
        data.password = hash
        console.log(data);
        const user = await this.prismaService.user.create({ data })
        if (user === null) {
            throw new HttpException("User creation failed", HttpStatus.BAD_REQUEST)
        }

        return user
    }

    async checkIfEmailExists(email: string): Promise<boolean> {
        const check = await this.prismaService.user.findFirst({ where: { email: email } })
        return !!(check)
    }

    async checkIfPhoneExists(phone: string): Promise<boolean> {
        const check = await this.prismaService.user.findFirst({ where: { phone } })
        return !!(check)
    }



    async createOtp(data) {
        const otp_code = crypto.randomInt(100000, 999999)
        data.otp = otp_code

        const is_email_exist = await this.prismaService.otpVerification.findFirst({ where: { email: data.email } })

        if (is_email_exist !== null) {
            return this.prismaService.otpVerification.update({
                where: { email: is_email_exist.email, id: is_email_exist.id },
                data
            })
        }
        return await this.prismaService.otpVerification.create({
            data
        })

    }

    async loginUser(data: UserLoginDto) {
        const isEmail = await this.validateEmail(data.email)
        let user = null
        if (!isEmail) {
            user = await this.prismaService.user.findFirst({
                where: { phone: data.email }
            })
        } else {
            user = await this.prismaService.user.findFirst({
                where: { email: data.email }
            })
        }
        if (user === null) {
            throw new HttpException("Invalid Credatials", HttpStatus.UNAUTHORIZED)
        }
        if (!user.is_verified) {
            throw new HttpException("This user is not verified", HttpStatus.NOT_ACCEPTABLE)
        }

        const isPasswordMatch = await bcrypt.compare(data.password, user?.password)
        if (!isPasswordMatch) {
            throw new HttpException("Invalid Credatials", HttpStatus.UNAUTHORIZED)
        }

        const role = user.is_vendor ? ROLE_VENDOR : ROLE_USER

        const access_token = await this.jwtSignService.signJwt({ email: user?.email, phone: user?.phone, id: user?.id }, role)
        delete user['password']
        return {
            ...user,
            access_token,
            role: role
        }
    }

    async verifyUser(data: VerifyOtpDto) {
        const verify = await this.prismaService.otpVerification.findFirst({ where: { email: data.email, otp: Number(data.otp) } })
        if (verify === null) {
            throw new HttpException("Otp not valid", HttpStatus.BAD_REQUEST)
        }
        const user = await this.prismaService.user.update({
            where: { email: data.email },
            data: {
                is_verified: true
            }
        })
        await this.prismaService.otpVerification.delete({ where: { id: verify.id, email: verify.email } })


        const access_token = await this.jwtSignService.signJwt({ email: user.email, phone: user.phone, id: user.id });
        delete user['password'];
        return {
            ...user,
            access_token,
        };

    }


    async validateEmail(email) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            return false
        } else {
            return true
        }
    }

}
