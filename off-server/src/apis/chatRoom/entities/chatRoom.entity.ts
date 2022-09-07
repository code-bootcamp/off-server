import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/boards/entities/board.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ChatRoom {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column(() => String)
  @Field(() => String)
  room: string;

  @ManyToOne(() => Board)
  @Field(() => Board)
  board: Board

  @ManyToOne(() => User)
  @Field(() => User)
  user: User
}