import { test, expect } from '../fixtures/api-fixture';
import { APIHelper } from '../helpers/api-helper';

test.describe('CRUD - Comments', () => {
  let api: APIHelper;

  test.beforeEach(async ({ apiContext }) => {
    api = new APIHelper(apiContext);
  });

  test('READ - Listar todos os comentários', async () => {
    const response = await api.get('/comments');
    await api.assertStatus(response, 200);

    const comments = await response.json();
    expect(Array.isArray(comments)).toBe(true);
    expect(comments.length).toBeGreaterThan(0);
    
    // Validar estrutura do primeiro comentário
    expect(comments[0]).toHaveProperty('postId');
    expect(comments[0]).toHaveProperty('id');
    expect(comments[0]).toHaveProperty('name');
    expect(comments[0]).toHaveProperty('email');
    expect(comments[0]).toHaveProperty('body');
  });

  test('READ - Obter comentário por ID', async () => {
    const commentId = 1;
    const response = await api.get(`/comments/${commentId}`);
    await api.assertStatus(response, 200);

    const comment = await response.json();
    expect(comment.id).toBe(commentId);
    expect(comment.postId).toBeDefined();
    expect(typeof comment.name).toBe('string');
    expect(typeof comment.email).toBe('string');
    expect(typeof comment.body).toBe('string');
  });

  test('READ - Filtrar comentários por postId', async () => {
    const postId = 1;
    const response = await api.get(`/comments?postId=${postId}`);
    await api.assertStatus(response, 200);

    const comments = await response.json();
    expect(Array.isArray(comments)).toBe(true);
    
    if (comments.length > 0) {
      comments.forEach((comment: any) => {
        expect(comment.postId).toBe(postId);
      });
    }
  });

  test('CREATE - Criar novo comentário', async () => {
    const newComment = {
      postId: 1,
      name: 'Comentário Automatizado',
      email: 'teste@exemplo.com',
      body: 'Este é um comentário criado através de testes automatizados',
    };

    const response = await api.post('/comments', newComment);
    await api.assertStatus(response, 201);

    const createdComment = await response.json();
    expect(createdComment.postId).toBe(newComment.postId);
    expect(createdComment.name).toBe(newComment.name);
    expect(createdComment.email).toBe(newComment.email);
    expect(createdComment.body).toBe(newComment.body);
    expect(createdComment.id).toBeDefined();
  });

  test('UPDATE - Atualizar comentário (PUT)', async () => {
    const commentId = 1;
    const updatedData = {
      postId: 1,
      id: commentId,
      name: 'Comentário Atualizado',
      email: 'atualizado@exemplo.com',
      body: 'Conteúdo do comentário completamente atualizado',
    };

    const response = await api.put(`/comments/${commentId}`, updatedData);
    await api.assertStatus(response, 200);

    const comment = await response.json();
    expect(comment.name).toBe(updatedData.name);
    expect(comment.email).toBe(updatedData.email);
  });

  test('UPDATE - Atualizar parcialmente comentário (PATCH)', async () => {
    const commentId = 1;
    const partialUpdate = {
      name: 'Nome do Comentário Atualizado via PATCH',
    };

    const response = await api.patch(`/comments/${commentId}`, partialUpdate);
    await api.assertStatus(response, 200);

    const comment = await response.json();
    expect(comment.name).toBe(partialUpdate.name);
  });

  test('DELETE - Deletar comentário', async () => {
    const commentId = 1;
    const response = await api.delete(`/comments/${commentId}`);
    await api.assertStatus(response, 200);
  });

  test('READ - Validar 404 para comentário inexistente', async () => {
    const response = await api.get('/comments/999999');
    expect(response.status()).toBe(404);
  });

  test('CREATE - Criar múltiplos comentários', async () => {
    const comments = [
      {
        postId: 1,
        name: 'Primeiro Comentário',
        email: 'primeiro@teste.com',
        body: 'Conteúdo do primeiro comentário',
      },
      {
        postId: 1,
        name: 'Segundo Comentário',
        email: 'segundo@teste.com',
        body: 'Conteúdo do segundo comentário',
      },
      {
        postId: 2,
        name: 'Terceiro Comentário',
        email: 'terceiro@teste.com',
        body: 'Conteúdo do terceiro comentário',
      },
    ];

    for (const comment of comments) {
      const response = await api.post('/comments', comment);
      const created = await response.json();
      expect(created.postId).toBe(comment.postId);
      expect(created.name).toBe(comment.name);
    }
  });
});
