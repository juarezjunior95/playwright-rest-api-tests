# Guia Rápido - Testes de API REST com Playwright

## 🚀 Começando Rápido

### 1. Instalação
```bash
npm install
npx playwright install
```

### 2. Configurar .env
```bash
cp .env.example .env
```

### 3. Executar Testes
```bash
npm test                          # Todos os testes
npm test tests/crud/posts.test.ts # Apenas Posts
npm run test:ui                   # Interface visual
npm run test:headed               # Com navegador visível
```

## 📚 Estrutura de um Teste

```typescript
import { test, expect } from '../fixtures/api-fixture';
import { APIHelper } from '../helpers/api-helper';

test.describe('Minha Suite de Testes', () => {
  let api: APIHelper;

  test.beforeEach(async ({ apiContext }) => {
    api = new APIHelper(apiContext);
  });

  test('Deve recuperar dados com sucesso', async () => {
    const response = await api.get('/posts/1');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
  });
});
```

## 🔧 Métodos Principais do APIHelper

```typescript
// GET
const response = await api.get('/posts');
const data = await api.getJSON('/posts');

// POST
const response = await api.post('/posts', { title: 'Novo', body: 'Conteúdo' });

// PUT (atualizar completo)
const response = await api.put('/posts/1', { id: 1, title: 'Novo', body: 'Novo' });

// PATCH (atualizar parcial)
const response = await api.patch('/posts/1', { title: 'Atualizado' });

// DELETE
const response = await api.delete('/posts/1');

// Validações auxiliares
await api.assertStatus(response, 200);
await api.assertContentType(response, 'json');
```

## ✅ Checklist de Boas Práticas

- [ ] Cada teste testa apenas uma coisa
- [ ] Testes são independentes uns dos outros
- [ ] Descrições são claras e em português/inglês
- [ ] Use `test.describe()` para agrupar testes relacionados
- [ ] Use `beforeEach()` e `afterEach()` para setup/cleanup
- [ ] Valide status HTTP, estrutura de dados e tipos
- [ ] Não deixe dados de teste na API (limpar com DELETE)
- [ ] Use variáveis de ambiente para configurações sensíveis
- [ ] Testes devem ser rápidos (timeout adequado)
- [ ] Use fixtures customizadas para código reutilizável

## 📊 Validações Comuns

```typescript
// Status
expect(response.status()).toBe(200);

// Estrutura de dados
expect(data).toHaveProperty('id');

// Tipo de dados
expect(typeof data.name).toBe('string');
expect(Array.isArray(data.items)).toBe(true);

// Conteúdo
expect(data.name).toContain('João');
expect(data.email).toMatch(/.*@.*\.com/);

// Tamanho
expect(data.items.length).toBeGreaterThan(0);
expect(data.name).toHaveLength(10);

// Valores nulos/indefinidos
expect(data.id).toBeDefined();
expect(data.deleted).toBeNull();
```

## 🎯 Padrões de Teste

### Teste de Criação
```typescript
test('Deve criar novo post', async () => {
  const payload = { title: 'Novo', body: 'Conteúdo', userId: 1 };
  const response = await api.post('/posts', payload);
  
  expect(response.status()).toBe(201);
  const created = await response.json();
  expect(created).toMatchObject(payload);
  expect(created.id).toBeDefined();
});
```

### Teste de Leitura
```typescript
test('Deve recuperar post por ID', async () => {
  const response = await api.get('/posts/1');
  
  expect(response.status()).toBe(200);
  const post = await response.json();
  expect(post.id).toBe(1);
  expect(post).toHaveProperty('title');
});
```

### Teste de Atualização
```typescript
test('Deve atualizar post', async () => {
  const updated = { id: 1, title: 'Novo', body: 'Novo', userId: 1 };
  const response = await api.put('/posts/1', updated);
  
  expect(response.status()).toBe(200);
  const result = await response.json();
  expect(result.title).toBe(updated.title);
});
```

### Teste de Deleção
```typescript
test('Deve deletar post', async () => {
  const response = await api.delete('/posts/1');
  
  expect(response.status()).toBe(200);
  
  // Verificar que foi realmente deletado
  const getResponse = await api.get('/posts/1');
  expect(getResponse.status()).toBe(404);
});
```

### Teste de Fluxo Completo
```typescript
test('Fluxo CRUD completo', async () => {
  // CREATE
  let response = await api.post('/posts', { title: 'T', body: 'B', userId: 1 });
  const id = (await response.json()).id;

  // READ
  response = await api.get(`/posts/${id}`);
  expect(response.status()).toBe(200);

  // UPDATE
  response = await api.put(`/posts/${id}`, { id, title: 'T2', body: 'B2', userId: 1 });
  expect(response.status()).toBe(200);

  // DELETE
  response = await api.delete(`/posts/${id}`);
  expect(response.status()).toBe(200);
});
```

## 🔗 Endpoints Disponíveis (JSONPlaceholder)

| Recurso | GET | POST | PUT | PATCH | DELETE |
|---------|-----|------|-----|-------|--------|
| /posts | ✅ | ✅ | ✅ | ✅ | ✅ |
| /comments | ✅ | ✅ | ✅ | ✅ | ✅ |
| /users | ✅ | ✅ | ✅ | ✅ | ✅ |
| /todos | ✅ | ✅ | ✅ | ✅ | ✅ |
| /photos | ✅ | ✅ | ✅ | ✅ | ✅ |
| /albums | ✅ | ✅ | ✅ | ✅ | ✅ |

## 💾 Estrutura de Dados - JSONPlaceholder

### Post
```json
{ "userId": 1, "id": 1, "title": "string", "body": "string" }
```

### Comment
```json
{ "postId": 1, "id": 1, "name": "string", "email": "email", "body": "string" }
```

### User
```json
{
  "id": 1, "name": "string", "username": "string", "email": "email",
  "address": { "street": "s", "suite": "s", "city": "c", "zipcode": "z", "geo": { "lat": "l", "lng": "l" } },
  "phone": "string", "website": "string",
  "company": { "name": "string", "catchPhrase": "string", "bs": "string" }
}
```

### Todo
```json
{ "userId": 1, "id": 1, "title": "string", "completed": false }
```

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| "Cannot find module '@playwright/test'" | `npm install` |
| "Module not found: playwright" | `npx playwright install` |
| Timeout nos testes | Aumentar timeout em `playwright.config.ts` |
| Testes muitos lentos | Executar com `--workers=1` ou verificar conexão de rede |
| Relatório não gerado | Executar `npm run test:report` |
| .env não carregado | Verificar apostila `.env` (não `.env.example`) |

## 📖 Recursos Úteis

- [Playwright Docs](https://playwright.dev/)
- [API Testing Guide](https://playwright.dev/docs/api/class-apirequest)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Test Assertions](https://playwright.dev/docs/test-assertions)

## 🎓 Próximos Passos

1. ✅ Criar testes CRUD básicos (veja `tests/crud/`)
2. 📝 Adicionar validações de schema/estrutura
3. 🔐 Implementar autenticação em requests
4. 📊 Adicionar relatórios customizados
5. 🔄 Configurar CI/CD (GitHub Actions, GitLab CI, etc)
6. 📈 Adicionar testes de performance
7. 🔗 Testar integrações entre endpoints

---

**Divertido testando! 🚀**
