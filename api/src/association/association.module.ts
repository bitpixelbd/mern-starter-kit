import { Module } from '@nestjs/common';
import { AssociationPrivateController } from './association.private.controller';

import { AssociationService } from './association.service';
import { AssociationPublicController } from './association.public.controller';
import { EmailModule } from 'src/email/email.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OtpService } from 'src/user-auth/otp.service';
import { LoginService } from 'src/user-auth/login.service';
import { AuthService } from 'src/user-auth/auth.service';
import { JwtStrategy } from 'src/user-auth/jwt/jwt.strategy';
import { LocalAdminStrategy } from 'src/user-auth/local-admin.auth';
import { JwtSignService } from 'src/user-auth/jwt.sign.service';

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
  controllers: [AssociationPrivateController, AssociationPublicController],
  providers: [AssociationService, AuthService,
    LoginService,
    OtpService,
    // InfoService,
    // RegisterService,
    JwtStrategy,
    LocalAdminStrategy,
    // VerifyEmailService,
    JwtSignService]
})
export class AssociationModule {}
