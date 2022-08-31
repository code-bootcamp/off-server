import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/apis/category/entities/category.entity';
import { Freezer } from 'src/apis/freezers/entities/freezer.entity';
import { Fridge } from 'src/apis/fridges/entities/fridges.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @ManyToOne(() => Fridge)
  @Field(() => Fridge)
  fridge: Fridge;

  @ManyToOne(() => Category)
  @Field(() => Category)
  category: Category;

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  isDeletedAt: Date
}
