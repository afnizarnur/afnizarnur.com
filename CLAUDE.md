# afnizarnur.com

Personal portfolio and blog platform. Monorepo built with Next.js, React, Sanity CMS, TypeScript, and Tailwind CSS.

**Tech Stack:** Next.js 15.5.6, React 19.2.0, Sanity Studio 4.10.3, TypeScript 5.6.3 (strict), Tailwind CSS 4.1.14, Biome 2.3.0, Turborepo 2.0.0, Node.js 20+, pnpm 9.0.0+

## Structure

- `apps/site/` - Next.js 15 frontend (React 19, App Router, ISR, Server Components)
- `apps/studio/` - Sanity Studio CMS (runs on port 3333)
- `packages/ui/` - Shared React components library
- `packages/tokens/` - Design tokens (Terrazzo 0.10.3)
- `packages/config-typescript/` - Shared TypeScript configuration
- `docs/` - Project documentation (architecture, workflow, CMS, design system, etc.)
- `specs/` - Feature specifications and PRDs

## Bash Commands

Root commands:

- `pnpm dev` - Start all apps in dev mode
- `pnpm build` - Build all apps
- `pnpm typecheck` - Type check all apps (IMPORTANT: run after code changes)
- `pnpm lint` - Lint all files with Biome
- `pnpm lint:fix` - Lint and fix issues with Biome
- `pnpm format` - Format code with Biome
- `pnpm format:check` - Check formatting with Biome
- `pnpm check` - Run both linting and formatting (Biome check)
- `pnpm check:fix` - Run both linting and formatting with fixes
- `pnpm clean` - Clean build artifacts
- `pnpm changeset` - Create changeset for version management
- `pnpm version-packages` - Bump versions based on changesets
- `pnpm release` - Build and publish packages

App-specific (using --filter):

- `pnpm --filter @afnizarnur/site dev` - Start Next.js dev server (port 3000)
- `pnpm --filter @afnizarnur/site build` - Build Next.js app
- `pnpm --filter @afnizarnur/site start` - Start Next.js production server
- `pnpm --filter @afnizarnur/studio dev` - Start Sanity Studio (port 3333)
- `pnpm --filter @afnizarnur/studio deploy` - Deploy Sanity Studio

## Workflow

Initial setup:

1. Clone repo and run `pnpm install`
2. Build shared packages: `pnpm turbo run build --filter="@afnizarnur/tokens"`
3. Start development: `pnpm dev`

Making changes:

1. Create feature branch from `main`
2. Make changes in relevant apps/packages
3. YOU MUST run `pnpm typecheck` after code changes
4. YOU MUST run `pnpm check:fix` before committing (lints and formats)
5. Test locally with `pnpm dev`

Version management (uses Changesets):

1. Create changeset: `pnpm changeset`
2. Bump versions: `pnpm version-packages`
3. Publish: `pnpm release`

IMPORTANT: Versioned packages are `@afnizarnur/tokens` and `@afnizarnur/ui` only. Config packages (`@afnizarnur/config-typescript`) are ignored from changesets.

## Code Style

TypeScript:

- Strict mode enabled
- Prefer named exports over default exports
- Use `interface` for object types, `type` for unions/intersections
- Always add explicit return types for functions

React:

- Use functional components with hooks
- All components must be `.tsx` files
- Follow React 19 best practices
- Use Server Components by default (mark with `"use client"` only when needed)

File naming:

- Components: `PascalCase.tsx`
- Utils/Helpers: `camelCase.ts`
- Config files: `kebab-case.ts` or `.js`

Formatting and Linting (Biome 2.3.0):

- No semicolons (`semicolons: "asNeeded"`)
- Double quotes (`quoteStyle: "double"`)
- 4-space indentation (no tabs)
- 100 character line limit
- ES5 trailing commas
- Always parentheses in arrow functions
- Automatic import organization
- Run `pnpm check:fix` before committing (lints and formats in one command)

## Key Files

**Root Configuration:**
- `turbo.json` - Turborepo task definitions and caching
- `pnpm-workspace.yaml` - Workspace configuration
- `.changeset/config.json` - Changeset configuration
- `netlify.toml` - Netlify deployment config
- `biome.json` - Biome linting and formatting rules (4-space, no semicolons)

**Design System:**
- `packages/tokens/terrazzo.config.js` - Design tokens configuration (Terrazzo)
- `packages/tokens/process-theme.js` - Post-build theme processing script

**Frontend (apps/site):**
- `next.config.ts` - Next.js configuration (standalone output, image optimization)
- `postcss.config.mjs` - PostCSS with Tailwind CSS v4 plugin
- `app/layout.tsx` - Root layout with navigation, metadata, and live preview
- `app/styles/global.css` - Tailwind v4 CSS configuration with design tokens
- `lib/sanity/client.ts` - Sanity client with visual editing support (stega enabled)
- `lib/sanity/live.ts` - Live Content API configuration
- `lib/sanity/fetch.ts` - Unified fetch wrapper (draft mode + ISR)
- `lib/sanity/queries.ts` - GROQ queries with ISR tags and sanitization
- `lib/sanity/sanitize.ts` - Text sanitization utilities
- `components/UserPreferencesContext.tsx` - User preference state management
- `components/LayoutProvider.tsx` - Layout state provider

