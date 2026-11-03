// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical origin comes from the environment; never hardcode a production URL here.
// Shell env wins; .env is read as a fallback because Astro does not load it at
// config-evaluation time (only import.meta.env gets .env values).
function resolveSiteUrl() {
  if (process.env.PUBLIC_SITE_URL) return process.env.PUBLIC_SITE_URL.replace(/\/$/, '');
  try {
    const dotenv = readFileSync(new URL('./.env', import.meta.url), 'utf8');
    const match = dotenv.match(/^PUBLIC_SITE_URL=(.*)$/m);
    if (match) return match[1].trim().replace(/\/$/, '');
  } catch {
    /* no .env */
  }
  return 'https://example.com';
}

const site = resolveSiteUrl();

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
