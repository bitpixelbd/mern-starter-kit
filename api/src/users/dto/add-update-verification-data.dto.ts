import { IsEnum, IsOptional, IsString, IsInt } from 'class-validator';
import { VerificationsType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateUpdateVerificationDto {
  @IsEnum(VerificationsType)
  type: VerificationsType;

  @IsOptional()
  @IsString()
  card_number?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
