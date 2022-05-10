import { IsNotEmpty } from 'class-validator';
export class CreateTripDto {
  order_id: any;
  noOfTrips: number;
  trips: any[];
}
