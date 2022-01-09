import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly load_from: string;

  @IsNotEmpty()
  readonly unload_to: string;

  @IsNotEmpty()
  readonly date_of_delivery: string;

  @IsNotEmpty()
  readonly type_of_good: string;

  @IsNotEmpty()
  readonly weight_of_good: Number;

  @IsNotEmpty()
  readonly no_of_truck: Number;

  @IsNotEmpty()
  readonly truck_preference: String;

  @IsNotEmpty()
  readonly clientId: number;
}
