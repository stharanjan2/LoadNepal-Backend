import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Exclude()
  @Column()
  @IsEmail()
  email: string;

  @Exclude()
  @Column({ default: '' })
  dristrict: string;
}
