import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/type/context';
import { AuthsService } from './auths.service';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Resolver()
export class AuthsResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly authsService: AuthsService,
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
}
