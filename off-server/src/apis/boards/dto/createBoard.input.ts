import { Field, InputType, Int } from '@nestjs/graphql';
import { SalesLocationsInput } from 'src/apis/salesLocations/dto/salesLocation.input';
import { User } from 'src/apis/users/entities/user.entity';

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

  @Field(() => SalesLocationsInput)
  salesLocations: SalesLocationsInput;

  // 제목 내용 가격 유통기한
  // 회원아이디 카레고리아이디
}
