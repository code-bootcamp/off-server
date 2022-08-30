import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './createUser.input';

@InputType()
export class updateUserInput extends PartialType(CreateUserInput) {}
