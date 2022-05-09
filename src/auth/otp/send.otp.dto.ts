import { IsEmail, IsNotEmpty } from 'class-validator';
export class SendOtpDto {
  @IsNotEmpty()
  readonly email: string;
}
