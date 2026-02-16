import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Paralelismo controlado para CI
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Timeout global por teste
  timeout: 30 * 1000,

  // Reporters para Jenkins + visual local
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://jsonplaceholder.typicode.com',
    trace: 'on-first-retry',
  },
});
