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

@Entity({ name: 'vehicles' })
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lisenceNo: string;

  @Column({ unique: true })
  vehicleNo: string;

  @Column()
  insurance: string;

  @Column()
  vehicleModel: string;

  @Column()
  year: string;

  @Column()
  make: string;

  @Column()
  axelNo: string;

  @Column()
  tyreNo: string;

  @Column()
  bodyType: string;

  @Column()
  totalGrossVehicleWeight: string;

  @Column({ default: '' })
  lisence: string;

  @Column({ default: false })
  isOnTrip: boolean;

  @Column({ default: '' })
  billbook: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (driver) => driver.orders)
  driver: User;
}
