import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAssociationDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
