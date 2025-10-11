# AI Agent Guidelines for afnizarnur.com

Guidelines for AI agents working on this Astro + Sanity monorepo.

## Quick Reference

- **Package Manager:** pnpm 9.x (required)
- **Node Version:** ≥20.0.0
- **Build System:** Turborepo 2.x
- **Primary Stack:** Astro 4.x + Sanity Studio 4.x + React 18.x + Tailwind CSS 3.x
- **TypeScript:** Strict mode enabled
- **Main Branch:** `main`

## Project Structure

### Apps

**`apps/web`** - Public Astro website
- `src/pages/` - File-based routing
- `src/components/` - React and Astro components
- `src/layouts/` - Page layout templates
- `src/lib/` - Client-side utilities and API integrations
- `src/styles/` - Global styles and design tokens
- `public/` - Static assets
- `astro.config.mjs` - Astro configuration with Netlify adapter

**`apps/studio`** - Sanity Studio CMS
- `schemas/` - Content type definitions (post.ts, project.ts, page.ts)
- `sanity.config.ts` - Studio configuration
- Deployed separately to Sanity hosting

### Packages

**`packages/ui`** - Shared React/TSX components for web and studio

**`packages/tokens`** - Design tokens (generated via Terrazzo)
- Colors, typography, spacing, design primitives
- Referenced by Tailwind config

**`packages/config-eslint`** - ESLint configuration
- Extends: `@eslint/js`, `typescript-eslint`, `eslint-plugin-astro`, `eslint-config-prettier`

**`packages/config-tailwind`** - Tailwind CSS configuration with design token integration

**`packages/config-typescript`** - TypeScript configuration (strict mode)

### Documentation

**`docs/`** - Project documentation
- `deployment.md` - Netlify deployment guide
- `prd/` - Product requirement documents

**`specs/`** - Feature specifications

## Commands

### Essential Commands

```bash
# Initial setup
pnpm install

# Development
pnpm dev                                      # Run all apps
pnpm --filter @afnizarnur/web dev             # Web only (port 4321)
pnpm --filter @afnizarnur/studio dev          # Studio only (port 3333)

# Build
pnpm build                                    # Build all apps
pnpm --filter @afnizarnur/web build           # Build web only

# Quality checks (run before committing)
pnpm typecheck                                # TypeScript type checking
pnpm lint                                     # ESLint
pnpm format                                   # Format with Prettier
pnpm format:check                             # Check formatting

# Maintenance
pnpm clean                                    # Remove build artifacts
```

### Package-Specific Commands

```bash
# Build shared packages (required after fresh install)
pnpm turbo run build --filter="@afnizarnur/config-*" --filter="@afnizarnur/tokens"

# Preview production build
pnpm --filter @afnizarnur/web preview

# Deploy Sanity Studio
pnpm --filter @afnizarnur/studio deploy
```

## Coding Conventions

### File Naming

- **Components:** `PascalCase.tsx` or `PascalCase.astro` (e.g., `ProjectCard.tsx`)
- **Utilities:** `camelCase.ts` (e.g., `formatDate.ts`)
- **Routes:** `kebab-case.astro` (e.g., `about-me.astro`)
- **Config:** `kebab-case.ts` or `kebab-case.js`

### Code Formatting

- **Indentation:** 2 spaces
- **Quotes:** Single quotes (except JSX attributes)
- **Semicolons:** Required
- **Line length:** 100 characters max

### TypeScript

```typescript
// ✅ Good: Named exports with explicit types
export interface BlogPost {
  title: string;
  slug: string;
  publishedAt: Date;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

// ❌ Avoid: Default exports, implicit any
export default function (date) {
  return date.toLocaleDateString();
}
```

### React/TSX

```tsx
// ✅ Good: Functional component with typed props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {label}
    </button>
  );
}

// ❌ Avoid: Untyped props, default exports
export default function Button({ label, onClick, variant }) {
  // ...
}
```

### Styling

- Prefer Tailwind utility classes over custom CSS
- Use design tokens from `@afnizarnur/tokens`
- Avoid inline styles unless necessary

```tsx
// ✅ Good: Tailwind utilities with design tokens
<div className="px-4 py-8 bg-surface text-primary">

// ❌ Avoid: Inline styles with arbitrary values
<div style={{ padding: '32px', backgroundColor: '#f5f5f5' }}>
```

## Testing

### Pre-Commit Checklist

1. `pnpm typecheck` - Must pass with zero errors
2. `pnpm lint` - Must pass with zero errors
3. `pnpm format:check` - Must be properly formatted
4. `pnpm build` - Must build successfully

