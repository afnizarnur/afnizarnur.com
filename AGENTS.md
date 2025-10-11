# AGENTS.md

AI agent guidelines for the afnizarnur.com monorepo (Astro + Sanity CMS).

## Project Overview

**Tech Stack:** Astro 4.x, Sanity Studio 4.x, React 18.x, Tailwind CSS 3.x, TypeScript (strict)
**Build System:** Turborepo 2.x with pnpm 9.x workspaces
**Node Version:** ≥20.0.0
**Main Branch:** `main`

**Monorepo Structure:**
- `apps/web` - Astro public website (Netlify)
- `apps/studio` - Sanity Studio CMS
- `packages/` - Shared configs, UI components, design tokens

## Development Setup

### Initial Setup

```bash
# Clone and install
git clone <repository-url>
cd afnizarnur.com
pnpm install

# Build shared packages first (required)
pnpm turbo run build --filter="@afnizarnur/config-*" --filter="@afnizarnur/tokens"
```

### Environment Configuration

Create `.env` files in `apps/web` and `apps/studio`:

**apps/web/.env:**
```bash
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
PUBLIC_SITE_URL=https://afnizarnur.com
```

**apps/studio/.env:**
```bash
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

Get credentials from https://sanity.io/manage

## Build and Test Commands

### Development

```bash
pnpm dev                                  # Start all apps
pnpm --filter @afnizarnur/web dev         # Web only (http://localhost:4321)
pnpm --filter @afnizarnur/studio dev      # Studio only (http://localhost:3333)
```

### Build

```bash
pnpm build                                # Build all apps for production
pnpm --filter @afnizarnur/web build       # Build web only
pnpm --filter @afnizarnur/web preview     # Preview production build
```

### Quality Checks

**Run these before committing:**

```bash
pnpm typecheck        # TypeScript validation (must pass)
pnpm lint             # ESLint checks (must pass)
pnpm format           # Auto-format with Prettier
pnpm format:check     # Verify formatting
```

### Troubleshooting

```bash
# Clean build artifacts and reinstall
pnpm clean
pnpm install
pnpm turbo run build --filter="@afnizarnur/config-*" --filter="@afnizarnur/tokens"
```

## Code Style Guidelines

### General Conventions

**File Naming:**
- Components: `PascalCase.tsx` / `PascalCase.astro`
- Utilities: `camelCase.ts`
- Routes: `kebab-case.astro`

**Formatting:**
- 2 space indentation
- Single quotes (except JSX)
- Semicolons required
- 100 character line limit
- Use Prettier for auto-formatting

### TypeScript

- Strict mode enabled
- Named exports only (no default exports)
- Explicit return types for functions
- Use `interface` for objects, `type` for unions

```typescript
// ✅ Good
export interface Post {
  title: string;
  slug: string;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

// ❌ Avoid
export default function (date) { /* ... */ }
```

### React Components

```tsx
// ✅ Good - Typed functional component
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

### Styling

- Use Tailwind utilities (avoid custom CSS)
- Reference design tokens from `@afnizarnur/tokens`
- No inline styles

### Project Structure

```
apps/web/src/
├── components/
│   ├── ui/          # Generic UI components
│   ├── features/    # Feature-specific components
│   └── layouts/     # Layout components
├── pages/           # Astro routes
├── lib/             # Utilities and Sanity client
└── styles/          # Global styles
```

## Testing

### Required Pre-Commit Checks

All must pass before committing:

```bash
pnpm typecheck        # ✅ Zero TypeScript errors
pnpm lint             # ✅ Zero ESLint errors
pnpm format:check     # ✅ Properly formatted
pnpm build            # ✅ Successful build
```

### Manual Testing Checklist

- [ ] Schema changes: Test in Studio (`pnpm --filter @afnizarnur/studio dev`)
- [ ] UI changes: Verify in dev and production builds
- [ ] Responsive: Test mobile, tablet, desktop
- [ ] Content: Sanity content renders correctly

### Unit Tests

- Use Vitest: `component.test.tsx` adjacent to source
- Document manual QA in PR if unit tests not feasible

## Pull Request Guidelines

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

**Examples:**
```
feat(web): add project detail page
fix(studio): correct schema validation for tags
docs: add deployment guide
chore(deps): upgrade ESLint dependencies
```

### Changesets (for Package Changes)

When modifying versioned packages (`@afnizarnur/tokens`, `@afnizarnur/ui`, `@afnizarnur/ui-primitives`):

```bash
pnpm changeset
```

Note: `config-*` packages are not versioned.

### PR Template

**What:** Describe the change and why it's needed

**How:** Explain implementation approach

**Testing:**
- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds
- [ ] Manual testing completed

**References:** Link to relevant docs or specs

**Screenshots:** Include for UI changes

## Deployment

### Web App (Netlify)

- **Build:** `pnpm build`
- **Output:** `apps/web/dist`
- **Node:** ≥20.0.0
- **Config:** `netlify.toml`
- **Docs:** See `docs/deployment.md`

### Studio (Sanity)

```bash
pnpm --filter @afnizarnur/studio deploy
```

## Additional Information

### Key Configuration Files

- `turbo.json` - Build pipeline and caching
- `pnpm-workspace.yaml` - Workspace packages
- `netlify.toml` - Deployment config
- `.prettierrc.json` - Code formatting
- `.changeset/config.json` - Version management

### Common Patterns

**Sanity Client:**
```typescript
// apps/web/src/lib/sanity.ts
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-01-01',
});
```

**Astro Pages:**
```astro
---
import Layout from '@/layouts/Layout.astro';
import { client } from '@/lib/sanity';

const posts = await client.fetch('*[_type == "post"]');
---

<Layout title="Blog">
  {posts.map(post => <article>{post.title}</article>)}
</Layout>
```

### Resources

- [Astro Docs](https://docs.astro.build)
- [Sanity Docs](https://www.sanity.io/docs)
- [Turborepo Docs](https://turbo.build/repo/docs)
- Project docs in `docs/` and `specs/`
