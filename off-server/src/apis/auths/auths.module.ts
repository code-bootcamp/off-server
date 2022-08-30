import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Token } from './entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token, User])],
})
export class AuthsModule {}
