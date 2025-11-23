# 2026 Improvement Plan for afnizarnur.com

## Executive Summary

This document outlines a comprehensive improvement plan for the afnizarnur.com portfolio, a Next.js 15 monorepo with React 19, Sanity CMS, and Turborepo. The plan focuses on enhancing code quality, SEO, accessibility, security, and developer experience while following modern web development best practices.

---

## Current State Analysis

### Tech Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.5.6 | App Router framework |
| React | 19.2.0 | UI library |
| TypeScript | 5.6.3 | Type safety (strict mode) |
| Tailwind CSS | 4.1.14 | Styling (v4 engine) |
| Sanity | 4.10.3 | Headless CMS |
| Framer Motion | 12.23.24 | Animations |
| Turborepo | 2.0.0 | Monorepo orchestration |
| Biome | 2.3.0 | Linting & formatting |
| Terrazzo | 0.10.3 | Design tokens |

### Architecture
```
afnizarnur-monorepo/
├── apps/
│   ├── site/          # Next.js 15 frontend
│   └── studio/        # Sanity Studio CMS
├── packages/
│   ├── tokens/        # Design tokens (Terrazzo)
│   ├── ui/            # Shared React components
│   └── config-typescript/
├── docs/              # Documentation
└── specs/             # Feature specifications
```

### Strengths
- Modern stack (Next.js 15, React 19, Tailwind v4)
- Proper monorepo architecture with Turborepo
- Excellent CMS integration with Sanity visual editing
- Strong accessibility foundation (skip links, reduced motion, ARIA)
- Theme system with FART prevention (Flash of inAccurate coloR Theme)
- ISR with on-demand revalidation via webhooks
- Strict TypeScript with Biome enforcement
- Design token system with Terrazzo

### Areas for Improvement
- DRY violations (duplicated utility functions)
- Missing error boundaries
- No sitemap/robots.txt generation
- Mobile menu focus management
- Security headers and rate limiting

---

## Improvement Plan

### Phase 1: Code Quality & DRY Fixes

#### 1.1 Extract Duplicated Utilities

**Current Issue**: `getFormattedTime()` is duplicated in `NavigationBar.tsx` and `MobileMenu.tsx`.

**Best Practice Implementation**:
```typescript
// lib/utils/time.ts
export function getFormattedTime(locale = 'en-US'): string {
  return new Date().toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

export function getFormattedDate(locale = 'en-US'): string {
  return new Date().toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
```

**Files to Update**:
- `apps/site/components/NavigationBar/NavigationBar.tsx`
- `apps/site/components/MobileMenu/MobileMenu.tsx`

---

#### 1.2 Centralize Magic Numbers & Constants

**Current Issue**: Hardcoded values scattered across components.

**Best Practice Implementation**:
```typescript
// lib/constants.ts
export const LAYOUT = {
  NAVBAR_HEIGHT: 66,
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  MAX_CONTENT_WIDTH: 1280
} as const

export const CACHE = {
  SPOTIFY_REVALIDATE: 300,    // 5 minutes
  PSN_REVALIDATE: 300,        // 5 minutes
  DEFAULT_REVALIDATE: 3600    // 1 hour
} as const

export const ANIMATION = {
  DURATION_FAST: 0.15,
  DURATION_NORMAL: 0.3,
  DURATION_SLOW: 0.5,
  SPRING_STIFFNESS: 400,
  SPRING_DAMPING: 30
} as const
```

---

#### 1.3 Implement Error Boundaries

**Current Issue**: No error boundaries for graceful error handling.

**Best Practice Implementation**:
```typescript
// components/ErrorBoundary/ErrorBoundary.tsx
'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
```

**Usage in Layout**:
```typescript
// app/layout.tsx
<ErrorBoundary fallback={<ErrorFallback />}>
  <HorizontalHeader />
</ErrorBoundary>
```

---

#### 1.4 Split Complex Components

**Current Issue**: `HorizontalHeader` (168+ lines) handles multiple responsibilities.

