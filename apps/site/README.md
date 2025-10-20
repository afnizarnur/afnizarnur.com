# @afnizarnur/site

Next.js 15 application with App Router - production site for afnizarnur.com.

## Tech Stack

- **Framework:** Next.js 15.5.6 (App Router)
- **React:** 19.2.0 (latest)
- **Icons:** @phosphor-icons/react 2.x (React 19 compatible)
- **Styling:** Tailwind CSS v4 (PostCSS configuration)
- **CMS:** next-sanity 11.5.5 (with @sanity/client 7.x)
- **Content:** @portabletext/react 3.2.4
- **Design Tokens:** @afnizarnur/tokens (shared monorepo package)
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
- **Live Preview:** Real-time content preview with Sanity Live Content API
- **Visual Editing:** In-context editing in Sanity Studio's Presentation Tool
- **Content Sanitization:** Automatic cleanup of invisible Unicode characters from CMS

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
│   │   ├── client.ts      # Sanity client with visual editing support
│   │   ├── live.ts        # Live Content API configuration
│   │   ├── fetch.ts       # Unified fetch wrapper (draft mode + ISR)
│   │   ├── queries.ts     # All CMS queries with ISR tags
│   │   └── sanitize.ts    # Text sanitization utilities
│   └── theme.ts           # Theme management utilities
├── middleware.ts          # Pathname tracking for navigation
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── netlify.toml           # Deployment configuration
```

## Environment Variables

Create `.env.local`:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Draft Mode & Live Preview (required for visual editing)
SANITY_API_READ_TOKEN=your_read_token

# Visual Editing
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://afnizarnur.com
```

**Getting a Sanity API Token:**

1. Go to https://www.sanity.io/manage/personal/tokens
2. Create a new token with "Viewer" permissions
3. Add it as `SANITY_API_READ_TOKEN` in your `.env.local`

## Architecture Decisions

1. **Routing:** Next.js App Router (app directory) with file-based routing
2. **Components:** Mix of React Server Components and Client Components
    - Server Components: Default for all pages and static components
    - Client Components: Only for interactive elements (theme toggle, navigation, etc.)
3. **Data Fetching:** Server Components with ISR (Incremental Static Regeneration)
    - Content revalidates every 1 hour (posts/projects)
    - Settings revalidate every 24 hours
4. **Styling:** Tailwind CSS v4 with PostCSS, design tokens from monorepo
5. **Icons:** @phosphor-icons/react (React 19 compatible)

## Deployment

Deploys to Netlify with ISR support via `@netlify/plugin-nextjs`.

**Build Command:** `pnpm build`
**Publish Directory:** `.next`
**Node Version:** 20

## Sanity Integration

### Architecture

**next-sanity** provides seamless integration with Next.js:

- **Client Setup** (`lib/sanity/client.ts`): Configured with visual editing support (stega)
- **Live Content API** (`lib/sanity/live.ts`): Real-time content updates in draft mode
- **Fetch Wrapper** (`lib/sanity/fetch.ts`): Automatically switches between draft mode and ISR
- **Queries** (`lib/sanity/queries.ts`): All CMS queries with cache tags and sanitization
- **Sanitization** (`lib/sanity/sanitize.ts`): Cleans CMS content from invisible characters

### Draft Mode

Enable draft mode to preview unpublished content:

**Enable:** Visit `/api/draft-mode/enable?redirect=/`
**Disable:** Visit `/api/draft-mode/disable`

When draft mode is enabled:

- `<SanityLive />` component provides real-time content updates
- `<VisualEditing />` component enables in-context editing
- Content fetches use Live Content API instead of ISR

### Content Sanitization

All text from Sanity is automatically sanitized at the data layer to remove:

- Zero-width characters (U+200B-U+200D, U+FEFF)
- Multiple consecutive whitespace
- Non-breaking spaces and other Unicode whitespace
- Leading/trailing whitespace

This prevents layout issues from invisible characters that can occur when content is copy-pasted from rich text editors.

## Notes

- Uses middleware to track current pathname for navigation highlighting
- All Sanity queries include ISR revalidation and cache tags
- Theme initialization script runs before content to prevent FOUC
- Draft mode requires `SANITY_API_READ_TOKEN` to be set in environment variables
