import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Freezer } from '../freezers/entities/freezer.entity';
import { FreezerService } from '../freezers/freezersService.service';
import { Fridge } from '../fridges/entities/fridges.entity';
import { FridgesService } from '../fridges/fridges.service';

import { User } from './entities/user.entity';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Fridge, Freezer])],
  providers: [
    UserResolver, 
    UsersService,
    FridgesService,
    FreezerService
  ],
})
export class UsersModule {}
