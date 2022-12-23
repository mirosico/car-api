import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2022)
  year: number;

  @IsNumber()
  @Min(0)
  mileage: number;

  @IsNumber()
  @IsLongitude()
  lng: number;

  @IsNumber()
  @IsLatitude()
  lat: number;

  @IsNumber()
  @Max(10000000)
  @Min(0)
  price: number;
}
