import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      // Disable default Tailwind base styles since we use design tokens
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  output: 'static',
  adapter: netlify(),
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
});
