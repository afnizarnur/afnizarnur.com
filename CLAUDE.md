# afnizarnur.com Development Guidelines

Last updated: 2025-10-11

## Project Overview

This is a monorepo for afnizarnur.com - a personal portfolio and blog platform built with Astro and Sanity CMS.

## Tech Stack

### Core Technologies
- **TypeScript 5.6.x** (strict mode)
- **Node.js 20.x LTS** (minimum)
- **pnpm 9.x** (package manager)
- **Turbo 2.x** (monorepo build system)

### Frontend Stack
- **Astro 4.x** - Main web framework
- **React 18.3.x** - UI components
- **Tailwind CSS 3.4.x** - Styling
- **Sanity Client 6.x** - Content management

### CMS
- **Sanity Studio 4.x** - Content management system
- **Sanity Vision 4.x** - GROQ query tool

## Monorepo Structure

```
afnizarnur.com/
├── apps/
│   ├── web/                    # Astro frontend application
│   │   ├── src/               # Source files
│   │   ├── public/            # Static assets
│   │   ├── astro.config.mjs   # Astro configuration
│   │   └── package.json
│   └── studio/                # Sanity Studio CMS
│       ├── schemas/           # Content schemas
│       ├── sanity.config.ts   # Sanity configuration
│       └── package.json
├── packages/
│   ├── config-eslint/         # Shared ESLint config
│   ├── config-tailwind/       # Shared Tailwind config
│   ├── config-typescript/     # Shared TypeScript config
│   ├── tokens/                # Design tokens (Terrazzo)
│   └── ui/                    # Shared React components
├── docs/                      # Project documentation
├── specs/                     # Feature specifications
├── .changeset/                # Changeset configurations
├── turbo.json                 # Turborepo configuration
├── pnpm-workspace.yaml        # Workspace configuration
└── package.json               # Root package configuration
```

## Available Commands

### Root Level Commands
```bash
pnpm dev                # Start all apps in development mode
pnpm build              # Build all apps
pnpm typecheck          # Type check all apps
pnpm lint               # Lint all apps
pnpm format             # Format code with Prettier
pnpm format:check       # Check code formatting
pnpm clean              # Clean all build artifacts
pnpm changeset          # Create a new changeset
pnpm version-packages   # Bump package versions
pnpm release            # Build and publish packages
```

### App-Specific Commands

**Web App (apps/web):**
```bash
pnpm --filter @afnizarnur/web dev        # Start dev server
pnpm --filter @afnizarnur/web build      # Build for production
pnpm --filter @afnizarnur/web preview    # Preview production build
pnpm --filter @afnizarnur/web typecheck  # Type check
pnpm --filter @afnizarnur/web lint       # Lint code
```

**Studio App (apps/studio):**
```bash
pnpm --filter @afnizarnur/studio dev     # Start Sanity Studio (port 3333)
pnpm --filter @afnizarnur/studio build   # Build Sanity Studio
pnpm --filter @afnizarnur/studio deploy  # Deploy to Sanity
```

## Development Workflow

### Initial Setup
```bash
# Clone and install dependencies
git clone https://github.com/afnizarnur/afnizarnur.com.git
cd afnizarnur.com
pnpm install

# Build shared packages first
pnpm turbo run build --filter="@afnizarnur/config-*" --filter="@afnizarnur/tokens"

# Start development
pnpm dev
```

### Making Changes

1. **Create a feature branch** from `main`
2. **Make your changes** in the relevant apps/packages
3. **Run type checking and linting:**
   ```bash
   pnpm typecheck
   pnpm lint
   ```
4. **Test your changes** locally with `pnpm dev`
5. **Format your code:**
   ```bash
   pnpm format
   ```

### Version Management

This project uses [Changesets](https://github.com/changesets/changesets) for package versioning:

```bash
# 1. Create a changeset for your changes
pnpm changeset

# 2. Bump versions based on changesets
pnpm version-packages

# 3. Publish changes (if needed)
pnpm release
```

**Versioned packages:** `@afnizarnur/tokens`, `@afnizarnur/ui`, `@afnizarnur/ui-primitives`
**Config packages are ignored** from changesets.

## Code Style Guidelines

### TypeScript
- Use **strict mode** enabled
- Prefer **named exports** over default exports
- Use **interface** for object types, **type** for unions/intersections
- Always add **explicit return types** for functions

### React Components
- Use **functional components** with hooks
- Prefer **TypeScript** for all component files (.tsx)
- Follow **React 18** best practices

### File Naming
- Components: `PascalCase.tsx` or `PascalCase.astro`
- Utils/Helpers: `camelCase.ts`
- Config files: `kebab-case.ts` or `kebab-case.js`

### Formatting
- Use **Prettier** for code formatting
- Run `pnpm format` before committing
- Use **ESLint** for code quality

## Deployment

- **Frontend (apps/web):** Deployed to Netlify
- **CMS (apps/studio):** Deployed to Sanity
- **Status:** [![Netlify Status](https://api.netlify.com/api/v1/badges/39910d3d-7848-4020-914c-209c03d34b82/deploy-status)](https://app.netlify.com/sites/afnizarnur/deploys)

### Build Configuration
- Build command: `pnpm build`
- Output directory: `apps/web/dist`
- Node version: `>=20.0.0`

## Key Files

- `turbo.json` - Turborepo task definitions and caching
- `pnpm-workspace.yaml` - Workspace package configuration
- `.changeset/config.json` - Changeset configuration
- `netlify.toml` - Netlify deployment configuration
- `.prettierrc.json` - Prettier formatting rules

## Environment Variables

Required environment variables (create `.env` file):
- Check `.env.example` if available
- Sanity-related variables for CMS connection

## Troubleshooting

### Build Issues
```bash
# Clean and rebuild everything
pnpm clean
pnpm install
pnpm turbo run build --filter="@afnizarnur/config-*" --filter="@afnizarnur/tokens"
pnpm build
```

### Type Errors
```bash
# Run type checking across all packages
pnpm typecheck
```

## Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Changesets Documentation](https://github.com/changesets/changesets)
