import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class AddEventParticipantDto {
  @IsInt()
  @Type(() => Number)
  eventId: number;
}
