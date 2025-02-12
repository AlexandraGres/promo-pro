import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {},
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    requestTimeout: 20000,
    responseTimeout: 20000,
  },
});
