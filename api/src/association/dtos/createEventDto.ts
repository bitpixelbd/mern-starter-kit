// import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

// export class CreateEventDto {
    
// @IsOptional()
//   id?:number  

//   @IsString()
//   @IsNotEmpty()
//   title: string;

//   @IsString()
//   @IsOptional()
//   subTitle?: string;

//   @IsString()
//   @IsOptional()
//   desc?: string;

//   @IsString()
//   @IsOptional()
//   city?: string;

//   @IsString()
//   @IsOptional()
//   country?: string;

//   @IsString()
//   @IsOptional()
//   lat?: string;

//   @IsString()
//   @IsOptional()
//   lang?: string;

//   @IsString()
//   @IsOptional()
//   post?: string;

//   @IsString()
//   @IsOptional()
//   image?: string;

//   @IsDateString()
//   @IsNotEmpty()
//   startDate: Date;

//   @IsDateString()
//   @IsNotEmpty()
//   endDate: Date;
// }



import { IsString, IsNotEmpty, IsDateString, IsOptional, IsArray, IsInt, ArrayNotEmpty } from 'class-validator';

export class CreateEventDto {

 @IsOptional()
  id?:number  
  
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  subTitle?: string;

  @IsString()
  @IsOptional()
  desc?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  lat?: string;

  @IsString()
  @IsOptional()
  lang?: string;

  @IsString()
  @IsOptional()
  post?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  categoryIds: number[];
}
