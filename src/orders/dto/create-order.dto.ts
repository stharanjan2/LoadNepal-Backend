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

  readonly price: number;

  @IsNotEmpty()
  readonly truckPreference: String;

  // @IsNotEmpty()
  distance: number;

  readonly additionalDescription: any;
}
