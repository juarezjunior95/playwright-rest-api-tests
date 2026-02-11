import { test, expect } from './fixtures/api-fixture';
import { APIHelper } from './helpers/api-helper';

/**
 * GUIA DE CRIAÇÃO DE NOVOS TESTES
 * 
 * Este arquivo contém exemplos e padrões para criar novos testes
 * para APIs REST usando Playwright e Typescript
 */

test.describe('Exemplo - Padrão de Teste CRUD', () => {
  let api: APIHelper;

  /**
   * beforeEach é executado antes de cada teste
   * Ideal para setup comum
   */
  test.beforeEach(async ({ apiContext }) => {
    api = new APIHelper(apiContext);
    console.log('Setup antes do teste');
  });

  /**
   * afterEach é executado após cada teste
   * Ideal para cleanup e limpeza de dados criados
   */
  test.afterEach(async () => {
    console.log('Cleanup após o teste');
  });

  // ============================================
  // PADRÃO 1: Teste simples GET
  // ============================================
  test('Padrão 1: Teste simples GET', async () => {
    const response = await api.get('/posts/1');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
  });

  // ============================================
  // PADRÃO 2: Teste POST com validação
  // ============================================
  test('Padrão 2: Teste POST com validação', async () => {
    const payload = {
      title: 'Novo Post',
      body: 'Conteúdo do post',
      userId: 1,
    };

    const response = await api.post('/posts', payload);
    
    expect(response.status()).toBe(201);
    
    const created = await response.json();
    expect(created).toMatchObject(payload);
    expect(created.id).toBeDefined();
  });

  // ============================================
  // PADRÃO 3: Teste com múltiplas validações
  // ============================================
  test('Padrão 3: Teste com múltiplas validações', async () => {
    const response = await api.get('/users/1');
    
    // Validar status
    expect(response.status()).toBe(200);
    
    // Validar headers
    await api.assertContentType(response, 'json');
    
    // Validar estrutura
    const user = await response.json();
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('address');
    
    // Validar propriedades aninhadas
    expect(user.address).toHaveProperty('street');
    expect(user.address).toHaveProperty('city');
  });

  // ============================================
  // PADRÃO 4: Teste com cenários alternativos
  // ============================================
  test('Padrão 4: Teste com múltiplos cenários', async () => {
    // Cenário 1: GET bem-sucedido
    let response = await api.get('/posts');
    expect(response.status()).toBe(200);
    
    // Cenário 2: POST bem-sucedido
    response = await api.post('/posts', {
      title: 'Test',
      body: 'Test',
      userId: 1,
    });
    expect(response.status()).toBe(201);
    
    // Cenário 3: Erro 404
    response = await api.get('/posts/999999');
    expect(response.status()).toBe(404);
  });

  // ============================================
  // PADRÃO 5: Teste com dados dinâmicos
  // ============================================
  test('Padrão 5: Teste com dados dinâmicos', async () => {
    const timestamp = new Date().getTime();
    const payload = {
      title: `Post criado em ${timestamp}`,
      body: `Conteúdo gerado dinamicamente - ${timestamp}`,
      userId: 1,
    };

    const response = await api.post('/posts', payload);
    const created = await response.json();
    
    expect(created.title).toContain(timestamp.toString());
  });

  // ============================================
  // PADRÃO 6: Teste com loop de dados
  // ============================================
  test('Padrão 6: Teste com múltiplas iterações', async () => {
    const userIds = [1, 2, 3];
    
    for (const userId of userIds) {
      const response = await api.get(`/users/${userId}`);
      expect(response.status()).toBe(200);
      
      const user = await response.json();
      expect(user.id).toBe(userId);
    }
  });

  // ============================================
  // PADRÃO 7: Teste com asserções customizadas
  // ============================================
  test('Padrão 7: Test com asserções customizadas', async () => {
    const response = await api.get('/posts?userId=1');
    const posts = await response.json();
    
    // Asserção customizada 1: Validar tamanho
    expect(posts.length).toBeGreaterThan(0);
    
    // Asserção customizada 2: Validar conteúdo
    const post = posts[0];
    const hasValidStructure = 
      post.id && post.userId && post.title && post.body;
    expect(hasValidStructure).toBe(true);
    
    // Asserção customizada 3: Validar tipo
    expect(typeof post.id).toBe('number');
    expect(typeof post.title).toBe('string');
  });

  // ============================================
  // PADRÃO 8: Teste com try-catch para erros
  // ============================================
  test('Padrão 8: Tratamento de erros', async () => {
    try {
      const response = await api.get('/invalid-endpoint');
      
      if (response.status() === 404) {
        expect(response.status()).toBe(404);
      } else {
        throw new Error('Status inesperado');
      }
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

test.describe('Boas Práticas', () => {
  /**
   * ✅ FAÇA ISSO:
   * - Use descritore descritivos para tests
   * - Organize testes em test.describe()
   * - Use beforeEach/afterEach para setup/cleanup
   * - Valide não apenas status, mas dados completos
   * - Use fixtures reutilizáveis
   * - Mantenha testes independentes
   */

  /**
   * ❌ NÃO FAÇA ISSO:
   * - Não crie dependências entre testes
   * - Não ignore erros/exceções
   * - Não deixe testes sem asserções
   * - Não use timeouts muito curtos
   * - Não misture testes de diferentes recursos
   * - Não deixe dados de teste na API
   */

  test('Boas práticas: Testes independentes', async ({ apiContext }) => {
    const api = new APIHelper(apiContext);
    
    // Cada teste deve funcionar independentemente
    const response = await api.get('/posts/1');
    expect(response.status()).toBe(200);
  });

  test('Boas práticas: Validações completas', async ({ apiContext }) => {
    const api = new APIHelper(apiContext);
    
    const response = await api.post('/posts', {
      title: 'Nova postagem',
      body: 'Conteúdo',
      userId: 1,
    });
    
    // Validar não apenas se criou, mas se os dados estão corretos
    expect(response.status()).toBe(201);
    
    const post = await response.json();
    expect(post).toHaveProperty('id');
    expect(post.title).toBe('Nova postagem');
    expect(post.userId).toBe(1);
  });

  test('Boas práticas: Descrições claras', async ({ apiContext }) => {
    const api = new APIHelper(apiContext);
    
    // Este teste verifica se:
    // 1. A API retorna status 200
    // 2. A resposta é um array
    // 3. Cada item tem as propriedades esperadas
    
    const response = await api.get('/posts');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('userId');
    expect(data[0]).toHaveProperty('id');
  });
});

// ============================================
// RECURSOS ÚTEIS
// ============================================

/**
 * ASSERTIONS (Asserções comuns)
 * 
 * expect(value).toBe(expected)             // Verificação exata
 * expect(value).toEqual(expected)          // Comparação profunda
 * expect(value).toHaveProperty(prop)       // Verifica propriedade
 * expect(value).toBeGreaterThan(num)       // Maior que
 * expect(value).toBeGreaterThanOrEqual(n)  // Maior ou igual
 * expect(value).toBeLessThan(num)          // Menor que
 * expect(value).toContain(item)            // Contém
 * expect(value).toMatch(regex)             // Match regex
 * expect(value).toHaveLength(n)            // Tamanho/comprimento
 * expect(value).toBeDefined()              // Definido
 * expect(value).toBeUndefined()            // Indefinido
 * expect(value).toBeNull()                 // Nulo
 * expect(value).toBeFalsy()                // Falsy
 * expect(value).toBeTruthy()               // Truthy
 */

/**
 * ESTRUTURA BÁSICA DE UM TESTE
 * 
 * test('Descrição clara do que está testando', async ({ apiContext }) => {
 *   // 1. Setup: Preparar dados/estado
 *   const api = new APIHelper(apiContext);
 *   
 *   // 2. Execução: Executar a ação
 *   const response = await api.get('/endpoint');
 *   
 *   // 3. Verificação: Validar resultados
 *   expect(response.status()).toBe(200);
 *   
 *   // 4. Asserções: Verificar dados
 *   const data = await response.json();
 *   expect(data).toBeDefined();
 * });
 */
