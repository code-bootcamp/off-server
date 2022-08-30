import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthsResolver } from './auths.resolver';
import { Token } from './entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token, User])],
  providers: [
    AuthsResolver, //
  ],
})
export class AuthsModule {}