**API Routes:**
- `app/api/draft-mode/enable/route.ts` - Draft mode enable endpoint
- `app/api/draft-mode/disable/route.ts` - Draft mode disable endpoint
- `app/api/revalidate/route.ts` - On-demand ISR webhook endpoint
- `app/api/spotify/now-playing/route.ts` - Spotify integration (5-min ISR cache)

**CMS (apps/studio):**
- `sanity.config.ts` - Sanity Studio with Presentation Tool and Vision

## Repository Etiquette

Commits:

- Write clear, descriptive commit messages
- Reference issue numbers when applicable
- Keep commits focused and atomic

Pull Requests:

- Create PRs from feature branches to `main`
- Include description of changes and testing done
- Ensure all checks pass before requesting review

IMPORTANT: Never commit without running `pnpm typecheck` and `pnpm check:fix` first.

## Sanity CMS Integration

This project uses **next-sanity** (v11.5.5) for seamless Next.js integration with Sanity Studio, plus additional integrations like Spotify API for the Now Playing widget.

### Architecture

**Data Layer:**

- `apps/site/lib/sanity/client.ts` - Sanity client with visual editing support
- `apps/site/lib/sanity/live.ts` - Live Content API configuration for real-time previews
- `apps/site/lib/sanity/fetch.ts` - Unified fetch wrapper (handles both draft mode and ISR)
- `apps/site/lib/sanity/queries.ts` - All CMS queries with ISR tags and sanitization
- `apps/site/lib/sanity/sanitize.ts` - Text sanitization utilities

**Features:**

- ✅ Live preview with Live Content API (real-time content updates)
- ✅ Visual editing in Sanity Studio's Presentation Tool
- ✅ Draft mode for content preview before publishing
- ✅ ISR (Incremental Static Regeneration) with 1-hour default revalidation
- ✅ On-demand revalidation via webhook endpoint (`/api/revalidate`)
- ✅ Automatic sanitization of CMS content (removes invisible Unicode characters)
- ✅ Spotify Now Playing widget with 5-minute ISR caching

### Draft Mode & Visual Editing

**API Routes:**

- `/api/draft-mode/enable` - Enables draft mode from Sanity Studio
- `/api/draft-mode/disable` - Disables draft mode
- `/api/revalidate` - On-demand ISR cache revalidation webhook (requires `SANITY_REVALIDATE_SECRET`)
- `/api/spotify/now-playing` - Spotify Now Playing data (5-minute ISR cache)

**Components:**

- `<SanityLive />` - Enables real-time content updates
- `<VisualEditing />` - Enables in-context editing in Presentation Tool

Both components are conditionally rendered in `app/layout.tsx` when draft mode is enabled.

### Content Sanitization

All text content from Sanity is automatically sanitized at the data layer to handle:

- Zero-width characters (invisible characters from copy-paste)
- Multiple consecutive whitespace
- Non-breaking spaces and other Unicode whitespace
- Leading/trailing whitespace

This ensures clean rendering without invisible characters affecting the layout.

### Sanity Studio

The CMS interface runs separately at `apps/studio` with:

- Structure Tool for content management
- Vision Tool for GROQ query testing
- Presentation Tool for live preview and visual editing

Configure preview URL in `apps/studio/sanity.config.ts`.

## Environment Variables

Required for CMS connection:

**Frontend (apps/site/.env.local):**

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token  # Required for draft mode and live preview
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333  # For visual editing

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Production: https://afnizarnur.com

# Webhook Security
SANITY_REVALIDATE_SECRET=your_secret_key  # For on-demand ISR revalidation

# Spotify Integration (Optional)
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