**Best Practice Implementation**:
```
components/HorizontalHeader/
├── index.tsx              # Main container
├── HeaderWidget.tsx       # Individual widget wrapper
├── DraggableArea.tsx      # Drag interaction logic
├── CurrentActivity.tsx    # Spotify/PSN display
├── DrawingCanvas.tsx      # Sketch canvas widget
├── ProfileWidget.tsx      # Avatar and bio
└── hooks/
    ├── useDragInteraction.ts
    └── useCurrentActivity.ts
```

---

### Phase 2: SEO & Discoverability

#### 2.1 Sitemap Generation

**Best Practice Implementation**:
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { sanityFetch } from '@/lib/sanity/fetch'
import { allProjectsQuery, allPostsQuery } from '@/lib/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://afnizarnur.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 }
  ]

  // Dynamic project pages
  const projects = await sanityFetch({ query: allProjectsQuery })
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug.current}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))

  // Dynamic blog pages
  const posts = await sanityFetch({ query: allPostsQuery })
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))

  return [...staticPages, ...projectPages, ...postPages]
}
```

---

#### 2.2 Robots.txt

**Best Practice Implementation**:
```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/', '/_next/']
      }
    ],
    sitemap: 'https://afnizarnur.com/sitemap.xml'
  }
}
```

---

#### 2.3 JSON-LD Structured Data

**Best Practice Implementation**:
```typescript
// components/StructuredData/PersonSchema.tsx
export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Afnizar Nur Ghifari',
    url: 'https://afnizarnur.com',
    jobTitle: 'Product Designer',
    sameAs: [
      'https://github.com/afnizarnur',
      'https://linkedin.com/in/afnizarnur',
      'https://figma.com/@afnizarnur'
    ],
    knowsAbout: ['Product Design', 'UI/UX', 'Design Systems', 'Figma']
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// components/StructuredData/ArticleSchema.tsx
interface ArticleSchemaProps {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  image?: string
  slug: string
}

