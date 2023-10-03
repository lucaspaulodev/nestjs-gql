import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  title: string

  @Field({ nullable: true })
  detail?: string
}
