import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Freezer } from '../freezers/entities/freezer.entity';
import { User } from '../users/entities/user.entity';
import { FreezerService } from './freezersService.service';

@Module({
  imports: [TypeOrmModule.forFeature([Freezer, User])],
  providers: [FreezerService]
})
export class FreezersModule {}
