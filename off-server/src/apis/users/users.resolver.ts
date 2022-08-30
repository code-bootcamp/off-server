import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { updateUserInput } from './dto/updateUser.input';

@Resolver()
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  fetchUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  fetchUser(@Args('email') email: string) {
    return this.usersService.findOne({ email });
  }

  @Query(() => [User])
  fetchUserWithDeleted() {
    return this.usersService.findUsersWithDeleted();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') CreateUserInput: CreateUserInput) {
    const hashePassword = await bcrypt.hash(CreateUserInput.password, 10);
    return this.usersService.create({
      hashePassword,
      ...CreateUserInput,
    });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('email') email: string,
    @Args('updateUserInput') updateUserInput: updateUserInput,
  ) {
    return this.usersService.update({ updateUserInput, email });
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
