import { IsEmail, IsNotEmpty } from 'class-validator';
export class AuthLoginDto {
  @IsNotEmpty()
  phoneNumber: number;
  @IsNotEmpty()
  password: string;
}
