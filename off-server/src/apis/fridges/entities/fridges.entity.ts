import { Field, ObjectType } from '@nestjs/graphql';
import { FridgeFood } from 'src/apis/fridgeFoods/entities/fridgeFood.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Fridge {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => FridgeFood)
  @Field(() => FridgeFood)
  fridgeFood: FridgeFood;
}
