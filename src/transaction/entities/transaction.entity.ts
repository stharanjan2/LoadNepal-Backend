import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_id: Number;

  @Column()
  @IsNotEmpty()
  ad_from: String;

  @Column()
  @IsNotEmpty()
  load_to: String;

  @Column()
  @IsNotEmpty()
  te_of_delivery: String;

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

  // @ManyToOne(() => User, (client) => client.orders)
  // client: User;

  // @ManyToOne(() => User, (driver) => driver.orders)
  // driver: User;
}
