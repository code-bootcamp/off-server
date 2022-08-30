import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { FreezerFood } from './entities/freezerFood.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FreezerFood, User, Category])],
})
export class FreezerFoodsModule {}
