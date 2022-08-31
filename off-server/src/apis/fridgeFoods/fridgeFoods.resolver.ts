import { Resolver } from "@nestjs/graphql";
import { FridgeFoodsService } from "./fridgeFoods.service";

@Resolver()
export class FridgeFoodsResolver {
  constructor(
    private readonly fridgeFoodsService: FridgeFoodsService,
  ){}
}