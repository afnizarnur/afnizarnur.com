# 2026 Improvement Plan for afnizarnur.com

## Executive Summary

This document outlines a comprehensive improvement plan for the afnizarnur.com portfolio, a Next.js 15 monorepo with React 19, Sanity CMS, and Turborepo. The plan focuses on enhancing code quality, testing, performance monitoring, accessibility, and developer experience while following modern web development best practices.

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
- No automated testing framework
- DRY violations (duplicated utility functions)
- Missing error boundaries and monitoring
- No sitemap/robots.txt generation
- Limited accessibility audit
- No performance monitoring (Web Vitals)

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
    // Send to error tracking service (Sentry, etc.)
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

### Phase 2: Testing Infrastructure

#### 2.1 Set Up Vitest for Unit Testing

**Best Practice Implementation**:
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['node_modules/', 'tests/'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './apps/site')
    }
  }
})
```

**Package.json Scripts**:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

---

#### 2.2 Set Up Playwright for E2E Testing

**Best Practice Implementation**:
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['json', { outputFile: 'test-results.json' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] } }
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  }
})
```

---

#### 2.3 Accessibility Testing with axe-core

**Best Practice Implementation**:
```typescript
// tests/e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const routes = ['/', '/work', '/blog', '/about']

routes.forEach(route => {
  test(`${route} should have no accessibility violations`, async ({ page }) => {
    await page.goto(route)
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })
})

test('theme toggle should be accessible', async ({ page }) => {
  await page.goto('/')

  // Test keyboard navigation
  await page.keyboard.press('Tab')
  const focusedElement = page.locator(':focus')
  await expect(focusedElement).toBeVisible()

  // Test skip link
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})
```

---

#### 2.4 Visual Regression Testing

**Best Practice Implementation**:
```typescript
// tests/e2e/visual.spec.ts
import { test, expect } from '@playwright/test'

const themes = ['light', 'dark']
const viewports = [
  { width: 375, height: 667, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1440, height: 900, name: 'desktop' }
]

themes.forEach(theme => {
  viewports.forEach(viewport => {
    test(`homepage ${theme} theme at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto('/')

      // Set theme
      await page.evaluate((t) => {
        document.documentElement.setAttribute('data-theme', t)
      }, theme)

      await expect(page).toHaveScreenshot(`home-${theme}-${viewport.name}.png`, {
        fullPage: true,
        animations: 'disabled'
      })
    })
  })
})
```

---

### Phase 3: Performance Monitoring

#### 3.1 Web Vitals Integration

**Best Practice Implementation**:
```typescript
// lib/analytics/web-vitals.ts
import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals'

type VitalsMetric = {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

function sendToAnalytics(metric: Metric) {
  const vitalsMetric: VitalsMetric = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id
  }

  // Send to your analytics endpoint
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/vitals', JSON.stringify(vitalsMetric))
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value, `(${metric.rating})`)
  }
}

export function initWebVitals() {
  onCLS(sendToAnalytics)
  onINP(sendToAnalytics)
  onLCP(sendToAnalytics)
  onFCP(sendToAnalytics)
  onTTFB(sendToAnalytics)
}
```

**Integration in Root Layout**:
```typescript
// app/layout.tsx
'use client'
import { useEffect } from 'react'
import { initWebVitals } from '@/lib/analytics/web-vitals'

export function WebVitalsReporter() {
  useEffect(() => {
    initWebVitals()
  }, [])
  return null
}
```

**Target Metrics**:
| Metric | Target | Current |
|--------|--------|---------|
| LCP | < 2.5s | Unknown |
| INP | < 200ms | Unknown |
| CLS | < 0.1 | Unknown |
| FCP | < 1.8s | Unknown |
| TTFB | < 800ms | Unknown |

---

#### 3.2 Error Tracking with Sentry

**Best Practice Implementation**:
```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true
    })
  ]
})
```

**Sentry Config Files**:
```javascript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  debug: false
})

// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1
})
```

---

#### 3.3 Bundle Analysis

**Best Practice Implementation**:
```javascript
// next.config.ts additions
import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

export default bundleAnalyzer(nextConfig)
```

**Package.json Script**:
```json
{
  "scripts": {
    "analyze": "ANALYZE=true pnpm build"
  }
}
```

---

### Phase 4: SEO & Discoverability

#### 4.1 Sitemap Generation

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

#### 4.2 Robots.txt

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

#### 4.3 JSON-LD Structured Data

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

### Phase 5: Accessibility Audit & Fixes

#### 5.1 Focus Management for Mobile Menu

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

#### 5.2 Keyboard Navigation for Draggable Widgets

**Best Practice Implementation**:
```typescript
// hooks/useKeyboardDrag.ts
import { useState, useCallback } from 'react'

interface Position { x: number; y: number }

export function useKeyboardDrag(initialPosition: Position, step = 10) {
  const [position, setPosition] = useState(initialPosition)

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const moves: Record<string, Partial<Position>> = {
      ArrowUp: { y: -step },
      ArrowDown: { y: step },
      ArrowLeft: { x: -step },
      ArrowRight: { x: step }
    }

    const move = moves[e.key]
    if (move) {
      e.preventDefault()
      setPosition(prev => ({
        x: prev.x + (move.x || 0),
        y: prev.y + (move.y || 0)
      }))
    }
  }, [step])

  return { position, setPosition, handleKeyDown }
}
```

---

#### 5.3 ARIA Live Regions for Dynamic Content

**Best Practice Implementation**:
```typescript
// components/LiveRegion/LiveRegion.tsx
interface LiveRegionProps {
  message: string
  politeness?: 'polite' | 'assertive'
}

