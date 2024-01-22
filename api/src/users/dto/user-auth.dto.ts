import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UserRegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    phone?: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsBoolean()
    is_vendor:boolean
}


export class UserLoginDto {
    @IsNotEmpty()
    @IsString()
    email_or_phone: string

    @IsNotEmpty()
    @IsString()
    password: string
}

export class VerifyOtpDto {

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsNumber()
    otp: number
}