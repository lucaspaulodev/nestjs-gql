import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { CursorPaginationArgs } from 'src/todo/dto/cursor-pagination-args.input';
import { TodoConnection, TodoEdge } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  async create(createTodoInput: CreateTodoInput) {
    return await this.prisma.todo.create({
      data: {
        title: createTodoInput.title,
        detail: createTodoInput.detail
      }
    });
  }
  
  async findWithPagination(
    { first, after }: CursorPaginationArgs,
  ): Promise<TodoConnection> {
    const take = first + 1; // Fetch one more record than requested to determine hasNextPage

    const todos = await this.prisma.todo.findMany({
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

  findAll() {
    return this.prisma.todo.findMany();
  }

  findOne(id: number) {
    return this.prisma.todo.findUnique({where: { id }});
  }

  update(id: number, updateTodoInput: UpdateTodoInput) {
    return this.prisma.todo.update({
      where: { id },
      data: {
        title: updateTodoInput.title,
        detail: updateTodoInput.detail
      }
    });
  }

  remove(id: number) {
    return this.prisma.todo.delete({where: { id }});
  }
}
