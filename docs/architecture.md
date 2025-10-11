# Architecture Overview

This document provides a comprehensive overview of the afnizarnur.com monorepo architecture, explaining how different parts of the system work together.

## Table of Contents

- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Monorepo Structure](#monorepo-structure)
- [Data Flow](#data-flow)
- [Build Pipeline](#build-pipeline)
- [Deployment Architecture](#deployment-architecture)

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                             │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ HTTPS
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Netlify CDN + Edge                            │
│                  (Static Site Hosting)                           │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ Serves
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Astro Static Site                           │
│                    (apps/web/dist)                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │    Pages     │  │  Components  │  │   Layouts    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ Fetches Content (Build Time)
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Sanity Content Lake                         │
│                     (Headless CMS)                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │    Posts     │  │   Projects   │  │    Pages     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└───────────────────────────────┬─────────────────────────────────┘
                                ▲
                                │ Managed via
                                │
┌─────────────────────────────────────────────────────────────────┐
│                       Sanity Studio                              │
│                    (apps/studio)                                 │
│                  Content Editing Interface                       │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend (apps/web)

**Framework: Astro 4.x**
- Static site generation (SSG)
- File-based routing
- Component islands architecture
- Built-in image optimization

**UI Layer: React 18.x**
- Interactive components
- Client-side hydration (minimal)
- Shared component library

**Styling: Tailwind CSS 3.x**
- Utility-first CSS
- Design token integration
- Custom configuration via workspace package

**Content Client: Sanity Client 6.x**
- Content fetching via GROQ queries
- Build-time data fetching
- CDN-backed content delivery

### CMS (apps/studio)

**Platform: Sanity Studio 4.x**
- Real-time collaborative editing
- Customizable content schemas
- Preview functionality
- Deployed separately from main site

**Content Types:**
- Posts (blog articles)
- Projects (portfolio items)
- Pages (custom pages)
- Tags (taxonomy)
- Navigation (site structure)
- Site Settings (global configuration)

### Build System

**Monorepo Manager: Turborepo 2.x**
- Parallel task execution
- Intelligent caching
- Task dependency management
- Remote caching support

**Package Manager: pnpm 9.x**
- Workspace management
- Efficient disk usage
- Fast installation
- Strict dependency resolution

### Infrastructure

**Hosting: Netlify**
- CDN distribution
- Automatic HTTPS
- Deploy previews
- Edge functions support

**CMS Hosting: Sanity Cloud**
- Content API hosting
- Studio hosting
- Asset CDN
- Real-time sync

## Monorepo Structure

### Apps Directory

```
apps/
├── web/                    # Public-facing website
│   ├── src/
│   │   ├── pages/         # Route pages (Astro)
│   │   ├── layouts/       # Page templates
│   │   ├── components/    # UI components
│   │   ├── server/        # Server utilities
│   │   └── styles/        # Global styles
│   ├── public/            # Static assets
│   └── astro.config.mjs   # Astro configuration
│
└── studio/                # Content management
    ├── schemas/           # Content type definitions
    ├── sanity.config.ts   # Studio configuration
    └── sanity.cli.ts      # CLI configuration
```

### Packages Directory

```
packages/
├── config-eslint/         # Shared ESLint configuration
│   └── index.js           # ESLint flat config
│
├── config-tailwind/       # Shared Tailwind preset
│   └── index.js           # Tailwind config
│
├── config-typescript/     # Shared TypeScript config
│   └── tsconfig.json      # Base tsconfig
│
├── tokens/                # Design tokens
│   ├── tokens.json        # Token definitions
│   └── dist/              # Generated CSS/JS
│
└── ui/                    # Shared React components
    └── src/               # Component source
```

## Data Flow

### Build-Time Data Flow

```
1. Developer Triggers Build
   └─> pnpm build

2. Turborepo Orchestrates Tasks
   ├─> Build shared packages (config-*, tokens)
   └─> Build apps (web, studio)

3. Astro Build Process (apps/web)
   ├─> Parse .astro files
   ├─> Fetch content from Sanity
   │   └─> GROQ queries to Sanity Content Lake
   ├─> Render pages to HTML
   ├─> Optimize images
   ├─> Bundle JavaScript (minimal)
   └─> Output to dist/

4. Deploy to Netlify
   ├─> Upload dist/ to CDN
   └─> Invalidate old cache
```

### Content Update Flow

```
1. Editor Creates/Updates Content
   └─> Sanity Studio (apps/studio)

2. Content Saved to Sanity
   └─> Sanity Content Lake

3. Webhook Triggered
   └─> Sanity → Netlify Build Hook

4. Automated Rebuild
   ├─> Netlify starts new build
   ├─> Fetch latest content from Sanity
   ├─> Generate updated static site
   └─> Deploy to CDN

5. Site Updated
   └─> New content live on afnizarnur.com
```

### Component Rendering Flow

```
Astro Components (.astro)
├─> Server-rendered by default (zero JS)
├─> Can include React components
└─> Output: Static HTML

React Components (.tsx)
├─> Rendered server-side during build
├─> Optional client hydration
│   ├─> client:load (immediate)
│   ├─> client:idle (when idle)
│   ├─> client:visible (when visible)
│   └─> client:media (responsive)
└─> Output: HTML + minimal JS
```

## Build Pipeline

### Development Mode

```
pnpm dev
├─> Turborepo: Run dev tasks in parallel
│   ├─> apps/web: astro dev (port 4321)
│   └─> apps/studio: sanity dev (port 3333)
│
├─> Hot Module Replacement (HMR)
│   ├─> File changes trigger instant updates
│   └─> No full page reload needed
│
└─> Watch Mode
    ├─> TypeScript type checking
    └─> Astro compilation
```

### Production Build

```
pnpm build
├─> Turborepo: Build dependency graph
│   ├─> Phase 1: Build shared packages
│   │   ├─> config-eslint
│   │   ├─> config-tailwind
│   │   ├─> config-typescript
│   │   └─> tokens
│   │
│   └─> Phase 2: Build applications
│       ├─> apps/web
│       │   ├─> astro check (type checking)
│       │   └─> astro build
│       │       ├─> Content fetching
│       │       ├─> Page generation
│       │       ├─> Asset optimization
│       │       └─> Output to dist/
│       │
│       └─> apps/studio
│           └─> sanity build
│               └─> Output to dist/
│
└─> Build Artifacts
    ├─> apps/web/dist/     (deployed to Netlify)
    └─> apps/studio/dist/  (deployed to Sanity)
```

### Cache Strategy

Turborepo caches build outputs based on:
- Source file contents (git hash)
- Dependencies in package.json
- Environment variables
- Configuration files

**Cache Locations:**
- Local: `.turbo/cache/`
- Remote: Configured via `turbo.json` (optional)

## Deployment Architecture

### Web App Deployment (Netlify)

```
GitHub Repository
├─> Push to main branch
│   └─> Triggers Netlify build
│
├─> Webhook from Sanity
│   └─> Triggers Netlify build
│
└─> Manual trigger
    └─> Netlify dashboard

Netlify Build Process
├─> Clone repository
├─> Install dependencies (pnpm install)
├─> Run build command
│   └─> pnpm turbo run build --filter=@afnizarnur/web
├─> Upload apps/web/dist/ to CDN
└─> Deploy to production URL
```

### Studio Deployment (Sanity)

```
Developer Machine
└─> pnpm --filter @afnizarnur/studio deploy
    ├─> Build studio (sanity build)
    ├─> Upload to Sanity hosting
    └─> Live at {studio-name}.sanity.studio
```

### Environment Separation

**Production:**
- Domain: afnizarnur.com
- Branch: main
- Dataset: production
- Content: Published content only

**Development:**
- Domain: localhost:4321
- Branch: Any
- Dataset: production (read-only)
- Content: Latest from Sanity

## Performance Considerations

### Build Performance

**Turborepo Optimizations:**
- Parallel task execution
- Incremental builds (only rebuild changed packages)
- Build artifact caching
- Smart hashing for cache invalidation

**Astro Optimizations:**
- Static site generation (no runtime overhead)
- Automatic code splitting
- Image optimization (Sharp)
- Minimal JavaScript by default

### Runtime Performance

**Static Site Benefits:**
- Instant page loads (pre-rendered HTML)
- CDN edge caching
- No database queries at runtime
- Predictable performance

**Content Delivery:**
- Sanity CDN for images and assets
- Netlify CDN for HTML/CSS/JS
- Global edge distribution
- Automatic compression (gzip/brotli)

## Security Architecture

### Content Security

- Content fetched at build time only
- No direct database exposure
- Sanity API tokens (read-only for builds)
- CORS policies enforced

### Deployment Security

- HTTPS enforced (Netlify certificate)
- Environment variables (secure storage)
- Build webhooks (authenticated)
- No secrets in client-side code

### Access Control

- Sanity Studio: Authentication required
- Netlify: Team-based access control
- GitHub: Repository permissions
- Build hooks: Secret tokens

## Monitoring & Observability

### Build Monitoring

- Netlify deploy logs
- Turborepo task timing
- Build success/failure notifications
- Deploy preview URLs

### Runtime Monitoring

- Netlify Analytics (optional)
- Core Web Vitals
- CDN cache hit rates
- Error tracking (future consideration)

## Scalability

### Content Scalability

- Sanity handles unlimited content
- Build time scales with content volume
- Incremental builds planned (future)
- Asset CDN auto-scales

### Traffic Scalability

- Static files = infinite scalability
- CDN handles traffic spikes
- No server load concerns
- Cost scales with bandwidth only

## Future Considerations

### Potential Enhancements

1. **Incremental Static Regeneration (ISR)**
   - Rebuild only changed pages
   - Faster build times with large content

2. **Edge Functions**
   - Dynamic personalization
   - A/B testing
   - Geolocation-based content

3. **Preview Mode**
   - Preview unpublished content
   - Draft content viewing
   - Editorial workflow

4. **Build Optimization**
   - Remote caching (Vercel/Nx Cloud)
   - Parallel builds across machines
   - Build time monitoring

5. **Performance Monitoring**
   - Real User Monitoring (RUM)
   - Synthetic monitoring
   - Core Web Vitals tracking

## Related Documentation

- [Deployment Guide](./deployment.md) - Detailed deployment instructions
- [Development Workflow](./development-workflow.md) - Daily development guide
- [Content Management](./content-management.md) - CMS usage guide
- [AGENTS.md](../AGENTS.md) - AI agent guidelines
- [CLAUDE.md](../CLAUDE.md) - Project development guidelines
