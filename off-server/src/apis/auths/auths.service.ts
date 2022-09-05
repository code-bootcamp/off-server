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

    // res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.freshfridge.shop; SameSite=None; Secure; httpOnly;`,
    // );
    // res.setHeader('Access-Control-Allow-Origin', 'http://freshfridge.shop')

    // const allowedOrigins = ['http://freshfridge.shop', 'http://localhost:3000'];
    // const origin = req.headers.origin;
    // if (allowedOrigins.includes(origin)) {
    //   res.setHeader('Access-Control-Allow-Origin', origin);
    // }
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    // res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    // res.setHeader(
    //   'Access-Control-Allow-Headers',
    //   'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    // );
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; domain=.freshfridge.shop; SameSite=None; Secure; httpOnly;`,
    );
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }
}
