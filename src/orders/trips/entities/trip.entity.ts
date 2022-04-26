import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/users.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'trips' })
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: Number;

  @ManyToOne(() => Order, (order) => order.trips) //orderId
  order: Order;

  @ManyToOne(() => User, (user) => user.trips) //userId
  user: User;

  @Column({ default: '' })
  @IsNotEmpty()
  vehicleNo: String;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isAccepted: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isConfirmed: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isShipped: boolean;

  @Column({ nullable: true })
  driver_username: String;

  @Column({ nullable: true })
  driver_phoneNumber: String;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isDestinationReached: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  payementMade: boolean;

  @Column({ default: 0 })
  advance: Number;

  @Column({ default: 0 })
  total: number;

  @Column({ default: 0 })
  due: number;

  @Column({ default: 0 })
  amount_payed: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //   @ManyToOne(() => User, (driver) => driver.orders)
  //   driver: User;
}
