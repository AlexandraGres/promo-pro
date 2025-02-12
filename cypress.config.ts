import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://promo-pro-21485.web.app/',
    setupNodeEvents(on, config) {},
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    requestTimeout: 20000,
    responseTimeout: 20000,
  },
});
