import { Field, InputType, Int, OmitType } from "@nestjs/graphql";
import { FridgeFood } from "../entities/fridgeFood.entity";

@InputType()
export class CreateFridgeFoodInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => Date)
  expDate: Date;

  @Field(() => Int)
  alarm: number;

  @Field(() => String)
  category: string
}