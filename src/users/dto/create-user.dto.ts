import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly district: string;
}
