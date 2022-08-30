import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';

import { FridgeFood } from '../fridgeFoods/entities/fridgeFood.entity';
import { Fridge } from '../fridges/entities/fridges.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FridgeFood, Fridge, Category])],
})
export class FridgeFoodsModule {}
