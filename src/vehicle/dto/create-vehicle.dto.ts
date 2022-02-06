import { IsNotEmpty } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  readonly lisenceNo: string;

  @IsNotEmpty()
  readonly vehicleNo: string;

  @IsNotEmpty()
  readonly insurance: string;

  @IsNotEmpty()
  readonly vehicleModel: string;

  @IsNotEmpty()
  readonly year: string;

  @IsNotEmpty()
  readonly make: string;

  @IsNotEmpty()
  readonly axleNo: string;

  @IsNotEmpty()
  readonly tyreNo: string;

  @IsNotEmpty()
  readonly bodyType: string;

  @IsNotEmpty()
  readonly totalGrossVehicleWeight: string;

  @IsNotEmpty()
  readonly lisence: string;

  @IsNotEmpty()
  readonly billbook: string;
}
