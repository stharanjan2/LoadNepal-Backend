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
import { Notification } from 'src/notification/entities/notification.entity';
import { Cipher, Verify } from 'crypto';
import { Vehicle } from 'src/vehicle/vehicle.entity';
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: number;

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

  @Column({ default: '' })
  contact_person: string;

  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  pan: string;

  @Column({ default: '' })
  district: string;

  @Column({ default: '' })
  state: string;

  @Column({ default: '' })
  identification: string;

  @Column({ default: false })
  verified: boolean;

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

  @OneToMany(() => Vehicle, (vehicle) => vehicle.driver)
  vehicles: Vehicle[];

  @OneToMany(() => Notification, (notification) => notification.receiver)
  notification: Notification[];

  @BeforeInsert()
  async hashPasswprd() {
    this.password = await bcrypt.hash(this.password, 8);
  }
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
