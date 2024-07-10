import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as crypto from 'crypto';

import {PrismaService} from '../prisma/prisma.service';
import { VerifyOtpDto } from './dto/verifyOtp.dto';

@Injectable()
export class OtpService {
  constructor(private jwtService: JwtService,
    private prismaService: PrismaService) { }

  async createOtp(phone: string) {
    let data:any = {};
    const otp_code = crypto.randomInt(100000, 999999)
    data.otp = `${otp_code}`
    data.phone = phone

    const is_email_exist = await this.prismaService.otpVerification.findFirst({ where: { phone: phone } })

    if (is_email_exist !== null) {
      return this.prismaService.otpVerification.update({
        where: { id: is_email_exist.id },
        data
      })
    }
    return await this.prismaService.otpVerification.create({ data })

  }

  async verifyOtp (payload:VerifyOtpDto){
    try{
      const findUser = await this.prismaService.user.findFirst({
        where: {
          phone: payload.phone
        }
      })
      if(findUser){
        throw new HttpException("User already registered with this number please try with another one", HttpStatus.NOT_ACCEPTABLE)
      }
      const isVerified = await this.prismaService.otpVerification.findFirst({
        where: {
          ...payload
        }
      })
      if (!isVerified) {
        throw new HttpException("Please insert correct Otp", HttpStatus.NOT_ACCEPTABLE)
      }
      
      const testUser = await this.prismaService.testUser.create({
        data: {
          phone: payload.phone,
          email: payload.email,
          name: "test"
        }
      })
      return {testUser}
    }catch(err){
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async getTestUser (phone: string) {
    const testUser = await this.prismaService.testUser.findFirst(
    { where: { phone }});


    return testUser
  }
  async deleteTestUserById(id:number) {
    try{
      await this.prismaService.testUser.delete({
        where: {
          id
        }
      })
    }catch(err){
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
