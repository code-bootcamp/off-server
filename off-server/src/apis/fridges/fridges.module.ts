import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fridge } from '../fridges/entities/fridges.entity';
import { User } from '../users/entities/user.entity';
import { FridgesResolver } from './fridges.resolver';
import { FridgesService } from './fridges.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fridge, User])],
  providers: [
    FridgesResolver, //
    FridgesService,
  ]
})
export class FridgesModule {}
