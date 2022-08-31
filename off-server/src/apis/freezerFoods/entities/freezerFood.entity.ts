import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/apis/category/entities/category.entity';
import { Freezer } from 'src/apis/freezers/entities/freezer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class FreezerFood {
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

  @ManyToOne(() => Freezer)
  @Field(() => Freezer)
  freezer: Freezer;

  @ManyToOne(() => Category)
  @Field(() => Category)
  category: Category;
}
