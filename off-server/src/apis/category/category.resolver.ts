import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  async createCategory(@Args('name') name: string) {
    return await this.categoryService.create({ name });
  }
  @Query(() => [Category])
  fetchCategory() {
    return this.categoryService.findAll();
  }
}
