import type { Config } from 'tailwindcss';
import tokens from '@afnizarnur/tokens/tailwind';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      fontSize: tokens.fontSize,
      fontWeight: tokens.fontWeight,
      lineHeight: tokens.lineHeight,
      screens: tokens.screens,
    },
  },
  plugins: [],
} satisfies Config;
