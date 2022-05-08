import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Ledger } from 'src/ledger/entities/ledger.entity';
import { User } from 'src/users/users.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Trip } from '../trips/entities/trip.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: Number;

  @Column({ nullable: true })
  @IsNotEmpty()
  loadFrom: String;

  @Column({ nullable: true })
  @IsNotEmpty()
  unloadTo: String;

  @Column({ nullable: true })
  @IsNotEmpty()
  dateOfDelivery: String;

  @Column({ nullable: true })
  @IsNotEmpty()
  typeOfGood: String;

  @Column({ nullable: true })
  @IsNotEmpty()
  weightOfGood: Number;

  @Column({ nullable: true })
  @IsNotEmpty()
  noOfTruck: Number;

  @Column({ nullable: true, default: 0 })
  price: number;

  @Column({ default: 0 })
  customerPrice: String;

  @Column({ nullable: true, default: '' })
  @IsNotEmpty()
  truckPreference: String;

  @Column({ nullable: true, default: '' })
  @IsNotEmpty()
  truckDetail: String;

  @Column({ nullable: true })
  distance: number;

  @IsNotEmpty()
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  // @OneToOne(() => Vehicle)
  // @JoinColumn()
  // vehicle: Vehicle;

  // @Column()
  // vehcileId: number;

  @Column({ nullable: true })
  customer_username: String;

  @Column({ type: 'bigint', default: '0000000000' })
  customer_phoneNumber: number;

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

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  needHelper: boolean;

  @Column({ nullable: true, default: '' })
  additionalDescription: String;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //---Remover driver id,vehicle id ,driver_username,driver_phoneNumber

  // @ManyToOne(() => User, (driver) => driver.orders)
  // driver: User;

  // @Column({ nullable: true })
  // driver_username: String;

  // @Column({ nullable: true })
  // driver_phoneNumber: String;

  @Column({ default: 0, nullable: true })
  noOfTrips: number;

  @OneToMany(() => Trip, (trip) => trip.order)
  trips: Trip[];

  @OneToOne(() => Ledger, (ledger) => ledger.order)
  ledger: Ledger;

  async addTrips(trip: Trip) {
    if (this.trips == null) {
      this.trips = Array<Trip>();
      console.log('CREATING NEW TRIP ARAY -----------------');
    }

    console.log('AVAILABLE TRIPS', this.trips);
    this.trips.push(trip);
    console.log('NEW TRIPS----------', this.trips);
  }

  async addOrderLedger(ledger: Ledger): Promise<Ledger> {
    if (this.ledger == null) {
      this.ledger = ledger;
      return ledger;
    } else {
      return this.ledger;
    }
  }
}
