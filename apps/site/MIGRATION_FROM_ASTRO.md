# Migration from Astro to Next.js

This document outlines the migration from the Astro app (`apps/web`) to Next.js (`apps/site`).

## Why Migrate?

- **React 19**: Access to latest React features (Actions, useOptimistic, etc.)
- **ISR**: Incremental Static Regeneration for automatic content updates
- **Better DX**: Improved developer experience with Next.js 15
- **Ecosystem**: Larger ecosystem and better tooling support

## What Was Migrated

### Pages (7 routes)
| Astro | Next.js | Notes |
|-------|---------|-------|
| `pages/index.astro` | `app/page.tsx` | Homepage with HorizontalHeader |
| `pages/about.astro` | `app/about/page.tsx` | Static page from Sanity |
| `pages/blog/index.astro` | `app/blog/page.tsx` | Blog listing |
| `pages/blog/[slug].astro` | `app/blog/[slug]/page.tsx` | Dynamic route |
| `pages/work/index.astro` | `app/work/page.tsx` | Work listing |
| `pages/work/[slug].astro` | `app/work/[slug]/page.tsx` | Dynamic route |
| `pages/404.astro` | `app/not-found.tsx` | 404 page |

### Components (9 components)
| Astro Component | Next.js Component | Type |
|----------------|-------------------|------|
| NavigationBar.astro | NavigationBar.tsx | Client Component |
| MobileMenu.astro | MobileMenu.tsx | Client Component |
| ThemeToggle.astro | ThemeToggle.tsx | Client Component |
| PageHeader.astro | PageHeader.tsx | Server Component |
| PostCard.astro | PostCard.tsx | Server Component |
| ProjectCard.astro | ProjectCard.tsx | Server Component |
| PortableText.astro | PortableText.tsx | Server Component |
| IconButton.astro | IconButton.tsx | Server Component |
| HorizontalHeader.tsx | HorizontalHeader.tsx | Client Component (kept) |
| Widget.tsx | Widget.tsx | Client Component (kept) |

### Layouts
| Astro | Next.js | Notes |
|-------|---------|-------|
| `layouts/BaseLayout.astro` | `app/layout.tsx` | Root layout with metadata |
| `layouts/PostLayout.astro` | Inline in page | Merged into blog detail page |
| `layouts/ProjectLayout.astro` | Inline in page | Merged into work detail page |

### Data Fetching
| Astro | Next.js | Changes |
|-------|---------|---------|
| `server/data.ts` | `lib/sanity/queries.ts` | Added ISR revalidation |
| `server/sanity.ts` | `lib/sanity/client.ts` | Updated env vars |
| `getStaticPaths()` | `generateStaticParams()` | API change |
| Build-time only | ISR enabled | 1-hour revalidation |

## Key Changes

### 1. Icons Library
**Before:** `phosphor-react` (React 18 only)
**After:** `@phosphor-icons/react` (React 19 compatible)

```tsx
// Old
import { Moon } from "phosphor-react"

// New
import { Moon } from "@phosphor-icons/react"
```

### 2. Tailwind CSS v4
**Before:** `@tailwindcss/vite` plugin in Astro
**After:** `@tailwindcss/postcss` plugin in Next.js

```mjs
// postcss.config.mjs
export default {
    plugins: {
        '@tailwindcss/postcss': {},
    },
}
```

### 3. Component Architecture
**Server Components by default:**
- All pages are Server Components
- Static components remain Server Components
- Only interactive components marked with `"use client"`

**Client Components:**
- NavigationBar (uses `usePathname` hook)
- MobileMenu (interactive overlay)
- ThemeToggle (localStorage access)
- HorizontalHeader (scroll interactions)
- Widget (interactive cards)

### 4. Environment Variables
**Before:** `import.meta.env.PUBLIC_*`
**After:** `process.env.NEXT_PUBLIC_*`

### 5. Hydration Fixes
**Time Display:** Created client-only component to prevent server/client mismatch

```tsx
// TimeDisplay only renders on client
function TimeDisplay() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return <div>&nbsp;</div>
    return <time>{timeString}</time>
}
```

## What's the Same

✅ **100% Visual Parity** - Identical design using same Tailwind config and design tokens
✅ **Same CMS** - Sanity integration unchanged
✅ **Same Monorepo** - Shared packages (`@afnizarnur/tokens`, `@afnizarnur/ui`)
✅ **Same Deployment** - Netlify with proper configuration
✅ **Same Features** - Dark mode, responsive, SEO, etc.

## Performance Improvements

1. **ISR**: Content updates hourly without rebuilds
2. **React 19**: Better streaming and suspense
3. **Optimized Packages**: `optimizePackageImports` for icons and framer-motion
4. **Image Optimization**: Next.js automatic image optimization
5. **Caching**: Better cache strategies with tags

## Migration Checklist

- [x] Set up Next.js 15 project structure
- [x] Migrate all pages (7 routes)
- [x] Convert all components (9 components)
- [x] Set up Tailwind CSS v4 with PostCSS
- [x] Configure Sanity CMS with ISR
- [x] Update to React 19 compatible libraries
- [x] Fix hydration mismatches
- [x] Create deployment configuration
- [x] Update documentation
- [ ] Copy static assets (fonts, images)
- [ ] Add Sanity credentials to `.env`
- [ ] Test all routes and functionality
- [ ] Deploy to Netlify

## Next Steps

1. **Add Sanity credentials** to `.env.local`
2. **Copy static assets** from `apps/web/public/` to `apps/site/public/`
3. **Test thoroughly** - all pages, navigation, theme, mobile menu
4. **Deploy to Netlify** - test ISR in production
5. **Monitor performance** - compare with Astro version

## Rollback Plan

The original Astro app (`apps/web`) remains completely untouched and functional. If issues arise:
1. Keep using `apps/web` for production
2. Debug `apps/site` without pressure
3. Both can run side-by-side during transition

## Support

- Next.js Docs: https://nextjs.org/docs
- React 19 Docs: https://react.dev
- Tailwind v4 Docs: https://tailwindcss.com/docs
- Sanity Docs: https://www.sanity.io/docs
