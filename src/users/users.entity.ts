import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import Role from './role.enum';
import { Order } from 'src/orders/entities/order.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Exclude()
  @Column()
  @IsEmail()
  email: string;

  @Column({ unique: true, length: 500 })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  roles: Role;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @BeforeInsert()
  async hashPasswprd() {
    this.password = await bcrypt.hash(this.password, 8);
  }
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
