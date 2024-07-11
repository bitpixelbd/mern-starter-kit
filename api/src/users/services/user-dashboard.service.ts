import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import EmailService from '../../email/email.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdatePasswordDto } from '../dto/updatePasswordDto';
import { CreateUpdateVerificationDto } from '../dto/add-update-verification-data.dto';
import { VerifyOtpForPhoneNumberUpdateDto } from '../dto/verify-otp-for-phone-number-update.dto';

@Injectable()
export class UserDashBoardService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly emailService: EmailService
    ) { }

    async getUser(id: number) {
        const user = await this.prismaService.user.findFirst({ where: { id } })
        if (user === null) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        delete user['password']
        return user
    }


    async updateUserProfile(data: any, id: number) {
        const user = await this.prismaService.user.findFirst({ where: { id } });
        console.log(user)
        if (user === null) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        const req = await this.prismaService.user.update({
            where: { id: user.id },
            data: data
        })
        if (req === null) {
            throw new HttpException("User update failed", HttpStatus.NOT_FOUND)
        }
        delete req['password']
        return req
    }



    async updateUserPassword(data: UpdatePasswordDto, id: number) {
        const user = await this.prismaService.user.findFirst({ where: { id } })
        if (user === null) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        const password_match = await bcrypt.compare(data.current_password, user.password)
        if (!password_match) {
            throw new HttpException("Password did not match", HttpStatus.UNAUTHORIZED)
        }
        const hash = await bcrypt.hash(data?.new_password?.toString(), 10)
        const req = await this.prismaService.user.update({
            where: { id: user.id },
            data: { password: hash }
        })
        if (req === null) {
            throw new HttpException("User update failed", HttpStatus.NOT_FOUND)
        }
        delete req['password']
        return req
    }

    async createOrUpdateUserVerification(userId: number, dto: CreateUpdateVerificationDto) {
        if (dto.id) {
            const verification = await this.prismaService.userVerifications.findFirst({
                where: { id: dto.id, user_id: userId, type: dto.type }
            });

            if (!verification) {
                throw new HttpException('Verification not found', HttpStatus.NOT_FOUND);
            }

            return this.prismaService.userVerifications.update({
                where: { id: dto.id },
                data: {
                    type: dto.type,
                    card_number: dto.card_number,
                    user_id: userId
                }
            });
        } else {
            return this.prismaService.userVerifications.create({
                data: {
                    type: dto.type,
                    card_number: dto.card_number,
                    user_id: userId
                }
            });
        }
    }

    async verifyOtpForPhoneNumberUpdate(payload:VerifyOtpForPhoneNumberUpdateDto){
        try{
            const isVerified = await this.prismaService.otpVerification.findFirst({
              where: {
                ...payload
              }
            })
            if (!isVerified) {
              throw new HttpException("Please insert correct Otp", HttpStatus.NOT_ACCEPTABLE)
            }
            
            const instanceOfVerification = await this.prismaService.testUser.create({
              data: {
                phone: payload.phone,
                email: payload.email,
                name: "phone-update"
              }
            })
            return {instanceOfVerification}
          }catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
          }
    }

    async updatePhoneNumber (userId:number, newPhoneNumber:string) {
        try{
            const isVerified = await this.prismaService.testUser.findFirst({
                where: {
                    name: "phone-update",
                    phone: newPhoneNumber
                }
            })
            if (!isVerified) {
                throw new HttpException("Please Verify new phone number", HttpStatus.NOT_FOUND)
            }
    
            const updateNumber =  await this.prismaService.user.update({
                where: {
                    id: +userId
                },
                data: {
                    phone: newPhoneNumber
                }
            })
            const  isDelete = await this.prismaService.testUser.delete({
                where: {
                    id: isVerified.id
                }
            })
            return updateNumber
        }catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