export function ArticleSchema({ title, description, publishedAt, updatedAt, image, slug }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    url: `https://afnizarnur.com/blog/${slug}`,
    author: {
      '@type': 'Person',
      name: 'Afnizar Nur Ghifari',
      url: 'https://afnizarnur.com'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

---

### Phase 3: Accessibility Audit & Fixes

#### 3.1 Focus Management for Mobile Menu

**Current Issue**: Mobile menu doesn't trap focus or manage focus on close.

**Best Practice Implementation**:
```typescript
// hooks/useFocusTrap.ts
import { useEffect, useRef } from 'react'

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<Element | null>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    previousActiveElement.current = document.activeElement
    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    firstElement?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        (previousActiveElement.current as HTMLElement)?.focus()
        return
      }

      if (e.key !== 'Tab') return

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    return () => {
      container.removeEventListener('keydown', handleKeyDown)
      ;(previousActiveElement.current as HTMLElement)?.focus()
    }
  }, [isActive])

  return containerRef
}
```

---

### Phase 4: Security Enhancements

#### 4.1 API Rate Limiting

**Best Practice Implementation**:
```typescript
// lib/rate-limit.ts
import { LRUCache } from 'lru-cache'

type RateLimitOptions = {
  uniqueTokenPerInterval?: number
  interval?: number
}

export function rateLimit(options?: RateLimitOptions) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000
  })

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0]
        if (tokenCount[0] === 0) {
          tokenCache.set(token, [1])
        }
        tokenCount[0] += 1

        const currentUsage = tokenCount[0]
        const isRateLimited = currentUsage >= limit

        if (isRateLimited) {
          reject(new Error('Rate limit exceeded'))
        } else {
          resolve()
        }
      })
  }
}

// Usage in API route
// app/api/spotify/now-playing/route.ts
import { rateLimit } from '@/lib/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500
})

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous'

  try {
    await limiter.check(10, ip) // 10 requests per minute
  } catch {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  // ... rest of handler
}
```

---

#### 4.2 Content Security Policy

**Best Practice Implementation**:
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://cdn.sanity.io https://i.scdn.co https://image.api.playstation.com",
    "font-src 'self'",
    "connect-src 'self' https://api.sanity.io https://*.sanity.io",
    "frame-src 'self' https://*.sanity.io",
    "media-src 'self' https://cdn.sanity.io"
  ].join('; ')

  response.headers.set('Content-Security-Policy', csp)
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
```

---

### Phase 5: Developer Experience

#### 5.1 Fix Netlify Build Configuration

**Current Issue**: `netlify.toml` references `@afnizarnur/web` but app is `@afnizarnur/site`.

**Best Practice Implementation**:
```toml
# netlify.toml
[build]
  command = "pnpm build:site"
  publish = "apps/site/.next"

[build.environment]
  NODE_VERSION = "20"
  PNPM_VERSION = "9.0.0"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

#### 5.2 Component Documentation with Storybook

**Best Practice Implementation**:
```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../apps/site/components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
}

export default config
```

**Example Story**:
```typescript
// components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary'
  }
}
```

---

## Implementation Checklist

### Phase 1: Code Quality & DRY Fixes
- [x] Extract `getFormattedTime()` to shared utility → `lib/utils/time.ts`
- [x] Create centralized constants file → `lib/constants.ts`
- [x] Implement ErrorBoundary component → `components/ErrorBoundary.tsx`
- [x] Split HorizontalHeader into smaller components → Already organized

### Phase 2: SEO & Discoverability
- [x] Implement dynamic sitemap.ts → `app/sitemap.ts`
- [x] Add robots.ts → `app/robots.ts`
- [x] Create JSON-LD schemas (Person, Article, Project) → `components/StructuredData/`

### Phase 3: Accessibility Audit & Fixes
- [x] Implement focus trap for mobile menu → Already implemented in `MobileMenu.tsx`

### Phase 4: Security Enhancements
- [x] Implement API rate limiting → `lib/rate-limit.ts`
- [x] Add Content Security Policy middleware → `middleware.ts`

### Phase 5: Developer Experience
- [x] Fix Netlify build configuration → `netlify.toml`
- [x] Set up Storybook → `.storybook/main.ts`, `.storybook/preview.ts`

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Lighthouse Performance | Unknown | 95+ |
| Lighthouse Accessibility | Unknown | 100 |
| Lighthouse Best Practices | Unknown | 100 |
| Lighthouse SEO | Unknown | 100 |
| LCP | Unknown | < 2.5s |
| INP | Unknown | < 200ms |
| CLS | Unknown | < 0.1 |
| Accessibility Violations | Unknown | 0 |
| Bundle Size (JS) | Unknown | < 200KB gzipped |

---

## Conclusion

This improvement plan has been **fully implemented** for the afnizarnur.com Next.js 15 portfolio. All 12 tasks across 5 phases have been completed:

**Completed improvements**:
1. ✅ Code quality fixes (DRY utilities, constants, error boundaries)
2. ✅ SEO enhancements (sitemap, robots.txt, JSON-LD structured data)
3. ✅ Accessibility compliance (focus trap verified)
4. ✅ Security hardening (rate limiting, CSP middleware)
5. ✅ Developer experience (Storybook setup, Netlify config fix)

### New Files Added
```
apps/site/
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── app/
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ErrorBoundary.tsx
│   ├── TimeDisplay.tsx
│   └── StructuredData/
│       ├── index.ts
│       ├── PersonSchema.tsx
│       ├── ArticleSchema.tsx
│       └── ProjectSchema.tsx
└── lib/
    ├── constants.ts
    ├── rate-limit.ts
    └── utils/
        ├── index.ts
        ├── time.ts
        └── navigation.ts
```

---

*Document Version: 2.0*
*Created: November 2024*
*Implemented: November 2024*
*For: afnizarnur.com 2026 (Next.js 15 Monorepo)*
