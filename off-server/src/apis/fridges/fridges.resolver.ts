import { Resolver } from "@nestjs/graphql";
import { FridgesService } from "./fridges.service";

@Resolver()
export class FridgesResolver {
  constructor(
    private readonly fridgeService: FridgesService,
  ){}
}