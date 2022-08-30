import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Freezer {
  @PrimaryColumn('uuid')
  @Column(() => String)
  id: string;

  @OneToOne(() => User)
  @Field(() => User)
  user: User;
}
