import { IsNotEmpty } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/users.entity';
export class AddtripDto {
  //   order_id: any;
  @IsNotEmpty()
  order_id: number;
  @IsNotEmpty()
  driver_username: string;
  @IsNotEmpty()
  driver_phoneNumber: string;
  @IsNotEmpty()
  vehicleNo: string;
  @IsNotEmpty()
  total: number;
  @IsNotEmpty()
  due: number;
  @IsNotEmpty()
  advance: number;
  @IsNotEmpty()
  amount_paid: any;
}
