import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { User } from "src/apis/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: 'POINT_TRANSACTION_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column()
  @Field(() => String)
  merchantUid: string;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  status: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
