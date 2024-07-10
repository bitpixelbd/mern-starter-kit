import { IsOptional, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPeriodEventsDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  categoryId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  periodDays?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;
}
