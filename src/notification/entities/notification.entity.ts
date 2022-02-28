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

@Entity({ name: 'notification' })
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  title: String;
  @Column()
  message: String;
  @Column()
  type: String;

  @Column({ default: false })
  isViewed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User, (receiver) => receiver.notification)
  receiver: User;
}
