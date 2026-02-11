import { test, expect } from './fixtures/api-fixture';

test.describe('Testes de API - Posts', () => {
  test('Deve recuperar lista de posts com sucesso', async ({ apiContext }) => {
    const response = await apiContext.get('/posts');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test('Deve recuperar um post específico por ID', async ({ apiContext }) => {
    const postId = 1;
    const response = await apiContext.get(`/posts/${postId}`);
    
    expect(response.status()).toBe(200);
    
    const post = await response.json();
    expect(post.id).toBe(postId);
    expect(post.userId).toBeDefined();
    expect(post.title).toBeDefined();
    expect(post.body).toBeDefined();
  });

  test('Deve retornar 404 para post inexistente', async ({ apiContext }) => {
    const response = await apiContext.get('/posts/999999');
    
    expect(response.status()).toBe(404);
  });

  test('Deve criar um novo post com sucesso', async ({ apiContext }) => {
    const payload = {
      title: 'Novo Post de Teste',
      body: 'Este é um post criado durante testes automatizados',
      userId: 1,
    };

    const response = await apiContext.post('/posts', {
      data: payload,
    });

    expect(response.status()).toBe(201);

    const newPost = await response.json();
    expect(newPost.title).toBe(payload.title);
    expect(newPost.body).toBe(payload.body);
    expect(newPost.userId).toBe(payload.userId);
    expect(newPost.id).toBeDefined();
  });

  test('Deve atualizar um post existente', async ({ apiContext }) => {
    const postId = 1;
    const updateData = {
      title: 'Título Atualizado',
      body: 'Conteúdo atualizado',
      userId: 1,
      id: postId,
    };

    const response = await apiContext.put(`/posts/${postId}`, {
      data: updateData,
    });

    expect(response.status()).toBe(200);

    const updatedPost = await response.json();
    expect(updatedPost.title).toBe(updateData.title);
  });

  test('Deve deletar um post existente', async ({ apiContext }) => {
    const postId = 1;
    const response = await apiContext.delete(`/posts/${postId}`);
    
    expect(response.status()).toBe(200);
  });
});
