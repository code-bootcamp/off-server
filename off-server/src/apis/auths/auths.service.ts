import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UsersService,
  ) {}

  setRefreshToken({ user, res, req }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; domain=.freshfridge.shop; SameSite=None; Secure; httpOnly;`,
    );
    res.setHeader('Access-Control-Allow-Origin', 'http://freshfridge.shop')
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }
}
