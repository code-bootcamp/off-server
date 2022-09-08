import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BoardsImage } from 'src/apis/boardsImages/entities/boardsImage.entity';
import { Category } from 'src/apis/category/entities/category.entity';
import { SalesLocations } from 'src/apis/salesLocations/entities/salesLocation.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Board_STATUS_ENUM {
  SALE = 'SALE',
  SOLDOUT = 'SOLDOUT',
  RESERVATION = 'RESERVATION',
}

registerEnumType(Board_STATUS_ENUM, {
  name: 'BOARD_STATUS_ENUM',
});
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

  @Column({ type: 'enum', enum: Board_STATUS_ENUM })
  @Field(() => Board_STATUS_ENUM)
  status: string;

  @JoinColumn()
  @OneToOne(() => SalesLocations)
  @Field(() => SalesLocations)
  salesLocation: SalesLocations;

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

  @UpdateDateColumn()
  updatedAt: Date;
}
