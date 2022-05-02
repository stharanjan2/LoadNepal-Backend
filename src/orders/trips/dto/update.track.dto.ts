import { IsNotEmpty } from 'class-validator';
export class UpdateTrackDto {
  @IsNotEmpty()
  readonly track: string;
  @IsNotEmpty()
  readonly track_id: number;
}
