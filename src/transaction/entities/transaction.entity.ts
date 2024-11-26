import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'id-trasaction' })
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  type: string;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'id-user' })
  user: User;

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn({ name: 'id-category' })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
