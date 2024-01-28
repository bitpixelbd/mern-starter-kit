import {HttpException, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as crypto from 'crypto';

import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class OtpService {
  constructor(private jwtService: JwtService,
    private prismaService: PrismaService) { }

  async createOtp(data) {
    const otp_code = crypto.randomInt(100000, 999999)
    data.otp = `${otp_code}`

    const is_email_exist = await this.prismaService.otpVerification.findFirst({ where: { phone: data.phone } })

    if (is_email_exist !== null) {
      return this.prismaService.otpVerification.update({
        where: { phone: is_email_exist.phone, id: is_email_exist.id },
        data
      })
    }
    return await this.prismaService.otpVerification.create({ data })

  }


  async getTestUser (phone: string) {
    const testUser = await this.prismaService.testUser.findFirst(
    { where: { phone }});

    
    return testUser
  }
}
