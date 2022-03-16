import { IsNotEmpty } from 'class-validator';
export class CreateTripDto {
  @IsNotEmpty()
  readonly typeOfGood: string;

  @IsNotEmpty()
  readonly weightOfGood: Number;
}
