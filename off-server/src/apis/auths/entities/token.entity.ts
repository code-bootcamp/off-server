import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Token {
  @PrimaryColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Boolean)
  isAuth: boolean;

  @OneToOne(() => User)
  @Field(() => User)
  user: User;
}
