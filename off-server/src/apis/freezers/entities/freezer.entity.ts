import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Freezer {
  @PrimaryColumn('uuid')
  @Column(() => String)
  id: string;

  @JoinColumn()
  @OneToOne(() => User)
  @Field(() => User)
  user: User;
}
