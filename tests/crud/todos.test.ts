import { test, expect } from '../fixtures/api-fixture';
import { APIHelper } from '../helpers/api-helper';

test.describe('CRUD - Todos', () => {
  let api: APIHelper;

  test.beforeEach(async ({ apiContext }) => {
    api = new APIHelper(apiContext);
  });

  test('READ - Listar todos os todos/tarefas', async () => {
    const response = await api.get('/todos');
    await api.assertStatus(response, 200);

    const todos = await response.json();
    expect(Array.isArray(todos)).toBe(true);
    expect(todos.length).toBeGreaterThan(0);
    
    // Validar estrutura do primeiro todo
    expect(todos[0]).toHaveProperty('userId');
    expect(todos[0]).toHaveProperty('id');
    expect(todos[0]).toHaveProperty('title');
    expect(todos[0]).toHaveProperty('completed');
  });

  test('READ - Obter todo/tarefa por ID', async () => {
    const todoId = 1;
    const response = await api.get(`/todos/${todoId}`);
    await api.assertStatus(response, 200);

    const todo = await response.json();
    expect(todo.id).toBe(todoId);
    expect(todo.userId).toBeDefined();
    expect(typeof todo.title).toBe('string');
    expect(typeof todo.completed).toBe('boolean');
  });

  test('READ - Filtrar todos por usuário', async () => {
    const userId = 1;
    const response = await api.get(`/todos?userId=${userId}`);
    await api.assertStatus(response, 200);

    const todos = await response.json();
    expect(Array.isArray(todos)).toBe(true);
    
    if (todos.length > 0) {
      todos.forEach((todo: any) => {
        expect(todo.userId).toBe(userId);
      });
    }
  });

  test('READ - Filtrar todos completados', async () => {
    const response = await api.get('/todos?completed=true');
    await api.assertStatus(response, 200);

    const todos = await response.json();
    expect(Array.isArray(todos)).toBe(true);
    
    todos.forEach((todo: any) => {
      expect(todo.completed).toBe(true);
    });
  });

  test('READ - Filtrar todos não completados', async () => {
    const response = await api.get('/todos?completed=false');
    await api.assertStatus(response, 200);

    const todos = await response.json();
    expect(Array.isArray(todos)).toBe(true);
    
    todos.forEach((todo: any) => {
      expect(todo.completed).toBe(false);
    });
  });

  test('CREATE - Criar novo todo/tarefa', async () => {
    const newTodo = {
      userId: 1,
      title: 'Tarefa criada através de teste automatizado',
      completed: false,
    };

    const response = await api.post('/todos', newTodo);
    await api.assertStatus(response, 201);

    const createdTodo = await response.json();
    expect(createdTodo.userId).toBe(newTodo.userId);
    expect(createdTodo.title).toBe(newTodo.title);
    expect(createdTodo.completed).toBe(newTodo.completed);
    expect(createdTodo.id).toBeDefined();
    expect(typeof createdTodo.id).toBe('number');
  });

  test('CREATE - Criar todo com tarefa marcada como completa', async () => {
    const newTodo = {
      userId: 2,
      title: 'Tarefa já completa',
      completed: true,
    };

    const response = await api.post('/todos', newTodo);
    await api.assertStatus(response, 201);

    const createdTodo = await response.json();
    expect(createdTodo.completed).toBe(true);
  });

  test('UPDATE - Marcar todo como completo (PUT)', async () => {
    const todoId = 1;
    const updatedData = {
      userId: 1,
      id: todoId,
      title: 'Tarefa Atualizada',
      completed: true,
    };

    const response = await api.put(`/todos/${todoId}`, updatedData);
    await api.assertStatus(response, 200);

    const todo = await response.json();
    expect(todo.completed).toBe(true);
    expect(todo.title).toBe(updatedData.title);
  });

  test('UPDATE - Atualizar apenas o status (PATCH)', async () => {
    const todoId = 2;
    const partialUpdate = {
      completed: false,
    };

    const response = await api.patch(`/todos/${todoId}`, partialUpdate);
    await api.assertStatus(response, 200);

    const todo = await response.json();
    expect(todo.completed).toBe(false);
  });

  test('UPDATE - Atualizar apenas o título (PATCH)', async () => {
    const todoId = 3;
    const partialUpdate = {
      title: 'Título da tarefa atualizado via PATCH',
    };

    const response = await api.patch(`/todos/${todoId}`, partialUpdate);
    await api.assertStatus(response, 200);

    const todo = await response.json();
    expect(todo.title).toBe(partialUpdate.title);
  });

  test('DELETE - Deletar todo/tarefa', async () => {
    const todoId = 10;
    const response = await api.delete(`/todos/${todoId}`);
    await api.assertStatus(response, 200);
  });

  test('READ - Validar 404 para todo inexistente', async () => {
    const response = await api.get('/todos/999999');
    expect(response.status()).toBe(404);
  });

  test('Fluxo: Criar -> Marcar como Completo -> Deletar', async () => {
    // CREATE
    const newTodo = {
      userId: 1,
      title: 'Tarefa para fluxo completo',
      completed: false,
    };

    let response = await api.post('/todos', newTodo);
    const createdTodo = await response.json();
    const todoId = createdTodo.id;

    expect(createdTodo.completed).toBe(false);

    // UPDATE - Marcar como completo
    const updatedData = {
      userId: 1,
      id: todoId,
      title: newTodo.title,
      completed: true,
    };

    response = await api.put(`/todos/${todoId}`, updatedData);
    const updatedTodo = await response.json();
    expect(updatedTodo.completed).toBe(true);

    // DELETE
    response = await api.delete(`/todos/${todoId}`);
    expect(response.status()).toBe(200);
  });
});
