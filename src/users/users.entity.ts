import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import Role from './role.enum';
import { Order } from 'src/orders/entities/order.entity';
import { Cipher } from 'crypto';
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 25 })
  @Length(4, 20)
  @IsNotEmpty()
  username: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  // @Length(5, 100)
  password: string;

  @Column()
  @IsNotEmpty()
  // @Length(10, 10)
  phoneNumber: number;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  state: string;

  @Column({ default: '' })
  identification: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  roles: Role;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @BeforeInsert()
  async hashPasswprd() {
    this.password = await bcrypt.hash(this.password, 8);
  }
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
