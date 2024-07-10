import { IsOptional, IsEnum, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export enum EventFilter {
  UPCOMING = 'upcoming',
  CANCELED = 'canceled',
  PAST = 'past',
}

export class GetAssociationEventsDto {
  @IsOptional()
  @IsEnum(EventFilter)
  filter?: EventFilter;

  @IsInt()
  @Type(() => Number)
  associationId: number;
}
