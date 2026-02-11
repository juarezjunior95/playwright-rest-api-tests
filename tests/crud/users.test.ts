import { test, expect } from '../fixtures/api-fixture';
import { APIHelper } from '../helpers/api-helper';

test.describe('CRUD - Users', () => {
  let api: APIHelper;

  test.beforeEach(async ({ apiContext }) => {
    api = new APIHelper(apiContext);
  });

  test('READ - Listar todos os usuários', async () => {
    const response = await api.get('/users');
    await api.assertStatus(response, 200);

    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    
    // Validar estrutura do primeiro usuário
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('username');
    expect(users[0]).toHaveProperty('email');
    expect(users[0]).toHaveProperty('address');
    expect(users[0]).toHaveProperty('phone');
    expect(users[0]).toHaveProperty('website');
    expect(users[0]).toHaveProperty('company');
  });

  test('READ - Obter usuário por ID', async () => {
    const userId = 1;
    const response = await api.get(`/users/${userId}`);
    await api.assertStatus(response, 200);

    const user = await response.json();
    expect(user.id).toBe(userId);
    expect(typeof user.name).toBe('string');
    expect(typeof user.username).toBe('string');
    expect(typeof user.email).toBe('string');
  });

  test('READ - Validar dados do usuário', async () => {
    const response = await api.get('/users/1');
    const user = await response.json();

    // Validar estrutura aninhada
    expect(user.address).toHaveProperty('street');
    expect(user.address).toHaveProperty('suite');
    expect(user.address).toHaveProperty('city');
    expect(user.address).toHaveProperty('zipcode');
    expect(user.address).toHaveProperty('geo');
    
    expect(user.company).toHaveProperty('name');
    expect(user.company).toHaveProperty('catchPhrase');
    expect(user.company).toHaveProperty('bs');
  });

  test('CREATE - Criar novo usuário', async () => {
    const newUser = {
      name: 'Usuário Teste Automatizado',
      username: 'usuario.teste',
      email: 'usuario.teste@exemplo.com',
      address: {
        street: 'Rua Teste, 123',
        suite: 'Apt. 1',
        city: 'São Paulo',
        zipcode: '01234-567',
        geo: {
          lat: '-23.5505',
          lng: '-46.6333',
        },
      },
      phone: '(11) 99999-8888',
      website: 'https://usuario-teste.com.br',
      company: {
        name: 'Empresa Teste',
        catchPhrase: 'Catchphrase de teste',
        bs: 'business suite de teste',
      },
    };

    const response = await api.post('/users', newUser);
    await api.assertStatus(response, 201);

    const createdUser = await response.json();
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.username).toBe(newUser.username);
    expect(createdUser.email).toBe(newUser.email);
    expect(createdUser.phone).toBe(newUser.phone);
    expect(createdUser.website).toBe(newUser.website);
    expect(createdUser.id).toBeDefined();
  });

  test('UPDATE - Atualizar usuário (PUT)', async () => {
    const userId = 1;
    const updatedUser = {
      id: userId,
      name: 'Usuário Atualizado',
      username: 'usuario.atualizado',
      email: 'usuario.atualizado@exemplo.com',
      address: {
        street: 'Rua Atualizada, 456',
        suite: 'Apt. 2',
        city: 'Rio de Janeiro',
        zipcode: '20000-000',
        geo: {
          lat: '-22.9068',
          lng: '-43.1729',
        },
      },
      phone: '(21) 98888-7777',
      website: 'https://usuario-atualizado.com.br',
      company: {
        name: 'Empresa Atualizada',
        catchPhrase: 'Nova catchphrase',
        bs: 'novo business suite',
      },
    };

    const response = await api.put(`/users/${userId}`, updatedUser);
    await api.assertStatus(response, 200);

    const user = await response.json();
    expect(user.name).toBe(updatedUser.name);
    expect(user.email).toBe(updatedUser.email);
    expect(user.address.city).toBe(updatedUser.address.city);
  });

  test('UPDATE - Atualizar parcialmente usuário (PATCH)', async () => {
    const userId = 1;
    const partialUpdate = {
      email: 'novo.email@exemplo.com',
      phone: '(11) 91234-5678',
    };

    const response = await api.patch(`/users/${userId}`, partialUpdate);
    await api.assertStatus(response, 200);

    const user = await response.json();
    expect(user.email).toBe(partialUpdate.email);
    expect(user.phone).toBe(partialUpdate.phone);
  });

  test('DELETE - Deletar usuário', async () => {
    const userId = 10;
    const response = await api.delete(`/users/${userId}`);
    await api.assertStatus(response, 200);
  });

  test('READ - Validar 404 para usuário inexistente', async () => {
    const response = await api.get('/users/999999');
    expect(response.status()).toBe(404);
  });

  test('READ - Validar format de email de todos os usuários', async () => {
    const response = await api.get('/users');
    const users = await response.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    users.forEach((user: any) => {
      expect(user.email).toMatch(emailRegex);
    });
  });
});
