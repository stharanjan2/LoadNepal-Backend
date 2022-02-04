import { IsBoolean, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/users.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_id: Number;

  @Column()
  @IsNotEmpty()
  load_from: String;

  @Column()
  @IsNotEmpty()
  unload_to: String;

  @Column()
  @IsNotEmpty()
  date_of_delivery: String;

  @Column()
  @IsNotEmpty()
  type_of_good: String;

  @Column()
  @IsNotEmpty()
  weight_of_good: Number;

  @Column()
  @IsNotEmpty()
  no_of_truck: Number;

  @Column()
  @IsNotEmpty()
  truck_preference: String;

  @IsNotEmpty()
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column()
  vehcileId: number;

  @Column()
  user_username: String;

  @Column()
  user_phoneNumber: number;

  @Column()
  distance: number;

  @Column()
  price: number;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isLocked: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isAccepted: boolean;

  //confirmed by admin/customer to transition from type 1 pending load to type 2 pending load

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isConfirmed: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isShipped: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isDestinationReached: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isPayementMade: boolean;

  @Column()
  additionalDeescription: String;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (driver) => driver.orders)
  driver: User;
}
