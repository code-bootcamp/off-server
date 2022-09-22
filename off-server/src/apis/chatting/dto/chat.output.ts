import { Field, ObjectType } from "@nestjs/graphql";
import { Board } from "src/apis/boards/entities/board.entity";

@ObjectType()
export class ChatOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  roomNumber: string;

  @Field(() => Board)
  board: Board;

  @Field(() => String)
  lastMessage: string;
  
  @Field(() => String)
  userId: string;

  @Field(() => String)
  sendUserId: string;
}