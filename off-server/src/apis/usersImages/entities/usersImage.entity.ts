import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/Users/entities/User.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class UsersImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  url: string;

  @OneToOne(() => User)
  @Field(() => User)
  user: User;
}
