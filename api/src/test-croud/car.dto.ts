import { IsBoolean, IsNumber, IsString } from "class-validator"

export class CarDto {

    @IsString()
    name: string

    @IsString()
    model?: string

    @IsNumber()
    wheel?: number

    @IsNumber()
    price?: number

    @IsBoolean()
    is_verified?: boolean
}