# Testes CRUD - JSONPlaceholder API

Este diretório contém testes completos de operações CRUD (Create, Read, Update, Delete) para a API JSONPlaceholder.

## 📚 Estrutura dos Testes

```
crud/
├── posts.test.ts       # Testes para gerenciamento de posts/artigos
├── comments.test.ts    # Testes para gerenciamento de comentários
├── users.test.ts       # Testes para gerenciamento de usuários
└── todos.test.ts       # Testes para gerenciamento de tarefas (todos)
```

## 🔗 Endpoints CRUD Disponíveis

### Posts

| Operação | Método | Endpoint | Descrição |
|----------|--------|----------|-----------|
| CREATE | POST | `/posts` | Criar novo post |
| READ | GET | `/posts` | Listar todos os posts |
| READ | GET | `/posts/{id}` | Obter post específico |
| UPDATE | PUT | `/posts/{id}` | Atualizar todo o post |
| UPDATE | PATCH | `/posts/{id}` | Atualizar parcialmente |
| DELETE | DELETE | `/posts/{id}` | Deletar post |

**Estrutura de um Post:**
```json
{
  "userId": 1,
  "id": 1,
  "title": "string",
  "body": "string"
}
```

### Comments

| Operação | Método | Endpoint | Descrição |
|----------|--------|----------|-----------|
| CREATE | POST | `/comments` | Criar novo comentário |
| READ | GET | `/comments` | Listar todos os comentários |
| READ | GET | `/comments/{id}` | Obter comentário específico |
| READ | GET | `/comments?postId={id}` | Listar comentários de um post |
| UPDATE | PUT | `/comments/{id}` | Atualizar todo o comentário |
| UPDATE | PATCH | `/comments/{id}` | Atualizar parcialmente |
| DELETE | DELETE | `/comments/{id}` | Deletar comentário |

**Estrutura de um Comentário:**
```json
{
  "postId": 1,
  "id": 1,
  "name": "string",
  "email": "string",
  "body": "string"
}
```

### Users

| Operação | Método | Endpoint | Descrição |
|----------|--------|----------|-----------|
| CREATE | POST | `/users` | Criar novo usuário |
| READ | GET | `/users` | Listar todos os usuários |
| READ | GET | `/users/{id}` | Obter usuário específico |
| UPDATE | PUT | `/users/{id}` | Atualizar todo o usuário |
| UPDATE | PATCH | `/users/{id}` | Atualizar parcialmente |
| DELETE | DELETE | `/users/{id}` | Deletar usuário |

**Estrutura de um Usuário:**
```json
{
  "id": 1,
  "name": "string",
  "username": "string",
  "email": "string",
  "address": {
    "street": "string",
    "suite": "string",
    "city": "string",
    "zipcode": "string",
    "geo": {
      "lat": "string",
      "lng": "string"
    }
  },
  "phone": "string",
  "website": "string",
  "company": {
    "name": "string",
    "catchPhrase": "string",
    "bs": "string"
  }
}
```

### Todos

| Operação | Método | Endpoint | Descrição |
|----------|--------|----------|-----------|
| CREATE | POST | `/todos` | Criar nova tarefa |
| READ | GET | `/todos` | Listar todas as tarefas |
| READ | GET | `/todos/{id}` | Obter tarefa específica |
| READ | GET | `/todos?userId={id}` | Listar tarefas de um usuário |
| READ | GET | `/todos?completed=true` | Listar tarefas completas |
| READ | GET | `/todos?completed=false` | Listar tarefas incompletas |
| UPDATE | PUT | `/todos/{id}` | Atualizar toda a tarefa |
| UPDATE | PATCH | `/todos/{id}` | Atualizar parcialmente |
| DELETE | DELETE | `/todos/{id}` | Deletar tarefa |

**Estrutura de um Todo:**
```json
{
  "userId": 1,
  "id": 1,
  "title": "string",
  "completed": false
}
```

## 🎯 Cobertura de Testes

### posts.test.ts
✅ Listar todos os posts  
✅ Obter post específico por ID  
✅ Filtrar posts por userId  
✅ Criar novo post  
✅ Atualizar post (PUT - completo)  
✅ Atualizar parcialmente (PATCH)  
✅ Deletar post  
✅ Validar erro 404  
✅ Validação de campos obrigatórios  
✅ Fluxo completo CRUD (CREATE -> READ -> UPDATE -> DELETE)  

### comments.test.ts
✅ Listar todos os comentários  
✅ Obter comentário por ID  
✅ Filtrar comentários por postId  
✅ Criar novo comentário  
✅ Atualizar comentário (PUT)  
✅ Atualizar parcialmente (PATCH)  
✅ Deletar comentário  
✅ Validar erro 404  
✅ Criar múltiplos comentários  

### users.test.ts
✅ Listar todos os usuários  
✅ Obter usuário por ID  
✅ Validar dados complex (estruturas aninhadas)  
✅ Criar novo usuário  
✅ Atualizar usuário (PUT)  
✅ Atualizar parcialmente (PATCH)  
✅ Deletar usuário  
✅ Validar erro 404  
✅ Validar formato de email  

### todos.test.ts
✅ Listar todos os todos  
✅ Obter todo por ID  
✅ Filtrar todos por usuário  
✅ Filtrar todos completados  
✅ Filtrar todos não completados  
✅ Criar novo todo  
✅ Criar todo já completo  
✅ Marcar como completo (PUT)  
✅ Atualizar apenas o status (PATCH)  
✅ Atualizar apenas o título (PATCH)  
✅ Deletar todo  
✅ Validar erro 404  
✅ Fluxo: Criar -> Marcar como Completo -> Deletar  

## 🚀 Executar Testes

```bash
# Executar todos os testes CRUD
npm test

# Executar apenas testes de Posts
npm test tests/crud/posts.test.ts

# Executar apenas testes de Comments
npm test tests/crud/comments.test.ts

# Executar apenas testes de Users
npm test tests/crud/users.test.ts

# Executar apenas testes de Todos
npm test tests/crud/todos.test.ts

# Executar com interface visual
npm run test:ui

# Executar com navegador visível
npm run test:headed
```

## 💡 Boas Práticas Utilizadas

1. **Organização por Endpoint**: Cada arquivo testa um recurso específico
2. **Fixtures Reutilizáveis**: Uso de `apiContext` compartilhado
3. **Helpers Auxiliares**: Classe `APIHelper` para operações comuns
4. **Validações Robustas**: Verificação de estrutura de dados
5. **Testes de Fluxo**: Testes que cobrem multiplicidade de operações
6. **Testes de Erro**: Validação de cenários negativos (404, etc)
7. **Filtros Diversos**: Testes com parâmetros de query diferentes

## 🔗 Mais Informações

- [JSONPlaceholder API Documentation](https://jsonplaceholder.typicode.com/)
- [Playwright API Testing Guide](https://playwright.dev/docs/api/class-apirequest)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

Happy Testing! 🎉
