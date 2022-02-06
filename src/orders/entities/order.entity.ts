import { IsBoolean, IsNotEmpty } from 'class-validator';
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

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: Number;

  @Column()
  @IsNotEmpty()
  loadFrom: String;

  @Column()
  @IsNotEmpty()
  unloadTo: String;

  @Column()
  @IsNotEmpty()
  dateOfDelivery: String;

  @Column()
  @IsNotEmpty()
  typeOfGood: String;

  @Column()
  @IsNotEmpty()
  weightOfGood: Number;

  @Column()
  @IsNotEmpty()
  noOfTruck: Number;

  @Column()
  @IsNotEmpty()
  truckPreference: String;

  @IsNotEmpty()
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToOne(() => Vehicle)
  @JoinColumn()
  vehicle: Vehicle;

  // @Column()
  // vehcileId: number;

  @Column()
  customer_username: String;

  @Column()
  customer_phoneNumber: number;

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
  additionalDescription: String;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (driver) => driver.orders)
  driver: User;

  @Column()
  driver_username: String;

  @Column()
  driver_phoneNumber: String;
}
