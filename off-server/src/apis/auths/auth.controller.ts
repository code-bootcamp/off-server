import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthsService } from './auths.service';
import * as bcrypt from 'bcrypt';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'nickname' | 'phone'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthsService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1. 가입확인
    let user = await this.userService.findOne({ email: req.user.email });

    // 2. 회원가입
    if (!user) {
      // const password = req.user.password
      // const hashePassword = await bcrypt.hash(password, 10);
      user = await this.userService.create({
      hashedPassword: req.user.password,
      email: req.user.email,
      name: req.user.name,
      phone: req.user.phone,
      nickname: req.user.nickname
      });
    }
    // 3. 로그인
    this.authService.setRefreshToken({ user, res, req });
    res.redirect('/main');
  }
}