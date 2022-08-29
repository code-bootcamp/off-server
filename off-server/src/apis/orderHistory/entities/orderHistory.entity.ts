import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class OrderHistory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @CreateDateColumn()
  @Field(() => Date)
  orderDate: Date;

  @Column()
  @Field(() => Int)
  price: number;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  //   @ManyToOne(() => Board)
  //   @Field(() => Board)
  //   board: Board;
}
