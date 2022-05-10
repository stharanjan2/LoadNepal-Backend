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
  readonly city: string;

  @IsNotEmpty()
  readonly district: string;

  @IsNotEmpty()
  readonly state: string;

  @IsNotEmpty()
  readonly street: string;

  @IsNotEmpty()
  @IsNumber()
  readonly phoneNumber: number;

  @IsString()
  readonly pan: string;

  readonly identifiaction: string;

  @IsNotEmpty()
  readonly contact_person: string;

  @IsNotEmpty()
  readonly roles: Role;
}
