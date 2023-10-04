export const fakeTodos = [
    {
      id: 1,
      title: "Hello",
      detail: "Hello",
      created_at: new Date(),
    },
    {
      id: 2,
      title: "Hello",
      detail: "Hello",
      created_at: new Date(),
    },
    {
      id: 3,
      title: "Hello",
      detail: "Hello",
      created_at: new Date(),
    },
    {
      id: 4,
      title: "Hello",
      detail: "Hello",
      created_at: new Date(),
    }
];
  
export const fakePaginatedTodos = {
    edges: [
        {
            cursor: 1, 
            node: {
                created_at: new Date(),
                detail: 'Hello',
                id: 1,
                title: 'Hello',
            }
        }
    ], 
    pageInfo: {
        endCursor: 1,
        hasNextPage: true
    }
}

export const updateTodoInput = {
    title: 'Updated Title',
    detail: 'Updated Detail',
};

export const updatedTodo = {
    id: 1,
    title: updateTodoInput.title,
    detail: updateTodoInput.detail,
};
  
export const fakeUniqueTodo = fakeTodos[0]
  
export const fakeTodoDatabaseMethods = {
    todo: {
        findMany: jest.fn().mockResolvedValue(fakeTodos),
        findUnique: jest.fn().mockResolvedValue(fakeUniqueTodo),
        findFirst: jest.fn().mockResolvedValue(fakeUniqueTodo),
        create: jest.fn().mockReturnValue(fakeUniqueTodo),
        save: jest.fn(),
        update: jest.fn().mockResolvedValue(updatedTodo),
        delete: jest.fn().mockResolvedValue(fakeUniqueTodo),
    }
}