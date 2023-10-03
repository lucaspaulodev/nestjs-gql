import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo, TodoConnection } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { CursorPaginationArgs } from './dto/cursor-pagination-args.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => TodoConnection, { name: 'todos_paginated_query' })
  async findAllPaginated(@Args('paginationArgs') paginationArgs: CursorPaginationArgs,): Promise<TodoConnection> {
    return await this.todoService.findWithPagination(paginationArgs);
  }

  @Query(() => [Todo], { name: 'todos' })
  async findAll() {
    return await this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'todo' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  async createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return await this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo)
  async updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return await this.todoService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Todo)
  async removeTodo(@Args('id', { type: () => Int }) id: number) {
    return await this.todoService.remove(id);
  }
}
