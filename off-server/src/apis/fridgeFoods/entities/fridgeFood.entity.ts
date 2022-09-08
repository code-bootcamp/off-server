import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Category } from 'src/apis/category/entities/category.entity';
import { Fridge } from 'src/apis/fridges/entities/fridges.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum FRIDGE_STATUS_ENUM {
  FRIDGE = 'FRIDGE',
  FREEZER = 'FREEZER',
}

registerEnumType(FRIDGE_STATUS_ENUM, {
  name: 'FRIDGE_STATUS_ENUM',
});

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

  @Column({type: 'enum', enum: FRIDGE_STATUS_ENUM, nullable: true})
  @Field(() => FRIDGE_STATUS_ENUM)
  status: string;

  @ManyToOne(() => Fridge)
  @Field(() => Fridge)
  fridge: Fridge;

  @ManyToOne(() => Category)
  @Field(() => Category)
  category: Category;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  isDeletedAt: Date;
}
