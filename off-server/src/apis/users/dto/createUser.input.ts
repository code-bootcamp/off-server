import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  // 이메일 이름 패스워드 전화번호 닉네임

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  nickname: string;

}