### Manual Testing

- **Schema changes:** Test in Studio with `pnpm --filter @afnizarnur/studio dev`
- **UI changes:** Test in development and production builds
- **Responsive design:** Test on mobile, tablet, desktop viewports
- **Content rendering:** Verify Sanity content displays correctly

### Unit Testing

- Use Vitest-style tests adjacent to source: `component.test.tsx`
- Document manual QA steps in PR if unit tests aren't feasible

## Commits & Pull Requests

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

**Examples:**
```bash
feat(web): add project detail page with hero section
fix(studio): correct schema validation for tags
docs(deployment): add Netlify configuration guide
chore(eslint): upgrade ESLint and related dependencies
```

### Changesets

When modifying shared packages:

```bash
pnpm changeset
```

Follow prompts to select packages, version bump type, and write changelog entry.

**Versioned packages:** `@afnizarnur/tokens`, `@afnizarnur/ui`, `@afnizarnur/ui-primitives`

**Note:** `config-*` packages are NOT versioned.

### Pull Request Requirements

1. **Intent:** What problem does this solve?
2. **Changes:** What was modified and why?
3. **Verification:** How did you test this?
4. **References:** Link to relevant `docs/` or `specs/` files
5. **Screenshots:** For UI changes, include before/after images
6. **Breaking changes:** Document any breaking changes

## Environment & Configuration

### Environment Variables

**Web App (`apps/web/.env`):**
```bash
PUBLIC_SANITY_PROJECT_ID=your-project-id-here
PUBLIC_SANITY_DATASET=production
PUBLIC_SITE_URL=https://afnizarnur.com
```

**Studio App (`apps/studio/.env`):**
```bash
SANITY_STUDIO_PROJECT_ID=your-project-id-here
SANITY_STUDIO_DATASET=production
```

**Getting Sanity credentials:**
1. Visit https://sanity.io/manage
2. Create or select your project
3. Copy Project ID from project settings
4. Use `production` dataset or create new one

### Key Configuration Files

- `turbo.json` - Turborepo task pipeline and caching
- `pnpm-workspace.yaml` - Workspace package definitions
- `netlify.toml` - Netlify deployment configuration
- `.prettierrc.json` - Prettier formatting rules
- `.changeset/config.json` - Changeset version management

## Deployment

### Web App (Netlify)

- **Build command:** `pnpm build`
- **Publish directory:** `apps/web/dist`
- **Node version:** ≥20.0.0
- **Status:** [![Netlify Status](https://api.netlify.com/api/v1/badges/39910d3d-7848-4020-914c-209c03d34b82/deploy-status)](https://app.netlify.com/sites/afnizarnur/deploys)

See `docs/deployment.md` for detailed configuration.

### Studio (Sanity)

```bash
pnpm --filter @afnizarnur/studio deploy
```

Deploys to `{studio-name}.sanity.studio`

## Common Patterns

### Fetching Content from Sanity

```typescript
// apps/web/src/lib/sanity.ts
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Fetch with GROQ
const posts = await client.fetch('*[_type == "post"] | order(publishedAt desc)');
```

### Astro Page Structure

```astro
---
// Frontmatter: Server-side logic
import Layout from '@/layouts/Layout.astro';
import { client } from '@/lib/sanity';

const posts = await client.fetch('*[_type == "post"]');
---

<!-- Template: HTML with components -->
<Layout title="Blog">
  <h1>Blog Posts</h1>
  {posts.map(post => (
    <article>
      <h2>{post.title}</h2>
    </article>
  ))}
</Layout>
```

### Component Organization

```
src/components/
├── ui/              # Generic UI (Button, Card)
├── features/        # Feature-specific (BlogPost, ProjectCard)
└── layouts/         # Layout components (Header, Footer)
```

## Troubleshooting

### Build Fails with Module Errors

```bash
pnpm clean
pnpm install
pnpm turbo run build --filter="@afnizarnur/config-*" --filter="@afnizarnur/tokens"
pnpm build
```

### Type Errors After Package Updates

```bash
rm -rf .turbo
pnpm typecheck
```

### Astro Dev Server Issues

```bash
rm -rf apps/web/.astro
pnpm --filter @afnizarnur/web dev
```

### pnpm Lock File Conflicts

```bash
rm pnpm-lock.yaml
pnpm install
```

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Getting Help

- Check `docs/` for project-specific documentation
- Review `specs/` for feature specifications
- Examine recent commits: `git log --oneline`
- Reference similar existing components
