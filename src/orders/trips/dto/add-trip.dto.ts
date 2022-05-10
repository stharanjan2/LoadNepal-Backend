import { IsNotEmpty } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/users.entity';
export class AddtripDto {
  //   order_id: any;
  @IsNotEmpty()
  _id: number;  //backend is sending order id as _id so we are mapping it to order_id in backend
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
