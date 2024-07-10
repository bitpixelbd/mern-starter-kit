import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { AdminUser, Prisma, User } from "@prisma/client";
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs'
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
              private prisma: PrismaService,
              private otpService: OtpService
            ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findUserByEmail(email);
    if (!user) return null;
    const passwordValid = bcryptjs.compareSync(password, user.password)
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      delete user['password']; //TODO find a better way. ref: https://github.com/prisma/prisma/issues/5042
      return user;
    }
    return null;
  }

  async validateAdminUser(email: string, password: string): Promise<any> {
    const user = await this.findAdminUserByEmail(email);
    if (!user) return null;
    const passwordValid = bcryptjs.compareSync(password, user.password)
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      delete user['password']; //TODO find a better way. ref: https://github.com/prisma/prisma/issues/5042
      return user;
    }
    return null;
  }

  async findAdminUserByEmail(email: string): Promise<AdminUser | null> {
    return this.prisma.adminUser.findFirst({
      where: { email: email },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { email: email },
    });
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(payload: RegisterUserDto) {
    try {
      const isPhoneVerified = await this.otpService.getTestUser(payload.phone, "user");
      if (!isPhoneVerified) {
        throw new HttpException("Provided Phone number is not verified!!", HttpStatus.NOT_ACCEPTABLE);
      }
      const isUserExistOrNot = await this.prisma.user.findFirst({where: {phone:payload.phone} })
      if (isUserExistOrNot) {
        throw new HttpException("User already exist", HttpStatus.NOT_ACCEPTABLE)
      }
      const dateOfBirth = new Date(payload.date_of_birth).toISOString();
      
      const saveUser = await this.prisma.user.create({
        data: {
          ...payload,
          phone: isPhoneVerified.phone,
          date_of_birth: dateOfBirth,
          
        }
      });
      

      
      if (!saveUser) {
        throw new HttpException("User saved failed!!", HttpStatus.NOT_ACCEPTABLE);
      }
      
      await this.otpService.deleteTestUserById(isPhoneVerified.id);
      return saveUser;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
