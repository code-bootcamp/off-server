import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Freezer {
  @PrimaryColumn('uuid')
  @Column(() => String)
  id: string;

  // @OneToOne(() => User)
  // @Field(() => User)
  // user: User
}
