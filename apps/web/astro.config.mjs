import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sitemap(),
  ],
  output: 'static',
  adapter: netlify(),
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
});
