import { IsNotEmpty } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/users.entity';
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

@Entity('ledgers')
export class Ledger extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ default: 0 })
  @IsNotEmpty()
  totalAmount: number;

  @Column({ default: 0 })
  @IsNotEmpty()
  totalAdvance: number;

  @Column({ default: 0 })
  @IsNotEmpty()
  totalDue: number;

  @Column({ default: 0 })
  @IsNotEmpty()
  totalPaid: number;

  @IsNotEmpty()
  @OneToOne(() => Order, (order) => order.ledger)
  @JoinColumn()
  order: Order;
  @ManyToOne(() => User, (user) => user.ledgers)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
