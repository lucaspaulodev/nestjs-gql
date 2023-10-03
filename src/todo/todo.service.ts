import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput } from './models/create-todo.input';
import { UpdateTodoInput } from './models/update-todo.input';
import { PrismaService } from '../prisma/prisma.service';
import { CursorPaginationArgs } from '../todo/models/cursor-pagination-args.input';

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
  
  async findWithPagination({ first, after }: CursorPaginationArgs) {
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

  async findAll() {
    return await this.prisma.todo.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.todo.findUnique({where: { id }});
  }

  async update(id: number, updateTodoInput: UpdateTodoInput) {
    try{
      return await this.prisma.todo.update({
        where: { id },
        data: {
          title: updateTodoInput.title,
          detail: updateTodoInput.detail
        }
      });
    } catch (error) {
      throw new NotFoundException()
    }
    
  }

  async remove(id: number) {
    try{
      return await this.prisma.todo.delete({where: { id }});
    } catch (error) {
      throw new NotFoundException()
    }
    
  }
}
