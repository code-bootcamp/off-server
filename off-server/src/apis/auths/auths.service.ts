import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

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

    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.freshfridge.shop; SameSite=None; Secure; httpOnly;`,
    // );
    // res.setHeader('Access-Control-Allow-Origin', 'http://freshfridge.shop')

    const allowedOrigins = ['http://freshfridge.shop', 'http://localhost:3000', 'https://freshfridge.shop'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,HEAD,OPTIONS,POST,PUT',
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    );
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

  async setSocialLogin({res, req}){
    let user = await this.userService.findOne( {email: req.user.email} )

    if (!user) {
      const hashedPassword = await bcrypt.hash(req.user.password, 10);

      user = await this.userService.create({
        hashedPassword,
        email: req.user.email,
        name: req.user.name,
        phone: req.user.phone,
        nickname: req.user.nickname
      });
    }

    this.setRefreshToken({ user, res, req });
    res.redirect('/main');
  }
}
