import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly loadFrom: string;

  @IsNotEmpty()
  readonly unloadTo: string;

  @IsNotEmpty()
  readonly dateOfDelivery: string;

  @IsNotEmpty()
  readonly typeOfGood: string;

  @IsNotEmpty()
  readonly weightOfGood: Number;

  @IsNotEmpty()
  noOfTruck: Number;

  // @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly customerPrice: String;

  @IsNotEmpty()
  readonly truckPreference: String;

  @IsNotEmpty()
  readonly truckDetail: String;

  @IsNotEmpty()
  readonly needHelper: boolean;

  // @IsNotEmpty()
  distance: number;
  @IsNotEmpty()
  readonly additionalDescription: String;
}
