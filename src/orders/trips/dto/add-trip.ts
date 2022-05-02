import { IsNotEmpty } from 'class-validator';
export class AddtripDto {
  //   order_id: any;
  @IsNotEmpty()
  readonly order_id: number;
  @IsNotEmpty()
  driver_username: string;
  @IsNotEmpty()
  driver_phoneNumber: string;
  @IsNotEmpty()
  truck_number: string;
  @IsNotEmpty()
  total: number;
  @IsNotEmpty()
  due: number;
  @IsNotEmpty()
  advance: number;
  @IsNotEmpty()
  amount_paid: any;
}