export function LiveRegion({ message, politeness = 'polite' }: LiveRegionProps) {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}

// Usage in CurrentActivity
<LiveRegion
  message={`Now playing: ${track.name} by ${track.artist}`}
/>
```

---

### Phase 6: Security Enhancements

#### 6.1 API Rate Limiting

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

#### 6.2 Content Security Policy

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

### Phase 7: Developer Experience

#### 7.1 Fix Netlify Build Configuration

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

#### 7.2 Component Documentation with Storybook

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

#### 7.3 Git Hooks with Husky

**Best Practice Implementation**:
```json
// package.json additions
{
  "scripts": {
    "prepare": "husky install",
    "lint": "biome check .",
    "lint:fix": "biome check --apply .",
    "type-check": "tsc --noEmit"
  },
  "lint-staged": {
    "*.{ts,tsx}": ["biome check --apply", "biome format --write"],
    "*.{json,md}": ["biome format --write"]
  }
}
```

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm lint-staged

# .husky/pre-push
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm type-check
pnpm test
```

---

### Phase 8: Content Features

#### 8.1 Blog Tag Filtering

**Current Issue**: Tag queries exist but no tag-based filtering UI.

**Best Practice Implementation**:
```typescript
// app/blog/tag/[tag]/page.tsx
import { sanityFetch } from '@/lib/sanity/fetch'
import { postsByTagQuery } from '@/lib/sanity/queries'
import { PostCard } from '@/components/PostCard'

interface Props {
  params: { tag: string }
}

export default async function TagPage({ params }: Props) {
  const posts = await sanityFetch({
    query: postsByTagQuery,
    params: { tag: params.tag }
  })

  return (
    <main>
      <h1>Posts tagged with "{params.tag}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  )
}
```

---

#### 8.2 Search Functionality

**Best Practice Implementation**:
```typescript
// app/api/search/route.ts
import { sanityFetch } from '@/lib/sanity/fetch'

const searchQuery = `
  *[_type in ["post", "project"] && (
    title match $query ||
    excerpt match $query ||
    body[].children[].text match $query
  )] | order(_createdAt desc) [0...20] {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt
  }
`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.length < 2) {
    return Response.json({ results: [] })
  }

  const results = await sanityFetch({
    query: searchQuery,
    params: { query: `*${query}*` }
  })

  return Response.json({ results })
}
```

---

## Implementation Checklist

### Phase 1: Code Quality & DRY Fixes
- [ ] Extract `getFormattedTime()` to shared utility
- [ ] Create centralized constants file
- [ ] Implement ErrorBoundary component
- [ ] Split HorizontalHeader into smaller components
- [ ] Remove console.error calls, add structured logging

### Phase 2: Testing Infrastructure
- [ ] Set up Vitest configuration
- [ ] Create test utilities and mocks
- [ ] Set up Playwright for E2E
- [ ] Add accessibility tests with axe-core
- [ ] Add visual regression tests
- [ ] Achieve 70% code coverage

### Phase 3: Performance Monitoring
- [ ] Integrate web-vitals library
- [ ] Create analytics endpoint
- [ ] Set up Sentry error tracking
- [ ] Add bundle analyzer
- [ ] Establish performance budgets

### Phase 4: SEO & Discoverability
- [ ] Implement dynamic sitemap.ts
- [ ] Add robots.ts
- [ ] Create JSON-LD schemas (Person, Article, Project)
- [ ] Add dynamic OG images per page

### Phase 5: Accessibility Audit & Fixes
- [ ] Implement focus trap for mobile menu
- [ ] Add keyboard navigation for draggable widgets
- [ ] Add ARIA live regions for dynamic content
- [ ] Audit color contrast for all themes
- [ ] Verify heading hierarchy

### Phase 6: Security Enhancements
- [ ] Implement API rate limiting
- [ ] Add Content Security Policy middleware
- [ ] Validate all query parameters
- [ ] Add request validation schemas

### Phase 7: Developer Experience
- [ ] Fix Netlify build configuration
- [ ] Set up Storybook
- [ ] Configure Husky pre-commit hooks
- [ ] Add lint-staged
- [ ] Create CONTRIBUTING.md

### Phase 8: Content Features
- [ ] Implement tag filtering pages
- [ ] Add search functionality
- [ ] Create related content suggestions
- [ ] Add reading time estimates

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
| Test Coverage | 0% | > 70% |
| Accessibility Violations | Unknown | 0 |
| Bundle Size (JS) | Unknown | < 200KB gzipped |

---

## Conclusion

This improvement plan transforms the afnizarnur.com Next.js 15 portfolio into a robust, well-tested, and performant platform. The phased approach ensures incremental improvements without disrupting existing functionality.

**Key priorities**:
1. Testing infrastructure (foundation for all other improvements)
2. Code quality fixes (DRY, error boundaries)
3. Performance monitoring (visibility into real-world metrics)
4. SEO enhancements (discoverability)
5. Accessibility compliance (inclusive design)

Each phase builds upon the previous, creating a sustainable development workflow that maintains code quality as the project grows.

---

*Document Version: 1.0*
*Created: November 2024*
*For: afnizarnur.com 2026 (Next.js 15 Monorepo)*
