---
trigger: always_on
description: 
globs: 
---
# Astro Project Structure Guidelines

This project follows the recommended Astro project structure:

- `src/`: Main source directory
  - `components/`: Reusable Astro components
    - `ui/`: UI component library (Button, Card, Container, etc.)
  - `layouts/`: Page layouts and templates
  - `pages/`: File-based routing directory
  - `styles/`: Global styles and CSS modules
  - `assets/`: Static assets used in components
  - `config/`: Configuration files
- `public/`: Static assets
- `astro.config.mjs`: Astro configuration file

## Core Files
- [src/styles/global.css](mdc:src/styles/global.css): Main CSS file with typography, base styles
- [src/styles/themes.css](mdc:src/styles/themes.css): Theme definitions and CSS variables
- [tailwind.config.mjs](mdc:tailwind.config.mjs): Tailwind configuration with theme extensions

## Layout System
- [src/layouts/BaseLayout.astro](mdc:src/layouts/BaseLayout.astro): Base layout all other layouts extend
- [src/layouts/HomeLayout.astro](mdc:src/layouts/HomeLayout.astro): Home page layout with sidebar

Key conventions:
- Components should be in `.astro` files unless framework-specific components are needed
- Pages must be placed in `src/pages/` for automatic routing
- Static assets must be placed in `public/` directory
- Content should be organized using Content Collections in appropriate directories
