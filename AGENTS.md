# AGENTS.md

AI agent guidelines for the afnizarnur.com monorepo (Next.js + Sanity CMS).

## Project Overview

**Tech Stack:** Next.js 15.x, React 19.x, Sanity Studio 4.x, Tailwind CSS 4.x, TypeScript (strict)
**Build System:** Turborepo 2.x with pnpm 9.x workspaces
**Node Version:** ≥20.0.0
**Main Branch:** `main`

**Monorepo Structure:**

- `apps/site` - Next.js 15 frontend (React 19, App Router, ISR)
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

Create `.env.local` in `apps/site` and `.env` in `apps/studio`:

**apps/site/.env.local:**

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://afnizarnur.com
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
pnpm --filter @afnizarnur/site dev        # Next.js only (http://localhost:3000)
pnpm --filter @afnizarnur/studio dev      # Studio only (http://localhost:3333)
```

### Build

```bash
pnpm build                                # Build all apps for production
pnpm --filter @afnizarnur/site build      # Build Next.js only
pnpm --filter @afnizarnur/site start      # Start Next.js production server
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

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Routes: `kebab-case/page.tsx` (App Router convention)

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
    title: string
    slug: string
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString()
}

// ❌ Avoid
export default function (date) {
    /* ... */
}
```

### React Components

Use Server Components by default, mark with `"use client"` only when needed:

```tsx
// ✅ Good - Server Component (default)
interface PostCardProps {
    title: string
    slug: string
}

export function PostCard({ title, slug }: PostCardProps) {
    return (
        <article>
            <h2>{title}</h2>
        </article>
    )
}

// ✅ Good - Client Component (interactive)
;("use client")

interface ButtonProps {
    label: string
    onClick: () => void
}

export function Button({ label, onClick }: ButtonProps) {
    return <button onClick={onClick}>{label}</button>
}
```

### Styling

- Use Tailwind utilities (avoid custom CSS)
- Reference design tokens from `@afnizarnur/tokens`
- Tailwind v4: CSS-first configuration in `apps/site/app/styles/global.css`
- PostCSS plugin configured in `postcss.config.mjs`
- No inline styles

### Project Structure

```
apps/site/
├── app/             # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── work/              # Work pages
│   └── styles/            # Global styles
├── components/      # React components
│   ├── NavigationBar.tsx  # Client component
│   ├── ThemeToggle.tsx    # Client component
│   └── ...                # Other components
└── lib/             # Utilities and Sanity client
    └── sanity/
        ├── client.ts      # Sanity client
        └── queries.ts     # Queries with ISR
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

### Next.js App (Netlify)

- **Build:** `pnpm build`
- **Output:** `apps/site/.next`
- **Node:** ≥20.0.0
- **Plugin:** `@netlify/plugin-nextjs`
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
- `apps/site/next.config.ts` - Next.js configuration
- `apps/site/postcss.config.mjs` - PostCSS configuration (Tailwind v4)
- `apps/site/app/styles/global.css` - Tailwind v4 theme and configuration
- `apps/site/tsconfig.json` - TypeScript configuration

### Common Patterns

**Sanity Client:**

```typescript
// apps/site/lib/sanity/client.ts
import { createClient } from "@sanity/client"

export const sanity = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true,
    apiVersion: "2024-01-01",
})
```

**Sanity Queries with ISR:**

```typescript
// apps/site/lib/sanity/queries.ts
import { sanity } from "./client"

export async function getAllPosts() {
    const query = `*[_type == "post"] | order(publishedAt desc)`
    return await sanity.fetch(
        query,
        {},
        {
            next: { revalidate: 3600, tags: ["posts"] },
        }
    )
}
```

**Next.js Pages (Server Components):**

```tsx
// apps/site/app/blog/page.tsx
import { getAllPosts } from "@/lib/sanity/queries"
import { PostCard } from "@/components/PostCard"

export default async function BlogPage() {
    const posts = await getAllPosts()

    return (
        <div>
            {posts.map((post) => (
                <PostCard key={post.slug} {...post} />
            ))}
        </div>
    )
}
```

**Dynamic Routes:**

```tsx
// apps/site/app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPostSlugs } from "@/lib/sanity/queries"

export async function generateStaticParams() {
    const slugs = await getAllPostSlugs()
    return slugs.map((item) => ({ slug: item.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    return <article>{post.title}</article>
}
```

### Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [App Router Guide](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Sanity Docs](https://www.sanity.io/docs)
- [Turborepo Docs](https://turbo.build/repo/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- Project docs in `docs/` and `specs/`
- Migration guide: `apps/site/MIGRATION_FROM_ASTRO.md`
