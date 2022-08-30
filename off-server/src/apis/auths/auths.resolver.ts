import { CACHE_MANAGER, Inject, UnprocessableEntityException } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/type/context';
import { AuthsService } from './auths.service';
import * as bcrypt from 'bcrypt'

@Resolver()
export class AuthsResolver {
  constructor(
    // private readonly userService: UsersService,
    private readonly authsService: AuthsService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  // query

  // mutation
  @Mutation(() => String)
  async login (
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    // const user = await userService.fetchUser(email)
    // const isAuth = await bcrypt.compare(password, user.password)
    
    // if ( !isAuth || !user ) throw new UnprocessableEntityException('이메일이나 비밀번호를 확인해주세요')
  }

}
