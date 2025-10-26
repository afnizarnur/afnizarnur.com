# AGENTS.md

AI agent guidelines for the afnizarnur.com monorepo (Next.js + Sanity CMS).

## Project Overview

**Tech Stack:** Next.js 15.5.6, React 19.2.0, Sanity Studio 4.10.3, Tailwind CSS 4.1.14, TypeScript 5.6.3 (strict)
**Build System:** Turborepo 2.0.0 with pnpm 9.0.0+ workspaces
**Node Version:** ≥20.0.0
**pnpm Version:** ≥9.0.0
**Main Branch:** `main`

**Monorepo Structure:**

- `apps/site` - Next.js 15.5.6 frontend (React 19.2.0, App Router, ISR, Server Components)
- `apps/studio` - Sanity Studio 4.10.3 CMS (port 3333)
- `packages/ui/` - Shared React components library
- `packages/tokens/` - Design tokens (Terrazzo 0.10.3)
- `packages/config-typescript/` - Shared TypeScript configuration
- `docs/` - Comprehensive documentation
- `specs/` - Feature specifications and PRDs

## Development Setup

### Initial Setup

```bash
# Clone and install
git clone <repository-url>
cd afnizarnur.com
pnpm install

# Build shared packages first (required)
pnpm turbo run build --filter="@afnizarnur/tokens"
```

### Environment Configuration

Create `.env.local` in `apps/site` and `.env` in `apps/studio`:

**apps/site/.env.local:**

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-read-token  # Required for draft mode
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Production: https://afnizarnur.com

# Webhook Security
SANITY_REVALIDATE_SECRET=your-secret-key

# Spotify Integration (Optional)
SPOTIFY_CLIENT_ID=your-client-id
SPOTIFY_CLIENT_SECRET=your-client-secret
SPOTIFY_REFRESH_TOKEN=your-refresh-token
```

**apps/studio/.env or .env.local:**

```bash
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
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
pnpm check:fix        # Biome linting + formatting (must pass)
pnpm lint             # Verify linting passes
pnpm format:check     # Verify formatting
```

### Troubleshooting

```bash
# Clean build artifacts and reinstall
pnpm clean
pnpm install
pnpm turbo run build --filter="@afnizarnur/tokens"
```

## Code Style Guidelines

### General Conventions

**File Naming:**

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Routes: `kebab-case/page.tsx` (App Router convention)

**Formatting (Biome 2.3.0):**

- No semicolons
- Double quotes
- 4-space indentation (no tabs)
- 100 character line limit
- ES5 trailing commas
- Always parentheses in arrow functions
- Run `pnpm check:fix` before committing (lints and formats in one command)

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

- Use Tailwind CSS 4.1.14 utilities (avoid custom CSS)
- Reference design tokens from `@afnizarnur/tokens/tailwind`
- Tailwind v4: CSS-first configuration in `apps/site/app/styles/global.css`
- PostCSS plugin (`@tailwindcss/postcss`) configured in `postcss.config.mjs`
- Design tokens built with Terrazzo 0.10.3
- Semantic colors: `bg-background-primary`, `text-text-primary`, `border-border-accent-primary`
- Primitive colors: `bg-gray-900`, `text-red-500`
- Dark mode: Use `dark:` prefix (configured via `@variant dark`)
- No inline styles
- Icons: Use `@phosphor-icons/react` (optimized package import)

### Project Structure

```
apps/site/
├── app/             # Next.js App Router
│   ├── page.tsx                       # Homepage
│   ├── layout.tsx                     # Root layout (navigation, metadata, live preview)
│   ├── styles/
│   │   └── global.css                 # Tailwind v4 config + design tokens
│   ├── about/                         # About page
│   ├── blog/                          # Blog pages
│   ├── work/                          # Work pages
│   └── api/                           # API routes
│       ├── draft-mode/                # Draft mode endpoints
│       ├── revalidate/                # On-demand ISR webhook
│       └── spotify/                   # Spotify integration
├── components/      # React components (25+ components)
│   ├── NavigationBar.tsx              # Client component
│   ├── Widget.tsx                     # Now Playing widget
│   ├── UserPreferencesContext.tsx     # User preferences state
│   ├── LayoutProvider.tsx             # Layout state provider
│   └── ...                            # Other components
└── lib/             # Utilities and Sanity integration
    └── sanity/
        ├── client.ts                  # Sanity client (stega enabled)
        ├── live.ts                    # Live Content API config
        ├── fetch.ts                   # Unified fetch (draft + ISR)
        ├── queries.ts                 # GROQ queries with ISR tags
        └── sanitize.ts                # Text sanitization utilities
```

## Testing

### Required Pre-Commit Checks

All must pass before committing:

```bash
pnpm typecheck        # ✅ Zero TypeScript errors
pnpm check:fix        # ✅ Biome linting + formatting
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

