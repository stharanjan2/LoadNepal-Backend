import { IsNotEmpty } from 'class-validator';
export class UpdateTrackDto {
  @IsNotEmpty()
  readonly track: string;
  @IsNotEmpty()
  readonly trip_id: number;
}
