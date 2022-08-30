import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthsResolver } from './auths.resolver';
import { AuthsService } from './auths.service';
import { Token } from './entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token, User])],
  providers: [
    AuthsResolver, //
    AuthsService,
    JwtService,
    UsersService,
  ],
})
export class AuthsModule {}
