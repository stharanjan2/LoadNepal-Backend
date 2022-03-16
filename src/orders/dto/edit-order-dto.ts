import { IsNotEmpty } from 'class-validator';

export class EditOrderDto {
  readonly loadFrom: string;

  readonly unloadTo: string;

  readonly dateOfDelivery: string;

  readonly typeOfGood: string;

  readonly weightOfGood: Number;

  readonly noOfTruck: Number;

  readonly price: number;

  readonly truckPreference: String;

  readonly additionalDescription: any;
}
