import {
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/type/context';
import { AuthsService } from './auths.service';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';

@Resolver()
export class AuthsResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly authsService: AuthsService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // mutation
  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    const user = await this.userService.findOne({ email });
    if (!user)
      throw new UnprocessableEntityException(
        '이메일이나 비밀번호를 확인해주세요',
      );
    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth)
      throw new UnprocessableEntityException(
        '이메일이나 비밀번호를 확인해주세요',
      );

    this.authsService.setRefreshToken({ user, res: context.res });
    return this.authsService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  async logout(@Context() context: IContext) {
    const accessToken = context.req.headers['authorization'].slice(7);
    const refreshToken = context.req.headers['cookie'].slice(13);

    try {
      jwt.verify(accessToken, 'myAccessKey');
      jwt.verify(refreshToken, 'myRefreshKey');
    } catch {
      throw new UnauthorizedException();
    }

    await this.cacheManager.set(`accessToken:${accessToken}`, accessToken, {
      ttl: 1200,
    });
    await this.cacheManager.set(`refreshToken:${refreshToken}`, refreshToken, {
      ttl: 3600,
    });
    //
    return '로그아웃';
  }
}
