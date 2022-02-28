import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  readonly title: String;

  @IsNotEmpty()
  readonly message: String;
  @IsNotEmpty()
  readonly type: String;
  @IsNotEmpty()
  readonly receiverId: number;
}
