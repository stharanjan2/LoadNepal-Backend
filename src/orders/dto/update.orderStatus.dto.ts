import { IsNotEmpty } from 'class-validator';
export class UpdateOrderStatusDto {
  @IsNotEmpty()
  readonly updateParamater: string;
  @IsNotEmpty()
  readonly orderId: number;
}
