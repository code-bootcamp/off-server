import { InputType } from "@nestjs/graphql";
import { CreateFridgeFoodInput } from "./createFridgeFood.input";

@InputType()
export class UpdateFridgeFoodInput extends CreateFridgeFoodInput {}