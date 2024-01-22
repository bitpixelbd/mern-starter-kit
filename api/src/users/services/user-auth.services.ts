/* eslint-disable */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { JwtSignService } from "src/auth/jwt.sign.service";
import { ROLE_USER, ROLE_VENDOR } from "src/common/constants";

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
        // const refer_link = `${process.env.WEBSITE_BASE_URL}?ref=u-${user.first_name}-${user.last_name}-${user.id}`
        // const update_user = await this.prismaService.user.update({
        //     where: { id: user.id }, data: {
        //         refer_link
        //     }
        // })
        // delete update_user['password']
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

    // // async isUserPhoneVerified(phone: string): Promise<boolean> {
    // //     const check = await this.prismaService.user.findFirst({ where: { phone } })
    // //     return (check.is_verified)
    // // }

    // // async isUserEmailVerified(email: string): Promise<boolean> {
    // //     const check = await this.prismaService.user.findFirst({ where: { email } })
    // //     return (check.is_verified)
    // // }

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
        const isEmail = await this.validateEmail(data.email_or_phone)
        let user = null
        if (!isEmail) {
            user = await this.prismaService.user.findFirst({
                where: { phone: data.email_or_phone }
            })
        } else {
            user = await this.prismaService.user.findFirst({
                where: { email: data.email_or_phone }
            })
        }
        // const user = await this.prismaService.user.findFirst({
        //     where: { email: data.email }
        // })
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

        const role = user.is_vendor ? ROLE_VENDOR : ROLE_USER

        const access_token = await this.jwtSignService.signJwt({ email: user.email, phone: user.phone, id: user.id }, role);
        delete user['password'];
        return {
            ...user,
            access_token,
            role
        };

    }

    // async createReferRequest(ref_by: string, user_id: number) {
    //     const data: any = {}
    //     const ref_by_req = ref_by?.split("-")
    //     if (ref_by_req[0] === "u") {
    //         const valid_user = await this.prismaService.user.findFirst({ where: { id: Number(ref_by_req[3]), first_name: ref_by_req[1], last_name: ref_by_req[2] } })
    //         if (valid_user !== null) {
    //             data.refer_by_user = valid_user.id
    //             data.type = ReferralTYPE.USER
    //         }
    //     }
    //     else if (ref_by_req[0] === "p") {
    //         const valid_partner = await this.prismaService.partner.findFirst({ where: { id: Number(ref_by_req[3]), first_name: ref_by_req[1], last_name: ref_by_req[2] } })
    //         if (valid_partner !== null) {
    //             data.refer_by_partner = valid_partner?.id
    //             data.type = ReferralTYPE.PARTNER
    //         }
    //     }
    //     data.user_id = user_id
    //     const referral = await this.prismaService.referral.create({ data })
    // }

    async validateEmail(email) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            return false
        } else {
            return true
        }
    }

}
