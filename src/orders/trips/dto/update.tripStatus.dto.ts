import { IsNotEmpty } from 'class-validator';
export class UpdateTripStatusDto {
  @IsNotEmpty()
  readonly updateParamater: string;
  @IsNotEmpty()
  readonly trip_id: number;
}
