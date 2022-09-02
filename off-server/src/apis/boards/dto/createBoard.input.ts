import { Field, InputType, Int } from '@nestjs/graphql';
import { BoardsImage } from 'src/apis/boardsImages/entities/boardsImage.entity';
import { SalesLocationsInput } from 'src/apis/salesLocations/dto/salesLocation.input';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;

  @Field(() => String)
  categoryId: string;

  @Field(() => Date)
  expDate: Date;

  @Field(() => SalesLocationsInput)
  salesLocations: SalesLocationsInput;

  @Field(() => [String])
  url: string[];
}
