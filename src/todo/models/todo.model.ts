import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  detail?: string
}
@ObjectType()
export class PageInfo {
  @Field()
  hasNextPage: boolean;

  @Field({ nullable: true })
  endCursor?: number;
}

@ObjectType()
export class TodoConnection {
  @Field(() => [TodoEdge])
  edges: TodoEdge[];

  @Field()
  pageInfo: PageInfo
}

@ObjectType()
export class TodoEdge {
  @Field()
  cursor: number;

  @Field()
  node: Todo;
}
