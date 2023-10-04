import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { PrismaService } from '../prisma/prisma.service';
import { fakePaginatedTodos, fakeTodoDatabaseMethods, fakeTodos, fakeUniqueTodo, updateTodoInput, updatedTodo } from './test/mock-todo';
import { Todo } from '@prisma/client';
import { TodoConnection } from './models/todo.model';

describe('TodoService', () => {
  let service: TodoService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: PrismaService,
          useValue: fakeTodoDatabaseMethods
        }
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find all todos', () => {
    it('should return an array of all todos', async () => {
      const todos = await service.findAll();
      expect(todos).toEqual(fakeTodos);
    });
  });

  describe('find paginated todos', () => {
    it('should return paginated todos', async () => {
      const todosPaginated: TodoConnection = await service.findWithPagination({first: 1});
      expect(todosPaginated).toEqual(fakePaginatedTodos);
    });
  });

  describe('find a single todo', () => {
    it('should get a single todo', async () => {
      const todo = await service.findOne(1)

      expect(todo).toEqual(fakeUniqueTodo);
    });
  });

  describe('create a todo', () => {
    it('should successfully create a todo', async () => {
      const createdTodo = await service.create({
        title: "Hello",
        detail: "Hello",
      })
      expect(
        createdTodo
      ).toEqual(fakeUniqueTodo);
    });
  });

  describe('update a todo', () => {
    it('should call the update method', async () => {
      const todo = await service.update(1, updateTodoInput);

      expect(todo).toEqual(updatedTodo);

      expect(prisma.todo.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          title: updateTodoInput.title,
          detail: updateTodoInput.detail,
        },
      });
    });
  });

  describe('delete a todo', () => {
    it('should call the remove method', async () => {
      const idToDelete = 1;

      const result = await service.remove(idToDelete);

      expect(result).toEqual(fakeUniqueTodo);
      expect(prisma.todo.delete).toHaveBeenCalledWith({
        where: { id: idToDelete },
      });
    });
  });
});
