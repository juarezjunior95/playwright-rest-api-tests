# Configuração do Playwright - playwright.config.ts

## Visão Geral

O arquivo `playwright.config.ts` contém todas as configurações para executar testes com Playwright. 

## Configurações Atuais do Projeto

```typescript
{
  testDir: './tests',           // Diretório onde os testes estão
  fullyParallel: true,          // Executar testes em paralelo
  forbidOnly: !!process.env.CI, // Proibir .only em CI
  retries: 2,                   // Tentar novamente 2 vezes se falhar (CI)
  workers: 1,                   // Número de workers (CI)
  reporter: 'html',            // Gerar relatório HTML
  baseURL: 'https://jsonplaceholder.typicode.com'  // URL base da API
}
```

## Modificações Comuns

### Aumentar Timeout

```typescript
use: {
  timeout: 30000, // 30 segundos ao invés de 10
}
```

### Adicionar Headers Customizados

```typescript
use: {
  extraHTTPHeaders: {
    'Authorization': 'Bearer seu_token_aqui',
    'X-Custom-Header': 'valor',
  }
}
```

### Dessabilitar Retries Automáticas

```typescript
retries: 0, // Não tentar novamente
```

### Adicionar Novo Navegador

```typescript
projects: [
  // ... existing projects
  {
    name: 'mobile',
    use: { ...devices['Pixel 5'] },
  },
]
```

### Usar Proxy

```typescript
use: {
  proxy: 'http://127.0.0.1:3128',
}
```

### Configurar Reporter Customizado

```typescript
reporter: [
  ['html', { outputFolder: 'my-report' }],
  ['json', { outputFile: 'test-results.json' }],
  ['junit', { outputFile: 'junit.xml' }],
],
```

### Adicionar Setup/Teardown Global

```typescript
webServer: {
  command: 'npm run start-server',
  url: 'http://localhost:3000',
  timeout: 120000,
},
```

## Variáveis de Ambiente

Use variáveis de ambiente do seu `.env`:

```typescript
use: {
  baseURL: process.env.BASE_URL || 'https://default.api.com',
  timeout: parseInt(process.env.REQUEST_TIMEOUT || '10000'),
},
```

## Filtrar Testes

```bash
# Executar apenas testes que contêm "CRUD"
npm test -- --grep "CRUD"

# Executar apenas um arquivo de teste
npm test tests/crud/posts.test.ts

# Executar apenas testes com tag
npm test -- --grep "@critical"
```

## Configurações para CI/CD

Para ambientes de CI/CD, ajuste:

```typescript
{
  forbidOnly: true,           // Falhar se houver .only
  retries: 2,                 // Retry automático
  workers: 1,                 // Executar um por vez
  reporter: 'github',         // Relatório no GitHub
}
```

## Debugging

### Modo Debug

```bash
npm run test:debug
```

### Modo Headed (Com Navegador Visual)

```bash
npm run test:headed
```

### Gerar Código de Teste (Codegen)

```bash
npm run codegen https://sua-api.com
```

### Trace (Gravação de Execução)

```typescript
use: {
  trace: 'on-first-retry', // Gravar apenas quando há retry
  // ou
  trace: 'on', // Sempre gravar
}
```

## Estrutura Completa de Configuração Avançada

```typescript
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  // Diretório de testes
  testDir: './tests',

  // Padrão de arquivos de teste
  testMatch: '**/*.test.ts',

  // Padrão de exclusão
  testIgnore: '**/*example*.ts',

  // Timeout global (ms)
  timeout: 10000,

  // Timeout de expect (ms)
  expect: {
    timeout: 5000,
  },

  // Paralelização
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,

  // Retries
  retries: process.env.CI ? 2 : 0,

  // Falhar se houver testes com .only
  forbidOnly: !!process.env.CI,

  // Reportes
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  // Configurações de uso (aplicadas a todos os navegadores)
  use: {
    baseURL: process.env.BASE_URL || 'https://jsonplaceholder.typicode.com',
    timeout: parseInt(process.env.REQUEST_TIMEOUT || '10000'),
    
    // Headers
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },

    // Trace
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',
  },

  // Projetos (diferentes navegadores/configurações)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Setup e teardown global
  globalSetup: require.resolve('./tests/global-setup.ts'),
  globalTeardown: require.resolve('./tests/global-teardown.ts'),
});
```

## Variáveis de Ambiente Úteis

```bash
CI=true              # Define como ambiente de CI
DEBUG=pw:api         # Debug do Playwright API
DEBUG=pw:api,pw:net  # Debug de múltiplas áreas
PWDEBUG=1            # Ativa modo debug completo
```

## Referências

- [Playwright Configuration](https://playwright.dev/docs/test-configuration)
- [Reporters](https://playwright.dev/docs/test-reporters)
- [Devices](https://playwright.dev/docs/emulation)

---

**Dica**: Sempre execute localmente antes de fazer push para evitar surpresas no CI/CD!
