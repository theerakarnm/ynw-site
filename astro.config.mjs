// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical origin comes from the environment; never hardcode a production URL here.
const site = process.env.PUBLIC_SITE_URL ?? 'https://example.com';

export default defineConfig({
  site,
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !/\/(thanks|unsubscribed|404)\/?$/.test(new URL(page).pathname),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
