import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoRepository } from './todo.repository';

@Module({
  providers: [TodoResolver, TodoService, PrismaService, TodoRepository],
})
export class TodoModule {}
