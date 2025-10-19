# afnizarnur.com

Personal portfolio and blog platform. Monorepo built with Astro, React, Sanity CMS, TypeScript, and Tailwind CSS.

**Tech Stack:** Astro 5.x, React 18.3.x, Sanity Studio 4.x, TypeScript 5.6.x (strict), Tailwind CSS 4.x, Turborepo 2.x, Node.js 20+, pnpm 9.x

## Structure

- `apps/web/` - Astro frontend (main site)
- `apps/studio/` - Sanity Studio CMS (runs on port 3333)
- `packages/ui/` - Shared React components
- `packages/tokens/` - Design tokens (Terrazzo)
- `packages/config-*` - Shared configs (ESLint, Tailwind, TypeScript)
- `docs/` - Project documentation
- `specs/` - Feature specifications

## Bash Commands

Root commands:

- `pnpm dev` - Start all apps in dev mode
- `pnpm build` - Build all apps
- `pnpm typecheck` - Type check all apps (IMPORTANT: run after code changes)
- `pnpm lint` - Lint all apps
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check formatting
- `pnpm clean` - Clean build artifacts
- `pnpm changeset` - Create changeset for version management
- `pnpm version-packages` - Bump versions based on changesets
- `pnpm release` - Build and publish packages

App-specific (using --filter):

- `pnpm --filter @afnizarnur/web dev` - Start web dev server
- `pnpm --filter @afnizarnur/web build` - Build web app
- `pnpm --filter @afnizarnur/web preview` - Preview production build
- `pnpm --filter @afnizarnur/studio dev` - Start Sanity Studio (port 3333)
- `pnpm --filter @afnizarnur/studio deploy` - Deploy Sanity Studio

## Workflow

Initial setup:

1. Clone repo and run `pnpm install`
2. Build shared packages: `pnpm turbo run build --filter="@afnizarnur/config-*" --filter="@afnizarnur/tokens"`
3. Start development: `pnpm dev`

Making changes:

1. Create feature branch from `main`
2. Make changes in relevant apps/packages
3. YOU MUST run `pnpm typecheck` after code changes
4. YOU MUST run `pnpm lint` before committing
5. Test locally with `pnpm dev`
6. Format code: `pnpm format`

Version management (uses Changesets):

1. Create changeset: `pnpm changeset`
2. Bump versions: `pnpm version-packages`
3. Publish: `pnpm release`

IMPORTANT: Versioned packages are `@afnizarnur/tokens`, `@afnizarnur/ui`, `@afnizarnur/ui-primitives` only. Config packages are ignored from changesets.

## Code Style

TypeScript:

- Strict mode enabled
- Prefer named exports over default exports
- Use `interface` for object types, `type` for unions/intersections
- Always add explicit return types for functions

React:

- Use functional components with hooks
- All components must be `.tsx` files
- Follow React 18 best practices

File naming:

- Components: `PascalCase.tsx` or `PascalCase.astro`
- Utils/Helpers: `camelCase.ts`
- Config files: `kebab-case.ts` or `.js`

Formatting:

- Prettier handles all formatting
- ESLint enforces code quality
- Run `pnpm format` before committing

## Key Files

- `turbo.json` - Turborepo task definitions and caching
- `pnpm-workspace.yaml` - Workspace configuration
- `.changeset/config.json` - Changeset configuration
- `netlify.toml` - Netlify deployment config
- `.prettierrc.json` - Prettier rules
- `apps/web/astro.config.mjs` - Astro configuration (includes Tailwind Vite plugin)
- `apps/web/src/styles/global.css` - Global styles and Tailwind v4 theme configuration
- `apps/studio/sanity.config.ts` - Sanity CMS configuration
- `packages/tokens/terrazzo.config.js` - Design tokens configuration

## Repository Etiquette

Commits:

- Write clear, descriptive commit messages
- Reference issue numbers when applicable
- Keep commits focused and atomic

