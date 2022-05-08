import { IsEmail, IsNotEmpty } from 'class-validator';
export class VerifyOtpDto {
  @IsNotEmpty()
  readonly email: String;
  readonly otp:number;
}
