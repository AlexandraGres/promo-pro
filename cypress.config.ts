import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://promo-pro-21485.web.app/',
    setupNodeEvents(on, config) {},
  },
});
