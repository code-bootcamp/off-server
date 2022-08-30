import { Field, ObjectType } from '@nestjs/graphql';
import { FridgeFood } from 'src/apis/fridgeFoods/entities/fridgeFood.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Fridge {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @JoinColumn()
  @OneToOne(() => User)
  @Field(() => User)
  user: User;
}
