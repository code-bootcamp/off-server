import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class FridgeFood {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Date)
  expDate: Date;

  @CreateDateColumn()
  @Field(() => Date)
  regDate: Date;

  @Column()
  @Field(() => Int)
  alarm: number;

  //   @ManyToOne(() => Freezer)
  //   @Field(() => Freezer)
  //   freezer: Freezer;

  //   @OneToOne(() => Category)
  //   @Field(() => Category)
  //   category: Category;
}
