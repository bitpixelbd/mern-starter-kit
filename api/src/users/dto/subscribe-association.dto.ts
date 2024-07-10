import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class SubscribeAssociationDto {
  @IsInt()
  @Type(() => Number)
  associationId: number;
}
