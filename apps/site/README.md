# @afnizarnur/site

Next.js 15 application with App Router - migrated from Astro.

## Tech Stack

- **Framework:** Next.js 15.5.6 (App Router)
- **React:** 18.3.1
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **CMS:** Sanity Client 6.29.1
- **Content:** @portabletext/react 3.2.4
- **Design Tokens:** @afnizarnur/tokens (shared with Astro app)
- **TypeScript:** 5.9.3 (strict mode)
- **Deployment:** Netlify with ISR support

## Scripts

```bash
# Development
pnpm dev              # Start Next.js dev server (http://localhost:3000)

# Build & Preview
pnpm build           # Build for production
pnpm start           # Start production server

# Code Quality
pnpm typecheck       # TypeScript type checking
pnpm lint            # ESLint
pnpm format          # Prettier format
pnpm format:check    # Check formatting
```

## Features

- **ISR (Incremental Static Regeneration):** Content updates hourly for posts/projects, daily for pages
- **Server Components:** Most components are RSC for better performance
- **Client Components:** Only interactive components (ThemeToggle, MobileMenu, etc.)
- **Image Optimization:** Sanity CDN with automatic format conversion
- **Dark Mode:** Theme toggle with localStorage persistence
- **SEO:** Full metadata API support with Open Graph and Twitter cards

## Project Structure

```
apps/site/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── blog/              # Blog listing + [slug] detail
│   ├── work/              # Work listing + [slug] detail
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Homepage
│   ├── not-found.tsx      # 404 page
│   └── styles/
│       └── global.css     # Tailwind v4 + design tokens
├── components/            # React components
│   ├── NavigationBar.tsx  # Server component
│   ├── MobileMenu.tsx     # Client component
│   ├── ThemeToggle.tsx    # Client component
│   ├── PageHeader.tsx     # Server component
│   ├── PostCard.tsx       # Server component
│   ├── ProjectCard.tsx    # Server component
│   ├── PortableText.tsx   # Server component
│   ├── HorizontalHeader.tsx # Client component
│   ├── Widget.tsx         # Client component
│   └── IconButton.tsx     # Server component
├── lib/                   # Utilities
│   ├── sanity/
│   │   ├── client.ts      # Sanity client config
│   │   └── queries.ts     # All CMS queries with ISR tags
│   └── theme.ts           # Theme management utilities
├── middleware.ts          # Pathname tracking for navigation
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── netlify.toml           # Deployment configuration
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://afnizarnur.com
```

## Key Differences from Astro Version

1. **Routing:** File-based App Router instead of Astro pages
2. **Components:** React components (RSC + Client) instead of Astro components
3. **Data Fetching:** Server Components with ISR instead of build-time only
4. **Styling:** Same Tailwind v4 setup, identical visual design
5. **Interactive Elements:** "use client" directive for client-side interactivity

## Deployment

Deploys to Netlify with ISR support via `@netlify/plugin-nextjs`.

**Build Command:** `pnpm build`
**Publish Directory:** `.next`
**Node Version:** 20

## Notes

- Uses middleware to track current pathname for navigation highlighting
- All Sanity queries include ISR revalidation and cache tags
- Theme initialization script runs before content to prevent FOUC
- Identical design tokens and Tailwind configuration as Astro app
