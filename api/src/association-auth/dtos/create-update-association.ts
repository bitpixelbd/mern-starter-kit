import { IsString, IsOptional } from 'class-validator';

export class CreateUpdateAssociationDto {
  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subTitle: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  lat: string;

  @IsOptional()
  @IsString()
  lang: string;

  @IsOptional()
  @IsString()
  post: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  coverImg?: string;
}
