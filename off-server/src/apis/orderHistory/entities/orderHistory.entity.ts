import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/boards/entities/board.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class OrderHistory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @UpdateDateColumn()
  @Field(() => Date)
  orderDate: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Board)
  @Field(() => Board)
  board: Board;

  @DeleteDateColumn()
  deletedAt: Date;
}
