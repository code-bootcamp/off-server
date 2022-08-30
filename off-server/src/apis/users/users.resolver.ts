import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';

@Resolver()
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  fetchUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  fetchUser(@Args('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') CreateUserInput: CreateUserInput) {
    const hashePassword = await bcrypt.hash(CreateUserInput.password, 10);
    return this.usersService.create({
      hashePassword,
      ...CreateUserInput,
    });
  }
}
