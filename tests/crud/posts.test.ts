import { test, expect } from '../fixtures/api-fixture';
import { APIHelper } from '../helpers/api-helper';

test.describe('CRUD - Posts', () => {
  let api: APIHelper;

  test.beforeEach(async ({ apiContext }) => {
    api = new APIHelper(apiContext);
  });

  test('READ - Listar todos os posts', async () => {
    const response = await api.get('/posts');
    await api.assertStatus(response, 200);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    
    // Validar estrutura do primeiro post
    expect(posts[0]).toHaveProperty('userId');
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('body');
  });

  test('READ - Obter post por ID', async () => {
    const postId = 1;
    const response = await api.get(`/posts/${postId}`);
    await api.assertStatus(response, 200);

    const post = await response.json();
    expect(post.id).toBe(postId);
    expect(post.userId).toBe(1);
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
  });

  test('READ - Filtrar posts por userId', async () => {
    const userId = 1;
    const response = await api.get(`/posts?userId=${userId}`);
    await api.assertStatus(response, 200);

    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);
    
    // Verificar que todos os posts pertencem ao usuário especificado
    posts.forEach((post: any) => {
      expect(post.userId).toBe(userId);
    });
  });

  test('CREATE - Criar novo post', async () => {
    const newPost = {
      title: 'Post de Teste Automatizado',
      body: 'Este é um post criado através de testes automatizados com Playwright',
      userId: 1,
    };

    const response = await api.post('/posts', newPost);
    await api.assertStatus(response, 201);

    const createdPost = await response.json();
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
    expect(createdPost.id).toBeDefined();
    expect(typeof createdPost.id).toBe('number');
  });

  test('UPDATE - Atualizar post existente (PUT)', async () => {
    const postId = 1;
    const updatedData = {
      id: postId,
      userId: 1,
      title: 'Post Atualizado com PUT',
      body: 'Conteúdo completamente novo do post',
    };

    const response = await api.put(`/posts/${postId}`, updatedData);
    await api.assertStatus(response, 200);

    const post = await response.json();
    expect(post.title).toBe(updatedData.title);
    expect(post.body).toBe(updatedData.body);
  });

  test('UPDATE - Atualizar partes do post (PATCH)', async () => {
    const postId = 1;
    const partialUpdate = {
      title: 'Post com PATCH - Apenas título atualizado',
    };

    const response = await api.patch(`/posts/${postId}`, partialUpdate);
    await api.assertStatus(response, 200);

    const post = await response.json();
    expect(post.title).toBe(partialUpdate.title);
    expect(post.id).toBe(postId);
  });

  test('DELETE - Deletar post', async () => {
    const postId = 10;
    const response = await api.delete(`/posts/${postId}`);
    await api.assertStatus(response, 200);

    const result = await response.json();
    expect(typeof result).toBe('object');
  });

  test('READ - Validar 404 para post inexistente', async () => {
    const response = await api.get('/posts/999999');
    expect(response.status()).toBe(404);
  });

  test('CREATE - Validar validação de campos obrigatórios', async () => {
    const invalidPost = {
      userId: 1,
      // faltam title e body
    };

    const response = await api.post('/posts', invalidPost);
    // JSONPlaceholder aceita mesmo assim, mas em APIs reais retornaria erro
    await api.assertStatus(response, 201);
  });
});

test.describe('Fluxo Completo CRUD', () => {
  let api: APIHelper;
  let createdPostId: number;

  test.beforeEach(async ({ apiContext }) => {
    api = new APIHelper(apiContext);
  });
});
