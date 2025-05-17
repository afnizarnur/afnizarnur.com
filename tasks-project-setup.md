# Project Setup
   
Task to setup the portfolio from scratch
   
## Completed Tasks

- [x] Install and use Tailwind
- [x] Make it able to use multi theme for the portfolio (light, dark, and other colors)
- [x] Make the multi theme scalable and easy to maintain
   
## In Progress Tasks

- [ ] Install and use gsap
- [ ] Use custom font headline "Aksen" and body use Inter Variable
   
## Implementation Plan

The portfolio has been set up with the following features:

1. Tailwind CSS Integration
   - Installed @astrojs/tailwind and configured it
   - Set up custom theme colors using CSS variables
   - Created a responsive layout system

2. Theme System
   - Implemented light and dark themes
   - Created a theme toggle component
   - Added system preference detection
   - Persisted theme preference in localStorage
   - Made themes easily extensible through CSS variables

3. Base Layout
   - Created a responsive layout component
   - Added header with navigation and theme toggle
   - Set up proper meta tags and SEO structure
   
### Relevant Files

- src/styles/global.css - Global styles and theme variables
- src/components/ThemeToggle.astro - Theme toggle component
- src/layouts/Layout.astro - Base layout component
- tailwind.config.mjs - Tailwind configuration with theme colors
- astro.config.mjs - Astro configuration with Tailwind integration
   