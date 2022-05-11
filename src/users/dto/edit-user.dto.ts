import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
export class EditUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly city: string;

  @IsNotEmpty()
  readonly district: string;

  @IsNotEmpty()
  readonly state: string;

  @IsNotEmpty()
  readonly street: string;

  @IsNotEmpty()
  //   @IsNumber()
  readonly phoneNumber: number;

  @IsString()
  readonly pan: string;

  @IsNotEmpty()
  readonly contact_person: string;
}