Pull Requests:

- Create PRs from feature branches to `main`
- Include description of changes and testing done
- Ensure all checks pass before requesting review

IMPORTANT: Never commit without running `pnpm typecheck` and `pnpm lint` first.

## Environment Variables

Required for CMS connection:

- Check `.env.example` for Sanity-related variables
- Create `.env` file in project root

## Deployment

- Frontend (`apps/web`): Netlify
- CMS (`apps/studio`): Sanity
- Build command: `pnpm build`
- Output: `apps/web/dist`
- Node: `>=20.0.0`

## Troubleshooting

Build issues:

1. Clean everything: `pnpm clean`
2. Reinstall: `pnpm install`
3. Build shared packages: `pnpm turbo run build --filter="@afnizarnur/config-*" --filter="@afnizarnur/tokens"`
4. Build all: `pnpm build`

Type errors:

- Run `pnpm typecheck` across all packages to identify issues

IMPORTANT: If build fails, check that shared config packages are built first before apps.

## Important Gotchas

- **Shared packages must build first**: Config packages and tokens must be built before apps can use them
- **Port conflicts**: Sanity Studio runs on port 3333 by default
- **Changesets**: Only applies to `@afnizarnur/tokens`, `@afnizarnur/ui`, and `@afnizarnur/ui-primitives`
- **Strict TypeScript**: All code must pass strict type checking
- **Tailwind v4**: Uses CSS-first configuration (no JS config file). Custom colors and theme extensions are defined in `global.css` using `@theme` directive

## Tailwind CSS v4 Configuration

This project uses Tailwind CSS v4, which introduces a CSS-first configuration approach:

**Setup:**

- **No JS config file**: Tailwind v4 doesn't use `tailwind.config.js/ts`
- **Vite plugin**: Uses `@tailwindcss/vite` plugin in `astro.config.mjs` (recommended approach for Astro)
- **CSS configuration**: All config is in `apps/web/src/styles/global.css`

**Key directives in global.css:**

- `@import "tailwindcss"` - Imports Tailwind base, components, and utilities
- `@source` - Defines content paths for class scanning
- `@theme` - Extends theme with design tokens (colors, spacing, etc.)
- `@layer base` - Custom base styles

**Design tokens integration:**

- Terrazzo generates two outputs:
  - `packages/tokens/dist/tokens.css` - Raw CSS custom properties (not imported, reference only)
  - `packages/tokens/dist/tailwind-theme.css` - Auto-generated Tailwind v4 theme (imported via `@afnizarnur/tokens/tailwind`)
- Build process: `pnpm build` runs `process-theme.js` script to:
  - Remove `@import "tailwindcss"` from generated theme
  - Fix variable references (--color-primitive-* → --color-*)
- Theme mapping uses custom keys for clean utility names:
  - Primitive colors: `bg-gray-900`, `text-red-500`
  - Semantic colors: `bg-background-primary`, `text-text-primary`, `border-border-accent-primary`
- Supports dark mode via `@variant dark` directive
- **Single source of truth**: Only `@afnizarnur/tokens/tailwind` is imported in global.css

**Component styles:**

- Use `@reference "../styles/global.css"` when using `@apply` in component `<style>` blocks
- Required for Tailwind v4 to resolve utilities in scoped styles

**Migration notes:**

- The `@astrojs/tailwind` integration is NOT used (removed for v4)
- Uses `@tailwindcss/vite` plugin for optimal performance with Vite/Astro
- Uses `@terrazzo/plugin-tailwind` with custom theme structure for clean utility names
- Build script `copy-theme.js` removes `@import "tailwindcss"` from generated theme

## Resources

- Astro: https://docs.astro.build
- Sanity: https://www.sanity.io/docs
- Turborepo: https://turbo.build/repo/docs
- Changesets: https://github.com/changesets/changesets
- Tailwind CSS v4: https://tailwindcss.com/docs
