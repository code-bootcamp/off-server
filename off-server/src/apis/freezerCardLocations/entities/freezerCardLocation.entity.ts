import { Field, Float, ObjectType } from '@nestjs/graphql';
import { FreezerFood } from 'src/apis/freezerFoods/entities/freezerFood.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class FreezerCardLocation {
  @PrimaryColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Float)
  source: number;

  @Column()
  @Field(() => Float)
  detination: number;

  @JoinColumn()
  @OneToOne(() => FreezerFood)
  @Field(() => FreezerFood)
  freezerFood: FreezerFood;
}
