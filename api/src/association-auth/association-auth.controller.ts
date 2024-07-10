import { Body, Controller, HttpException, HttpStatus, ParseIntPipe, Post, Query, Request } from '@nestjs/common';
import { AssociationService } from 'src/association/association.service';
import { UserDashBoardService } from 'src/users/services/user-dashboard.service';
import { CreateUpdateAssociationDto } from './dtos/create-update-association';
import { AssociationAuthService } from './association-auth.service';
import { res } from 'src/common/response.helper';
import { OtpLoginDto } from 'src/user-auth/dto/loginUser.dto';
import { AssociationAuthLoginService } from './login.service';
import { VerifyOtpDto } from 'src/user-auth/dto/verifyOtp.dto';

@Controller('association-auth')
export class AssociationAuthController {
    constructor(
        private readonly associationAuthService: AssociationAuthService,
        private readonly loginService: AssociationAuthLoginService
      ) { }
    
    @Post("verify-otp") 
    async verifyOtp (@Body() payload: VerifyOtpDto) {
      await this.associationAuthService.verifyOtp(payload)
      return res.success({mesasge: "successfully verified"})
    }
    @Post("register")
    createOrUpdate(@Body() associationDto: CreateUpdateAssociationDto) {
      const saveData= this.associationAuthService.registerAssociation(associationDto);
      return res.success(saveData, "Successfully Registered")
    }

    @Post('otp-login')
    async otpLogin(@Request() req, @Body() payload: OtpLoginDto) {
      const data = await this.loginService.verifyOtp(payload);
      if (!data) {
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
      }
      return res.success(data, 'Association login successful');
    }
}