**Studio (apps/studio/.env or .env.local):**

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000  # Optional, for preview links
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Production: https://afnizarnur.com
```

See `.env.example` files for complete documentation.

## Deployment

Frontend (`apps/site`):

- Platform: Netlify with ISR support
- Build command: `pnpm turbo run build --filter=@afnizarnur/site`
- Output: `apps/site/.next`
- Output mode: `standalone` (for Netlify adapter)
- Plugin: `@netlify/plugin-nextjs` v5.7.4
- Node: `>=20.0.0`
- pnpm: `>=9.0.0`
- Image optimization: AVIF and WebP formats
- Security headers configured in `netlify.toml`

CMS (`apps/studio`):

- Platform: Sanity
- Deploy command: `pnpm --filter @afnizarnur/studio deploy`

## Troubleshooting

Build issues:

1. Clean everything: `pnpm clean`
2. Reinstall: `pnpm install`
3. Build shared packages: `pnpm turbo run build --filter="@afnizarnur/tokens"`
4. Build all: `pnpm build`

Type errors:

- Run `pnpm typecheck` across all packages to identify issues

Linting/Formatting issues:

- Run `pnpm check:fix` to automatically fix linting and formatting issues
- Run `pnpm lint` to see linting errors
- Run `pnpm format` to format code

IMPORTANT: If build fails, check that the tokens package is built first before apps.

## Important Gotchas

- **Shared packages must build first**: Tokens package must be built before apps can use them (`pnpm turbo run build --filter="@afnizarnur/tokens"`)
- **Port conflicts**: Site runs on port 3000, Sanity Studio runs on port 3333
- **Changesets**: Only applies to `@afnizarnur/tokens` and `@afnizarnur/ui`. Config packages are ignored.
- **Strict TypeScript**: All code must pass strict type checking. No build errors allowed.
- **Tailwind v4**: Uses CSS-first configuration (no JS config file). Custom colors and theme extensions are defined in `global.css` using `@theme` directive
- **Image optimization**: Configured for AVIF and WebP. Remote patterns for `cdn.sanity.io` and `i.scdn.co` (Spotify)
- **Package optimization**: Next.js optimizes imports for `@phosphor-icons/react` and `framer-motion`

## Tailwind CSS v4 Configuration

This project uses Tailwind CSS v4, which introduces a CSS-first configuration approach:

**Setup:**

- **No JS config file**: Tailwind v4 doesn't use `tailwind.config.js/ts`
- **PostCSS plugin**: Uses `@tailwindcss/postcss` in `postcss.config.mjs` (Next.js standard)
- **CSS configuration**: All config is in `apps/site/app/styles/global.css`

**Key directives in global.css:**

- `@import "tailwindcss"` - Imports Tailwind base, components, and utilities
- `@source` - Defines content paths for class scanning
- `@theme` - Extends theme with design tokens (colors, spacing, etc.)
- `@layer base` - Custom base styles

**Design tokens integration:**

- **Terrazzo (v0.10.3)** generates two outputs:
    - `packages/tokens/dist/tokens.css` - Raw CSS custom properties (reference only, not imported)
    - `packages/tokens/dist/tailwind-theme.css` - Auto-generated Tailwind v4 theme (imported via `@afnizarnur/tokens/tailwind`)
- **Build process**: `pnpm build` runs `process-theme.js` script to:
    - Remove `@import "tailwindcss"` from generated theme
    - Fix variable references (--color-primitive-_ → --color-_)
- **Theme mapping** uses custom keys for clean utility names:
    - Primitive colors: `bg-gray-900`, `text-red-500`
    - Semantic colors: `bg-background-primary`, `text-text-primary`, `border-border-accent-primary`
- **Dark mode**: Supports dark mode via `@variant dark` directive
- **Single source of truth**: Only `@afnizarnur/tokens/tailwind` is imported in `global.css`
- **Package export**: `packages/tokens/package.json` exports `./tailwind` pointing to processed theme file

**Migration notes:**

- Uses PostCSS plugin for Next.js (standard approach)
- Design tokens imported from `@afnizarnur/tokens/tailwind`
- Uses `@terrazzo/plugin-tailwind` with custom theme structure for clean utility names
- Build script `process-theme.js` processes the generated theme file

## Biome Configuration

This project uses **Biome** (v2.3.0) as an all-in-one toolchain for linting and formatting, replacing both ESLint and Prettier.

**Configuration:**

- Root configuration: `biome.json` at monorepo root
- Single source of truth for all linting and formatting rules
- Applies to all TypeScript, JavaScript, JSON, and CSS files

**Key Features:**

- ⚡ 10-100x faster than ESLint + Prettier combined
- 🎯 Single tool for both linting and formatting
- 📦 Zero configuration required (opinionated defaults)
- 🔧 Automatic import organization
- 🚀 Instant feedback in editors via Biome extension

**Commands:**

- `pnpm check:fix` - Recommended: Lint + format + fix all issues
- `pnpm lint` - Lint only
- `pnpm lint:fix` - Lint with auto-fix
- `pnpm format` - Format only
- `pnpm format:check` - Check formatting without fixing

**Rules:**

- Preserves existing code style (no semicolons, 4-space indents, double quotes)
- TypeScript-aware linting (unused vars, explicit any, etc.)
- Automatic import sorting and organization
- Consistent with previous ESLint + Prettier setup

**Editor Integration:**

- Install Biome extension for VSCode, WebStorm, or your editor
- Automatic formatting on save
- Inline linting errors and warnings

## Resources

- Next.js 15: https://nextjs.org/docs
- React 19: https://react.dev
- App Router: https://nextjs.org/docs/app
- Server Components: https://nextjs.org/docs/app/building-your-application/rendering/server-components
- Sanity: https://www.sanity.io/docs
- Turborepo: https://turbo.build/repo/docs
- Changesets: https://github.com/changesets/changesets
- Tailwind CSS v4: https://tailwindcss.com/docs
- Biome: https://biomejs.dev
