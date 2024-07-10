
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import EmailService from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUpdateAssociationDto } from './dtos/create-update-association';
import { OtpService } from 'src/user-auth/otp.service';
import { VerifyOtpDto } from 'src/user-auth/dto/verifyOtp.dto';

@Injectable()
export class AssociationAuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly emailService: EmailService,
        private readonly otpService: OtpService
    ) { }

  async registerAssociation(payload: CreateUpdateAssociationDto) {
    try{
      const isAssociationExistOrNot = await this.prismaService.association.findFirst({where: {phone:payload.phone} })
      if (isAssociationExistOrNot) {
        throw new HttpException("Association already exist", HttpStatus.NOT_ACCEPTABLE)
      }

      const isPhoneVerified = await this.prismaService.testUser.findFirst({
        where: {
          name: "association",
          phone: payload.phone
        }
      })
      if (!isPhoneVerified) {
        throw new HttpException("Provided Phone number is not verified!!", HttpStatus.NOT_ACCEPTABLE);
      }
      
      const saveAssociation = await this.prismaService.association.create({
        data: payload,
      });
      if (!saveAssociation) {
        throw new HttpException("Association saved failed!!", HttpStatus.NOT_ACCEPTABLE);
      }
      await this.otpService.deleteTestUserById(isPhoneVerified.id);
      return saveAssociation
    }catch(err){
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async verifyOtp (payload:VerifyOtpDto){
    try{
      const findAssociation = await this.prismaService.association.findFirst({
        where: {
          phone: payload.phone
        }
      })
      if(findAssociation){
        throw new HttpException("Association already registered with this number please try with another one", HttpStatus.NOT_ACCEPTABLE)
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
          name: "association"
        }
      })
      return {testUser}
    }catch(err){
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
