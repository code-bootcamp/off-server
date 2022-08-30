import { Field, ObjectType } from '@nestjs/graphql';
import { UsersImage } from 'src/apis/usersImages/entities/usersImage.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @OneToOne(() => UsersImage)
  @Field(() => UsersImage)
  usersimage: UsersImage;
}
