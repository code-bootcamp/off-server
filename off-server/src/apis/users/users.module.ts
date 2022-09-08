import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fridge } from '../fridges/entities/fridges.entity';
import { FridgesService } from '../fridges/fridges.service';
import { UsersImage } from '../usersImages/entities/usersImage.entity';

import { User } from './entities/user.entity';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    User, //
    Fridge,
    UsersImage, 
  ])],
  providers: [
    UserResolver, //
    UsersService, 
    FridgesService
  ],
})
export class UsersModule {}
