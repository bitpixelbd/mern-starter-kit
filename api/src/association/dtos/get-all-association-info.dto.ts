import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAssociationsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;
}
