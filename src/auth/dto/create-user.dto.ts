import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import Role from '../role.enum';
export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  // @IsNumber()
  readonly phoneNumber: number;

  readonly city: string;

  readonly district: string;

  readonly state: string;
  readonly identification: string;
  readonly pan: string;
  @IsNotEmpty()
  roles: Role;
}
