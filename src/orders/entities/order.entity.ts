import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
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

  @ManyToOne(() => User, (client) => client.orders)
  client: User;

  @ManyToOne(() => User, (driver) => driver.orders)
  driver: User;
}
