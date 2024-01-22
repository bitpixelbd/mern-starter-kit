/* eslint-disable */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import crypto from "crypto";
import { JwtSignService } from 'src/auth/jwt.sign.service';
import { v4 as uuidv4 } from 'uuid';
import EmailService from "../email/email.service";
import { PrismaService } from '../prisma/prisma.service';
import { RequestOtpDto, ResetPasswordDto, ResetPasswordVerifyOtpDto } from "./reset.password.dto";


@Injectable()
export class PasswordService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtSignService: JwtSignService,
        private readonly emailService: EmailService,
    ) { }


    async requestOtp(data: RequestOtpDto) {
        let request_user = null;
        let role = null;
        // //first search in student table
        // user = await this.prismaService.student.findFirst({
        //     where: {
        //         email: data.email
        //     }
        // });
        // role = ROLE_STUDENT;
        // if (data.role === ROLE_USER) {
        //     const user = await this.prismaService.user.findFirst({ where: { OR: [{ email: data.email_or_phone }, { phone: data.email_or_phone }] } })
        //     if (user === null) {
        //         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        //     }
        //     request_user = user
        //     role = ROLE_USER
        // } 
        // else {
        //     const partner = await this.prismaService.partner.findFirst({ where: { OR: [{ email: data.email_or_phone }, { phone: data.email_or_phone }] } })
        //     if (partner === null) {
        //         throw new HttpException('Partner not found', HttpStatus.NOT_FOUND);
        //     }
        //     request_user = partner
        //     role = ROLE_PARTNER
        // }

        // //if not found look into teacher table
        // if (user === null) {
        //     user = await this.prismaService.teacher.findFirst({
        //         where: {
        //             email: data.email
        //         }
        //     });
        //     role = ROLE_TEACHER;
        // }

        ///if still not found then user not exist
        if (request_user === null && role === null) {
            throw new HttpException(`${data?.role} not found`, HttpStatus.NOT_FOUND);
        }

        let request_data: any = {
            email: data.email_or_phone,
            role
        }
        const otp = crypto.randomInt(100000, 999999)
        request_data.token = uuidv4();
        request_data.otp = String(otp);

        const check = await this.prismaService.resetPassword.findFirst({
            where: {
                email: data.email_or_phone
            }
        });
        if (check) {
            await this.prismaService.resetPassword.update({
                where: { email: data.email_or_phone },
                data: { otp: String(otp) }
            });
        } else {
            const request = await this.prismaService.resetPassword.create({
                data: request_data
            });
        }

        const text = `Your  password reset code is: ${otp}`
        await this.emailService.sendEmail(data.email_or_phone, 'Senior places - Reset password', text);

        return true;


    }


    async verifyOtp(data: ResetPasswordVerifyOtpDto) {

        const check = await this.prismaService.resetPassword.findFirst({
            where: {
                email: data.email_or_phone,
                otp: data.otp
            }
        });

        if (check === null) {
            throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST)
        }
        await this.prismaService.resetPassword.update({
            where: { id: check.id },
            data: {
                is_verified: true
            }
        })

        return {
            verified: true,
            token: check.token
        }
    }

    async resetPassword(data: ResetPasswordDto) {
        console.log({ data })
        const check = await this.prismaService.resetPassword.findFirst({
            where: {
                token: data.token,
            }
        });

        console.log({ check })
        if (check === null) {
            throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST)
        }
        if (!check.is_verified) {
            throw new HttpException('OTP not verified', HttpStatus.BAD_REQUEST)
        }

        //update password
        const role = check.role;
        const hash = await bcrypt.hash(data.password.toString(), 10);
        let user;
        // if (check.role === ROLE_PARTNER) {
        //     await this.prismaService.partner.update({
        //         where: {
        //             email: check.email
        //         },
        //         data: {
        //             password: hash
        //         }
        //     });
        //     user = await this.prismaService.partner.findFirst({
        //         where: {
        //             email: check.email
        //         }
        //     });
        // } else {

        //     await this.prismaService.user.update({
        //         where: {
        //             email: check.email
        //         },
        //         data: {
        //             password: hash
        //         }
        //     });
        //     user = await this.prismaService.user.findFirst({
        //         where: {
        //             email: check.email
        //         }
        //     });
        // }

        // const jwt_role = role === ROLE_PARTNER ? Role.Partner : Role.User;
        // const access_token = this.jwtSignService.signJwt({ email: user.email, phone: user.phone, id: user.id }, jwt_role);
        delete user['password'];

        await this.prismaService.resetPassword.delete({
            where: { id: check.id }
        });

        return {
            ...user,
            // access_token,
            role: role
        };
    }
}