When modifying versioned packages (`@afnizarnur/tokens` and `@afnizarnur/ui`):

```bash
pnpm changeset
```

Note: Config packages (`@afnizarnur/config-eslint`, `@afnizarnur/config-typescript`) are not versioned and ignored from changesets.

### PR Template

**What:** Describe the change and why it's needed

**How:** Explain implementation approach

**Testing:**

- [ ] `pnpm typecheck` passes
- [ ] `pnpm check:fix` passes (Biome linting + formatting)
- [ ] `pnpm build` succeeds
- [ ] Manual testing completed

**References:** Link to relevant docs or specs

**Screenshots:** Include for UI changes

## Deployment

### Next.js App (Netlify)

- **Build:** `pnpm turbo run build --filter=@afnizarnur/site`
- **Output:** `apps/site/.next`
- **Output mode:** `standalone` (for Netlify adapter)
- **Node:** ≥20.0.0
- **pnpm:** ≥9.0.0
- **Plugin:** `@netlify/plugin-nextjs` v5.7.4
- **Config:** `netlify.toml` (includes security headers and redirects)
- **Image optimization:** AVIF and WebP formats
- **Remote images:** `cdn.sanity.io`, `i.scdn.co` (Spotify)
- **Docs:** See `docs/deployment.md`

### Studio (Sanity)

```bash
pnpm --filter @afnizarnur/studio deploy
```

## Additional Information

### Key Configuration Files

**Root:**
- `turbo.json` - Turborepo pipeline and caching configuration
- `pnpm-workspace.yaml` - Workspace packages definition
- `netlify.toml` - Netlify deployment config (build commands, headers, redirects)
- `biome.json` - Biome linting and formatting configuration (4-space, no semicolons)
- `.changeset/config.json` - Version management configuration

**Frontend (apps/site):**
- `next.config.ts` - Next.js configuration (standalone output, image optimization, package optimizations)
- `postcss.config.mjs` - PostCSS configuration with Tailwind v4 plugin
- `app/styles/global.css` - Tailwind v4 theme and CSS configuration with design tokens
- `tsconfig.json` - TypeScript strict mode configuration

**Design System (packages/tokens):**
- `terrazzo.config.js` - Terrazzo design tokens configuration
- `process-theme.js` - Post-build theme processing script
- `package.json` - Exports `./tailwind` for theme consumption

### Common Patterns

**Sanity Client (with Visual Editing):**

```typescript
// apps/site/lib/sanity/client.ts
import { createClient } from "next-sanity"

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-01-01",
    useCdn: true,
    stega: {
        enabled: process.env.NODE_ENV === "development",
        studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
    },
})
```

**Sanity Queries with ISR (using unified fetch wrapper):**

```typescript
// apps/site/lib/sanity/queries.ts
import { sanityFetch } from "./fetch"

export async function getAllPosts() {
    const query = `*[_type == "post"] | order(publishedAt desc)`
    return await sanityFetch({
        query,
        tags: ["posts"],  // For on-demand revalidation
        revalidate: 3600, // 1 hour ISR cache
    })
}
```

Note: `sanityFetch` from `lib/sanity/fetch.ts` handles both draft mode and ISR, automatically sanitizes text content, and integrates with the revalidation webhook.

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

**Dynamic Routes (Next.js 15 async params):**

```tsx
// apps/site/app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPostSlugs } from "@/lib/sanity/queries"

export async function generateStaticParams() {
    const slugs = await getAllPostSlugs()
    return slugs.map((item) => ({ slug: item.slug }))
}

// Next.js 15: params is a Promise
export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    return <article>{post.title}</article>
}
```

Note: Next.js 15 changed `params` to be a Promise that must be awaited.

### Resources

**Official Documentation:**
- [Next.js 15 Docs](https://nextjs.org/docs) - Framework documentation
- [React 19 Docs](https://react.dev) - React library documentation
- [App Router Guide](https://nextjs.org/docs/app) - Next.js routing
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) - RSC architecture
- [Sanity Docs](https://www.sanity.io/docs) - CMS documentation
- [next-sanity Docs](https://github.com/sanity-io/next-sanity) - Next.js integration
- [Turborepo Docs](https://turbo.build/repo/docs) - Monorepo build system
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Terrazzo Docs](https://terrazzo.dev) - Design tokens
- [Changesets](https://github.com/changesets/changesets) - Version management

**Project Documentation:**
- `docs/README.md` - Documentation index
- `docs/architecture.md` - System architecture
- `docs/development-workflow.md` - Development guide
- `docs/content-management.md` - CMS usage
- `docs/design-system.md` - Design tokens and components
- `docs/deployment.md` - Deployment procedures
- `docs/troubleshooting.md` - Common issues
- `docs/spotify-setup.md` - Spotify integration guide
- `specs/` - Feature specifications and PRDs
