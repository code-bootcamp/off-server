import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/apis/category/entities/category.entity';
import { SalesLocation } from 'src/apis/salesLocations/entities/salesLocation.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;

  @Column()
  @Field(() => Date)
  expDate: Date;

  @Column()
  @Field(() => Int)
  price: number;

  @JoinColumn()
  @OneToOne(() => SalesLocation)
  @Field(() => SalesLocation)
  salesLocation: SalesLocation;

  @CreateDateColumn()
  @Field()
  regDate: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Category)
  @Field(() => Category)
  category: Category;

  @DeleteDateColumn()
  @Field(() => String)
  deletedAt: Date;
}
