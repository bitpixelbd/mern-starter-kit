import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RequestOtpDto {

    @IsNotEmpty()
    @IsString()
    email_or_phone: string

    @IsNotEmpty()
    @IsString()
    role: string

}

export class ResetPasswordVerifyOtpDto extends RequestOtpDto {
    @IsNotEmpty()
    @IsString()
    otp: string
}

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    token: string

    @IsNotEmpty()
    @IsString()
    password: string
}
