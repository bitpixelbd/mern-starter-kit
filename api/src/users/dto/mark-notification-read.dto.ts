import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class MarkNotificationsReadDto {
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  notificationIds: number[];
}
