import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class BoardsResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
