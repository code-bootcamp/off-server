import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { updateUserInput } from './dto/updateUser.input';
import { FridgesService } from '../fridges/fridges.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';

@Resolver()
export class UserResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly fridgesService: FridgesService,
  ) {}

  @Query(() => [User])
  fetchUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchUserLoggedIn(
    @Context() context: IContext
  ) {
    const email = context.req.user.email
    return this.usersService.findOne({ email });
  }

  @Query(() => [User])
  fetchUserWithDeleted() {
    return this.usersService.findUsersWithDeleted();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') CreateUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(CreateUserInput.password, 10);
    const user = await this.usersService.create({
      hashedPassword,
      ...CreateUserInput,
    });

    const userId = user.id;
    await this.fridgesService.create({ userId });

    return user;
  }

  @Mutation(() => String)
  async getToken(@Args('phone') phone: string) {
    await this.usersService.checkPhone(phone);
    return await this.usersService.sendTokenToSMS({ phone });
  }
  @Mutation(() => String)
  async checkValidToken(
    @Args('phone') phone: string,
    @Args('token') token: string,
  ) {
    return await this.usersService.tokenCheck({ phone, token });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: updateUserInput,
    @Context() context: IContext,
  ) {
    const email = context.req.user.email;
    
    return this.usersService.update({ updateUserInput, email});
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Args('email') email: string, //
  ) {
    return this.usersService.delete({ email });
  }

  @Mutation(() => Boolean)
  restoreUser(@Args('email') email: string) {
    return this.usersService.restore({ email });
  }
}
