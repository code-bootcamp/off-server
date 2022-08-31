import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';

import { FridgeFood } from '../fridgeFoods/entities/fridgeFood.entity';
import { Fridge } from '../fridges/entities/fridges.entity';
import { FridgeFoodsResolver } from './fridgeFoods.resolver';
import { FridgeFoodsService } from './fridgeFoods.service';

@Module({
  imports: [TypeOrmModule.forFeature([FridgeFood, Fridge, Category])],
  providers: [
    FridgeFoodsResolver, //
    FridgeFoodsService
  ]
})
export class FridgeFoodsModule {}
