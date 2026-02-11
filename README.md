# 🎭 Projeto de Testes de API com Playwright

Um projeto completo de testes automatizados para APIs REST usando [Playwright](https://playwright.dev/) e TypeScript.

## 📋 Pré-requisitos

- Node.js 16+ 
- npm ou yarn

## 🚀 Instalação

1. Clone ou abra o projeto:
```bash
cd api_tests_pwright
```

2. Instale as dependências:
```bash
npm install
```

3. Instale os navegadores do Playwright:
```bash
npx playwright install
```

4. Crie o arquivo `.env` baseado em `.env.example`:
```bash
cp .env.example .env
```

## 📁 Estrutura do Projeto

```
.
├── tests/
│   ├── api.test.ts              # Testes de exemplo inicial
│   ├── crud/                    # Testes CRUD completos
│   │   ├── posts.test.ts        # Testes CRUD para Posts
│   │   ├── comments.test.ts     # Testes CRUD para Comments
│   │   ├── users.test.ts        # Testes CRUD para Users
│   │   ├── todos.test.ts        # Testes CRUD para Todos
│   │   └── README.md            # Documentação dos testes CRUD
│   ├── fixtures/
│   │   └── api-fixture.ts       # Fixture customizado para APIs
│   └── helpers/
│       └── api-helper.ts        # Funções auxiliares para testes
├── playwright.config.ts         # Configuração do Playwright
├── tsconfig.json                # Configuração do TypeScript
├── package.json                 # Dependências e scripts
├── .env.example                 # Variáveis de ambiente (exemplo)
└── .gitignore                   # Arquivos ignorados pelo git
```

## 📝 Scripts Disponíveis

```bash
# Executar todos os testes
npm test

# Executar apenas testes CRUD
npm test tests/crud/

# Executar apenas Posts CRUD
npm test tests/crud/posts.test.ts

# Executar com navegador visível
npm run test:headed

# Executar testes em modo debug
npm run test:debug

# Executar testes com UI interativa
npm run test:ui

# Visualizar relatório dos testes
npm run test:report

# Gerar código de testes automaticamente (Codegen)
npm run codegen
```

## ✍️ Criando Novos Testes

### Testes CRUD Completos

O projeto inclui testes CRUD completos para múltiplos recursos:

**Posts** (`tests/crud/posts.test.ts`)
- ✅ Listar todos os posts
- ✅ Obter post por ID
- ✅ Filtrar posts por userId
- ✅ Criar novo post
- ✅ Atualizar post (PUT)
- ✅ Atualizar parcialmente (PATCH)
- ✅ Deletar post
- ✅ Fluxo completo CRUD

**Comments** (`tests/crud/comments.test.ts`)
- ✅ Listar comentários
- ✅ Obter comentário por ID
- ✅ Filtrar por postId
- ✅ Criar comentário
- ✅ Atualizar (PUT/PATCH)
- ✅ Deletar
- ✅ Múltiplos comentários

**Users** (`tests/crud/users.test.ts`)
- ✅ Listar usuários
- ✅ Obter usuário por ID
- ✅ Validar estruturas complexas
- ✅ Criar usuário
- ✅ Atualizar (PUT/PATCH)
- ✅ Deletar
- ✅ Validação de emails

**Todos** (`tests/crud/todos.test.ts`)
- ✅ Listar tarefas
- ✅ Obter tarefa por ID
- ✅ Filtrar por userId/status
- ✅ Criar tarefa
- ✅ Atualizar (PUT/PATCH)
- ✅ Marcar como completa
- ✅ Deletar
- ✅ Fluxos completos

Para mais detalhes, veja [tests/crud/README.md](tests/crud/README.md)

### Exemplo Básico

```typescript
import { test, expect } from '../fixtures/api-fixture';

test.describe('Minha Suite de Testes', () => {
  test('Deve fazer uma requisição GET', async ({ apiContext }) => {
    const response = await apiContext.get('/endpoint');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('id');
  });
});
```

### Usando o APIHelper

```typescript
import { test, expect } from '../fixtures/api-fixture';
import { APIHelper } from '../helpers/api-helper';

test('Teste com helper', async ({ apiContext }) => {
  const api = new APIHelper(apiContext);
  
  const response = await api.get('/posts/1');
  await api.assertStatus(response, 200);
  await api.assertContentType(response, 'json');
});
```

## 🔧 Configuração

### Variáveis de Ambiente (.env)

- `BASE_URL` - URL base da API (padrão: https://jsonplaceholder.typicode.com)
- `NODE_ENV` - Ambiente (test, dev, prod)
- `REQUEST_TIMEOUT` - Timeout das requisições em ms

### Modificar Configuração do Playwright

Edite `playwright.config.ts` para:

- Adicionar/remover navegadores (chromium, firefox, webkit)
- Modificar timeouts
- Adicionar headers customizados
- Configurar relatórios

## 📊 Relatórios

Após executar os testes, um relatório HTML é gerado. Para visualizá-lo:

```bash
npm run test:report
```

## 🎓 Recursos Úteis

- [Documentação do Playwright](https://playwright.dev/)
- [API Testing Guide](https://playwright.dev/docs/api/class-apirequest)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [**QUICK_START.md**](QUICK_START.md) - Guia rápido com exemplos
- [**PLAYWRIGHT_CONFIG.md**](PLAYWRIGHT_CONFIG.md) - Configurações do Playwright
- [**tests/crud/README.md**](tests/crud/README.md) - Documentação dos testes CRUD
- [**tests/exemplo-padroes.test.ts**](tests/exemplo-padroes.test.ts) - Exemplos de padrões de teste

## 💡 Dicas

1. Use `npm run test:ui` para visualizar testes interativamente
2. Use `npm run codegen` para gerar código de testes automaticamente
3. Organize seus testes por funcionalidade em arquivos separados
4. Use fixtures para compartilhar setup entre múltiplos testes
5. Aproveite variáveis de ambiente para diferentes ambientes

## 📝 Exemplo com JSONPlaceholder

O projeto vem configurado para usar [JSONPlaceholder](https://jsonplaceholder.typicode.com/) como API de exemplo. Este é um servidor REST fake e gratuito para testar e fazer prototipagem.

## 🐛 Troubleshooting

### Erro: "Module not found"
```bash
npm install
```

### Erro: "Cannot find browsers"
```bash
npx playwright install
```

### Erro de timeout
Aumente o valor em `playwright.config.ts`:
```typescript
timeout: 30000, // 30 segundos
```

## 📞 Suporte

Para mais informações, consulte a documentação oficial do Playwright em https://playwright.dev/

---

**Bom teste! 🚀**
