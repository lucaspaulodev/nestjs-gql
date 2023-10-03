import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './models/create-todo.input';
import { UpdateTodoInput } from './models/update-todo.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { CursorPaginationArgs } from 'src/todo/models/cursor-pagination-args.input';
import { Todo, TodoConnection, TodoEdge } from './models/todo.model';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly repository: TodoRepository) {}
  
  async create(createTodoInput: CreateTodoInput) {
    return await this.repository.create({
      data: {
        title: createTodoInput.title,
        detail: createTodoInput.detail
      }
    });
  }
  
  async findWithPagination({ first, after }: CursorPaginationArgs) {
    const take = first + 1; // Fetch one more record than requested to determine hasNextPage

    const todos = await this.repository.findMany({
      take,
      cursor: after ? { id: after }  : undefined ,
      orderBy: {created_at: 'desc'}
    });

    const edges = todos.slice(0, first).map((todo) => {
      return {
        cursor: todo.id,
        node: todo,
      }
    });

    const hasNextPage = todos.length > first;
    const endCursor = hasNextPage ? edges[edges.length - 1].cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        endCursor,
      }
    };
  }

  async findAll() {
    return await this.repository.findMany();
  }

  async findOne(id: number) {
    return await this.repository.findUnique({where: { id }});
  }

  async update(id: number, updateTodoInput: UpdateTodoInput) {
    return await this.repository.update({
      where: { id },
      data: {
        title: updateTodoInput.title,
        detail: updateTodoInput.detail
      }
    });
  }

  async remove(id: number) {
    return await this.repository.delete({where: { id }});
  }
}
