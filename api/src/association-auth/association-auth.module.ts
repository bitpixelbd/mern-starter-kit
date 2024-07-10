import { Module } from '@nestjs/common';
import { AssociationAuthService } from './association-auth.service';
import { AssociationAuthController } from './association-auth.controller';
import { EmailModule } from 'src/email/email.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoginService } from 'src/user-auth/login.service';
import { AuthService } from 'src/user-auth/auth.service';
import { OtpService } from 'src/user-auth/otp.service';
import { JwtStrategy } from 'src/user-auth/jwt/jwt.strategy';
import { LocalAdminStrategy } from 'src/user-auth/local-admin.auth';
import { JwtSignService } from 'src/user-auth/jwt.sign.service';
import { AuthController } from 'src/user-auth/auth.controller';
import { LoginController } from 'src/user-auth/login.controller';
import { OtpController } from 'src/user-auth/otp.controller';

@Module({
  imports: [
    EmailModule,
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt_secret'),
        // privateKey: configService.get<string>('keys.privateKey'),
        // publicKey: configService.get<string>('keys.publicKey'),
        signOptions: { /* expiresIn: '86400s', */algorithm: 'HS256' },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    JwtModule,
    // UsersModule
  ],
  providers: [AssociationAuthService,  AuthService,
    LoginService,
    OtpService,
    // InfoService,
    // RegisterService,
    JwtStrategy,
    LocalAdminStrategy,
    // VerifyEmailService,
    JwtSignService],
  controllers: [AssociationAuthController,  AuthController,
    // VerifyEmailController,
    // RegisterController,
    LoginController,  
    OtpController]
})
export class AssociationAuthModule {}
