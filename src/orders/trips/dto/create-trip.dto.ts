import { IsNotEmpty } from 'class-validator';
export class CreateTripDto {
  order_id: any;
  noOfTrips: number;
  driver_username: string;
  driver_phoneNumber: string;
  truck_number: string;
  total: number;
  due: number;
  advance: number;
  amount_paid: any;

  trips: any[];
}
