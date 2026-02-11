import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * APIHelper - Classe auxiliar para testes de API REST
 * 
 * Fornece métodos convenientes para fazer requisições HTTP
 * e validações comuns em testes de API.
 * 
 * Uso:
 * const api = new APIHelper(apiContext);
 * const response = await api.get('/posts');
 */
export class APIHelper {
  constructor(private apiContext: APIRequestContext) {}

  /**
   * Faz uma requisição GET
   * @param endpoint - Caminho da API (ex: '/posts')
   * @param options - Opções adicionais (headers, params, etc)
   * @returns Response do Playwright
   * 
   * Exemplo:
   * const response = await api.get('/posts/1');
   */
  async get(endpoint: string, options?: any): Promise<APIResponse> {
    return this.apiContext.get(endpoint, options);
  }

  /**
   * Faz uma requisição POST
   * @param endpoint - Caminho da API
   * @param payload - Dados a enviar no corpo da requisição
   * @param options - Opções adicionais
   * @returns Response do Playwright
   * 
   * Exemplo:
   * const response = await api.post('/posts', { title: 'Novo', body: 'Teste' });
   */
  async post(endpoint: string, payload: any, options?: any): Promise<APIResponse> {
    return this.apiContext.post(endpoint, {
      data: payload,
      ...options,
    });
  }

  /**
   * Faz uma requisição PUT (atualiza recurso completo)
   * @param endpoint - Caminho da API
   * @param payload - Dados completos do recurso
   * @param options - Opções adicionais
   * @returns Response do Playwright
   * 
   * Exemplo:
   * const response = await api.put('/posts/1', { id: 1, title: 'Novo', body: 'Novo' });
   */
  async put(endpoint: string, payload: any, options?: any): Promise<APIResponse> {
    return this.apiContext.put(endpoint, {
      data: payload,
      ...options,
    });
  }

  /**
   * Faz uma requisição PATCH (atualiza parcialmente)
   * @param endpoint - Caminho da API
   * @param payload - Dados parciais do recurso
   * @param options - Opções adicionais
   * @returns Response do Playwright
   * 
   * Exemplo:
   * const response = await api.patch('/posts/1', { title: 'Título Atualizado' });
   */
  async patch(endpoint: string, payload: any, options?: any): Promise<APIResponse> {
    return this.apiContext.patch(endpoint, {
      data: payload,
      ...options,
    });
  }

  /**
   * Faz uma requisição DELETE
   * @param endpoint - Caminho da API
   * @param options - Opções adicionais
   * @returns Response do Playwright
   * 
   * Exemplo:
   * const response = await api.delete('/posts/1');
   */
  async delete(endpoint: string, options?: any): Promise<APIResponse> {
    return this.apiContext.delete(endpoint, options);
  }

  /**
   * Faz um GET e retorna diretamente o JSON
   * @param endpoint - Caminho da API
   * @returns Objeto parsed do JSON
   * 
   * Exemplo:
   * const posts = await api.getJSON('/posts');
   */
  async getJSON(endpoint: string): Promise<any> {
    const response = await this.get(endpoint);
    return response.json();
  }

  /**
   * Valida que a resposta tem o status esperado
   * @param response - Response do Playwright
   * @param expectedStatus - Status HTTP esperado (200, 201, 404, etc)
   * @throws Error se o status não corresponder
   * 
   * Exemplo:
   * await api.assertStatus(response, 200);
   */
  async assertStatus(response: APIResponse, expectedStatus: number): Promise<void> {
    if (response.status() !== expectedStatus) {
      throw new Error(
        `Status esperado: ${expectedStatus}, Recebido: ${response.status()}`
      );
    }
  }

  /**
   * Valida o Content-Type da resposta
   * @param response - Response do Playwright
   * @param expectedType - Tipo MIME esperado (json, xml, html, etc)
   * @throws Error se o Content-Type não contiver o tipo esperado
   * 
   * Exemplo:
   * await api.assertContentType(response, 'application/json');
   */
  async assertContentType(response: APIResponse, expectedType: string): Promise<void> {
    const contentType = response.headers()['content-type'];
    if (!contentType.includes(expectedType)) {
      throw new Error(
        `Content-Type esperado: ${expectedType}, Recebido: ${contentType}`
      );
    }
  }

  /**
   * Valida que a resposta tem um header específico
   * @param response - Response do Playwright
   * @param headerName - Nome do header
   * @param expectedValue - Valor esperado (opcional)
   * @throws Error se o header não existir ou tiver valor diferente
   * 
   * Exemplo:
   * await api.assertHeader(response, 'x-api-version', '1.0');
   */
  async assertHeader(response: APIResponse, headerName: string, expectedValue?: string): Promise<void> {
    const headerValue = response.headers()[headerName.toLowerCase()];
    
    if (!headerValue) {
      throw new Error(`Header '${headerName}' não encontrado`);
    }
    
    if (expectedValue && headerValue !== expectedValue) {
      throw new Error(
        `Header '${headerName}': esperado '${expectedValue}', recebido '${headerValue}'`
      );
    }
  }

  /**
   * Faz múltiplas requisições GET em paralelo
   * @param endpoints - Array de endpoints
   * @returns Array de responses
   * 
   * Exemplo:
   * const responses = await api.getMultiple(['/posts/1', '/posts/2', '/posts/3']);
   */
  async getMultiple(endpoints: string[]): Promise<APIResponse[]> {
    return Promise.all(endpoints.map(endpoint => this.get(endpoint)));
  }

  /**
   * Retorna o tempo de resposta em ms
   * @param response - Response do Playwright
   * @returns Tempo em milissegundos
   * 
   * Exemplo:
   * const time = api.getResponseTime(response);
   */
  getResponseTime(response: APIResponse): number {
    // Playwright não fornece time direto, usar timing da requisição
    return response.timing ? response.timing.responseEnd : 0;
  }
}
