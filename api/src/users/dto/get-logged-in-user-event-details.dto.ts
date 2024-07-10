import { IsOptional, IsEnum } from 'class-validator';

export enum EventFilterOfUser {
  UPCOMING = 'upcoming',
  CANCELED = 'canceled',
  PAST = 'past',
}

export class GetUserEventsDto {
  @IsOptional()
  @IsEnum(EventFilterOfUser)
  filter?: EventFilterOfUser;
}
