import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CursorPaginationArgs {
  @Field(() => Int, { defaultValue: 3 })
  first: number;

  @Field({ nullable: true })
  after?: number;
}