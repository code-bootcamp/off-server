import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;

  @Field(() => String)
  categoryId: string;

  @Field(() => Int)
  price: number;

  @Field(() => Date)
  expDate: Date;

  // 제목 내용 가격 유통기한
  // 회원아이디 카레고리아이디
}
