import dotenv from 'dotenv';

dotenv.config({ override: true }); // FORCE .env to win

import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    testIdAttribute: 'data-test',
  },
  reporter: [['html']],
});
