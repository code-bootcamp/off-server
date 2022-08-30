import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreezerFood } from 'src/apis/freezerFoods/entities/freezerFood.entity';
import { FreezerCardLocation } from './entities/freezerCardLocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FreezerCardLocation, FreezerFood])],
})
export class FreezerCardLocationsModule {}
