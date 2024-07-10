
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import EmailService from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUpdateAssociationDto } from './dtos/create-update-association';

import { OtpService } from 'src/user-auth/otp.service';
import { VerifyOtpDto } from 'src/user-auth/dto/verifyOtp.dto';
import { OtpLoginDto } from 'src/user-auth/dto/loginUser.dto';
import { JwtSignService } from 'src/user-auth/jwt.sign.service';

@Injectable()
export class AssociationAuthLoginService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly emailService: EmailService,
        private readonly otpService: OtpService,
        private readonly jwtSignService: JwtSignService
    ) { }

    async verifyOtp(payload: OtpLoginDto): Promise<any> {
      const otpNumber = await this.prismaService.otpVerification.findFirst({ where: { phone: payload?.phone, otp: payload?.otp } });
  
      if (otpNumber === null) {
        throw new HttpException("This association is not valid user", HttpStatus.NOT_ACCEPTABLE)
      }
  
      const association = await this.prismaService.association.findFirst({ where: { phone: otpNumber?.phone } });
  
  
      // registration association
      if (!association) {
        try {
          const newAssociation = await this.prismaService.association.create({
            data: {
              phone: payload.phone,
            }
          });
          const access_token = await this.jwtSignService.signJwt({ phone: newAssociation.phone, id: newAssociation.id })
  
          return {
            ...newAssociation,
            access_token,
          }
        } catch (error) {
          throw new HttpException("User creation failed", HttpStatus.BAD_REQUEST)
        }
  
      }
  
      // login association
      if (association) {
        const access_token = await this.jwtSignService.signJwt({  phone: association?.phone, id: association?.id })
        return {
          ...association,
          access_token,
        }
      }
    }
}
