import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/apis/category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryColumn('uuid')
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

  @CreateDateColumn()
  @Field()
  regDate: Date;

  // @ManyToOne(() => User)
  // @Field(() => User)
  // userId: string;

  @OneToOne(() => Category)
  @Field(() => Category)
  categoryId: string;
}
