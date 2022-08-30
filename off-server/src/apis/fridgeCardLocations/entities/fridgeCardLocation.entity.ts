import { Field, Float, ObjectType } from '@nestjs/graphql';
import { FridgeFood } from 'src/apis/fridgeFoods/entities/fridgeFood.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class FridgeCardLocation {
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
  @OneToOne(() => FridgeFood)
  @Field(() => FridgeFood)
  fridgeFood: FridgeFood;
}
