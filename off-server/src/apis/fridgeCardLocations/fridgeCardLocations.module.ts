import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FridgeFood } from '../fridgeFoods/entities/fridgeFood.entity';

import { FridgeCardLocation } from './entities/fridgeCardLocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FridgeCardLocation, FridgeFood])],
})
export class FridgeCardLocationsModule {}
