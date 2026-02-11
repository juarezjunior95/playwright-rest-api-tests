import { test as base, expect, APIRequestContext } from '@playwright/test';

type APIFixtures = {
  apiContext: APIRequestContext;
};

export const test = base.extend<APIFixtures>({
  apiContext: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: process.env.BASE_URL || 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    await use(context);
    await context.dispose();
  },
});

export { expect };
