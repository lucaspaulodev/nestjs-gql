import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput } from './models/create-todo.input';
import { UpdateTodoInput } from './models/update-todo.input';
import { PrismaService } from '../prisma/prisma.service';
import { CursorPaginationArgs } from '../todo/models/cursor-pagination-args.input';
import { Todo, TodoConnection, TodoEdge } from './models/todo.model';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  
  async create(createTodoInput: CreateTodoInput): Promise<Todo> {
    return await this.prisma.todo.create({
      data: {
        title: createTodoInput.title,
        detail: createTodoInput.detail
      }
    });
  }
  
  async findWithPagination({ first, after }: CursorPaginationArgs): Promise<TodoConnection> {
    const take = first + 1; // Fetch one more record than requested to determine hasNextPage

    const todos: Todo[] = await this.prisma.todo.findMany({
      take,
      cursor: after ? { id: after }  : undefined ,
      orderBy: {created_at: 'desc'}
    });

    const edges: TodoEdge[] = todos.slice(0, first).map((todo) => {
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

  async findAll(): Promise<Todo[]> {
    return await this.prisma.todo.findMany();
  }

  async findOne(id: number): Promise<Todo> {
    return await this.prisma.todo.findUnique({where: { id }});
  }

  async update(id: number, updateTodoInput: UpdateTodoInput): Promise<Todo> {
    try {
      const todo = await this.prisma.todo.update({
        where: { id },
        data: {
          title: updateTodoInput.title,
          detail: updateTodoInput.detail
        }
      })

      return todo;
    } catch (error) {
      throw new NotFoundException()
    }
    
  }

  async remove(id: number): Promise<Todo> {
    try{
      return await this.prisma.todo.delete({where: { id }});
    } catch (error) {
      throw new NotFoundException()
    }
  }
}
