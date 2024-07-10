import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class ShareEventDto {
  @IsInt()
  @Type(() => Number)
  eventId: number;
}
