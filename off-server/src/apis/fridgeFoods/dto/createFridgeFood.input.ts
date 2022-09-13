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

  @Field(() => Date)
  alarm: Date;

  @Field(() => String)
  category: string
}