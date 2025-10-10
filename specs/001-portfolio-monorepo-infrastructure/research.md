# Research: Portfolio Monorepo Infrastructure

**Feature**: Portfolio Monorepo Infrastructure
**Date**: 2025-10-10
**Purpose**: Document technology decisions, best practices, and architectural patterns for monorepo implementation

## Technology Decisions

### 1. Monorepo Management: Turborepo + pnpm

**Decision**: Use Turborepo 2.x for task orchestration with pnpm 9.x for package management

**Rationale**:
- **Turborepo** provides intelligent caching and parallel execution for build tasks across workspaces
- **pnpm** offers efficient disk space usage through hard-linked node_modules and fast install times
- Both are industry-standard tools with strong TypeScript support and active maintenance
- Turborepo's `dependsOn` graph aligns with our strict build order requirements (config → tokens → ui → apps)
- pnpm workspaces integrate seamlessly with Turborepo's workspace detection

**Alternatives Considered**:
- **Nx**: More feature-rich but adds complexity we don't need (e.g., code generation, project graph visualization)
- **Lerna**: Primarily for package publishing; lacks modern task orchestration features
- **npm/yarn workspaces alone**: No built-in task caching or parallel execution optimization

**Best Practices**:
- Define pipeline tasks in `turbo.json` with explicit `dependsOn` relationships
- Use `pnpm-workspace.yaml` to declare workspace packages
- Enable Turborepo caching for deterministic tasks (build, typecheck, lint)
- Use `--filter` flag for targeted workspace operations during development

**References**:
- Turborepo docs: https://turbo.build/repo/docs
- pnpm workspaces: https://pnpm.io/workspaces

---

### 2. Frontend Framework: Astro 4.x

**Decision**: Use Astro 4.x as the primary framework for the web application

**Rationale**:
- **Content-first architecture**: Astro is purpose-built for content-heavy sites (blogs, portfolios)
- **Islands architecture**: Enables selective hydration for interactive components while keeping most content static
- **Zero JS by default**: Pages are rendered as static HTML; JavaScript only loaded for interactive "islands"
- **Framework-agnostic**: Can use React components from `@afnizarnur/ui` via `@astrojs/react` integration
- **Built-in optimizations**: Image optimization, automatic code splitting, CSS scoping
- **File-based routing**: Intuitive page structure matches URL paths

**Alternatives Considered**:
- **Next.js**: Excellent framework but overkill for a static portfolio; App Router complexity not needed
- **Gatsby**: Similar static site generation but heavier runtime and more complex plugin ecosystem
- **Pure React SPA**: Would require client-side data fetching and sacrifice performance

**Best Practices**:
- Use `.astro` components for static content (layouts, pages)
- Import React components only when interactivity is needed
- Leverage `client:load` for immediately visible interactive content
- Use `client:visible` for below-fold interactive components
- Fetch all data at build time using GROQ queries in Astro pages
- Use `getStaticPaths()` for dynamic routes (blog posts, projects)

**References**:
- Astro docs: https://docs.astro.build
- Astro Islands: https://docs.astro.build/en/concepts/islands/

---

### 3. Content Management: Sanity v4

**Decision**: Use Sanity v4 as the headless CMS

**Rationale**:
- **Structured content**: Schema-driven content modeling ensures data consistency
- **Developer experience**: TypeScript support, GROQ query language, real-time collaboration
- **Portable Text**: Rich text format that can be rendered across platforms
- **Asset pipeline**: Built-in image CDN with on-the-fly transformations
- **Customizable Studio**: React-based editor can be extended with custom components
- **Free tier**: Sufficient for personal portfolio (generous limits on documents and assets)

**Alternatives Considered**:
- **Contentful**: More expensive, less developer-friendly for custom schemas
- **Strapi**: Self-hosted option adds infrastructure complexity
- **Markdown files in repo**: Simple but lacks non-technical user interface and asset management

**Best Practices**:
- Define schemas in TypeScript for type safety
- Use `@sanity/client` for data fetching (not Sanity Fetch which adds client-side overhead)
- Implement validation rules in schemas to prevent incomplete content
- Use slug fields with unique validation for URL-friendly identifiers
- Set up singleton schemas for global data (siteSettings, navigation)
- Use references for relationships (e.g., linking projects to tags)

**References**:
- Sanity v4 docs: https://www.sanity.io/docs
- GROQ query language: https://www.sanity.io/docs/groq

---

### 4. Design Token System: Terrazzo

**Decision**: Use Terrazzo for design token generation and transformation

**Rationale**:
- **Standards-based**: Implements W3C Design Token Community Group specification
- **Multi-platform output**: Can generate CSS variables, JavaScript objects, Tailwind themes, and more
- **Type-safe**: Generates TypeScript definitions for tokens
- **Build-time transformation**: Tokens are static assets, no runtime overhead
- **Extensible**: Plugin system for custom transformations

**Alternatives Considered**:
- **Style Dictionary**: More mature but configuration is more verbose for simple use cases
- **Manual tokens**: Hard to maintain consistency across formats (CSS vars, Tailwind, TypeScript)
- **Tailwind config only**: Lacks semantic naming and cross-platform export capabilities

**Best Practices**:
- Define tokens in JSON format with semantic naming (`color.primary.500` not `blue.500`)
- Generate both CSS custom properties (for browser support) and Tailwind theme (for utility classes)
- Use composite tokens for component-specific values (e.g., `button.padding` references spacing tokens)
- Version the token package independently to track design system changes
- Build tokens package before any consuming packages (enforced via Turborepo)

**References**:
- Terrazzo docs: https://terrazzo.app
- Design Tokens spec: https://design-tokens.github.io/community-group/format/

---

### 5. Component Library: React 18.x + shadcn/ui (optional)

**Decision**: Build custom React components in `@afnizarnur/ui`, optionally using shadcn/ui primitives in `@afnizarnur/ui-primitives`

**Rationale**:
- **React 18**: Industry standard with excellent TypeScript support and ecosystem
- **shadcn/ui approach**: Copy-paste primitives (not a dependency) provide accessible base components
- **Full customization**: Components can be styled with design tokens via Tailwind
- **Astro compatibility**: React components can be used as Astro islands
- **No runtime library dependency**: shadcn components are source code, not npm packages

**Alternatives Considered**:
- **Preact**: Lighter weight but smaller ecosystem
- **Solid**: Excellent performance but less mature tooling
- **Web Components**: Framework-agnostic but styling and SSR support is complex

**Best Practices**:
- Use TypeScript for all component props with explicit interfaces
- Export components from `src/index.ts` with named exports
- Use Tailwind classes that reference design tokens (e.g., `bg-primary-500`)
- Keep components simple and composable (single responsibility)
- Document component APIs with JSDoc comments
- Avoid component state when possible (prefer server-rendered content)

**References**:
- shadcn/ui: https://ui.shadcn.com
- React docs: https://react.dev

---

### 6. Deployment: Netlify

**Decision**: Deploy to Netlify with `@astrojs/netlify` adapter

**Rationale**:
- **Zero-config for static sites**: Astro static builds deploy without configuration
- **Preview deployments**: Automatic preview URLs for pull requests
- **Webhook support**: Can trigger rebuilds from Sanity content changes
- **CDN performance**: Global edge network for fast content delivery
- **Free tier**: Sufficient for personal portfolio traffic
- **Build minutes**: Generous limits for small projects

**Alternatives Considered**:
- **Vercel**: Excellent option but optimized for Next.js; Netlify has better Astro ecosystem support
- **Cloudflare Pages**: Good performance but less mature build pipeline
- **Self-hosted**: Adds infrastructure complexity (server management, SSL, CDN setup)

**Best Practices**:
- Use `@astrojs/netlify` adapter for Netlify-specific optimizations
- Set build command to `pnpm build` and publish directory to `apps/web/dist`
- Configure environment variables for Sanity project ID and dataset
- Set up Sanity webhook to POST to Netlify build hook URL on content publish
- Use Netlify's branch deploys for preview environments
- Enable asset optimization (minification, compression) in Netlify settings

**References**:
- Netlify docs: https://docs.netlify.com
- Astro Netlify adapter: https://docs.astro.build/en/guides/deploy/netlify/

---

### 7. Version Management: Changesets

**Decision**: Use Changesets for internal package versioning and changelog generation

**Rationale**:
- **Semantic versioning**: Enforces proper version bumps based on change type
- **Changelog automation**: Generates changelogs from changeset descriptions
- **Monorepo-aware**: Handles dependencies between internal packages
- **Git-based workflow**: Integrates with PRs and commit history
- **No accidental publishes**: Requires explicit changeset creation

**Alternatives Considered**:
- **Lerna**: Older approach, less modern workflow
- **Manual versioning**: Error-prone and lacks automation
- **Semantic Release**: More opinionated, requires conventional commits

**Best Practices**:
- Run `pnpm changeset` when making changes to packages
- Include clear descriptions in changesets (they become changelog entries)
- Run `pnpm changeset version` to bump versions before release
- Use `pnpm changeset publish` to publish updated packages
- Commit changeset files with the changes they describe

**References**:
- Changesets docs: https://github.com/changesets/changesets

---

### 8. CI/CD: GitHub Actions

**Decision**: Use GitHub Actions for continuous integration and quality gates

**Rationale**:
- **Native GitHub integration**: No third-party service needed
- **Free for public repos**: Zero cost for open source
- **Concurrent jobs**: Can run lint, typecheck, build in parallel
- **Turborepo caching**: GitHub Actions cache can store Turborepo cache
- **Matrix builds**: Can test across multiple Node versions if needed

**Alternatives Considered**:
- **CircleCI**: Good option but adds account complexity
- **Travis CI**: Less modern, declining ecosystem support
- **Jenkins**: Self-hosted adds infrastructure burden

**Best Practices**:
- Run on pull requests to `main` branch
- Use actions/checkout@v4 and actions/setup-node@v4
- Cache pnpm store with actions/cache
- Run `pnpm turbo run lint typecheck build` to verify all gates
- Fail PR if any check fails
- Use matrix strategy if testing multiple Node versions

**References**:
- GitHub Actions docs: https://docs.github.com/en/actions

---

## Architectural Patterns

### Build Order Dependency Graph

```
┌─────────────────────────┐
│  config-eslint          │ (no dependencies)
│  config-typescript      │
│  config-tailwind        │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  tokens                 │ (depends on configs)
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  ui-primitives          │ (depends on tokens, configs)
│  ui                     │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  web (Astro app)        │ (depends on tokens, ui)
│  studio (Sanity)        │ (minimal dependencies)
└─────────────────────────┘
```

### Content Data Flow

```
┌──────────────┐
│ Sanity Studio│  ← Content author creates/edits content
│  (apps/studio) │
└───────┬──────┘
        │
        │ (webhook on publish)
        │
        ▼
┌──────────────┐
│ Netlify Build│  ← Triggered automatically
└───────┬──────┘
        │
        │ (build-time GROQ queries)
        │
        ▼
┌──────────────┐
│ Sanity API   │  ← Fetch all content
└───────┬──────┘
        │
        │ (SSG via Astro)
        │
        ▼
┌──────────────┐
│ Static HTML  │  ← Deployed to CDN
│  (apps/web/dist) │
└──────────────┘
```

### Design Token Flow

```
┌──────────────────┐
│ tokens/src/      │
│ tokens.json      │  ← Define design decisions
└────────┬─────────┘
         │
         │ (Terrazzo build)
         │
         ▼
┌──────────────────┐
│ tokens/dist/     │
│ - tokens.css     │  ← CSS custom properties
│ - tailwind.cjs   │  ← Tailwind theme object
│ - types.ts       │  ← TypeScript definitions
└────────┬─────────┘
         │
         ├──────────────────┬──────────────────┐
         │                  │                  │
         ▼                  ▼                  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ ui/          │   │ web/         │   │ (future apps)│
│ components   │   │ tailwind.config │   │              │
└──────────────┘   └──────────────┘   └──────────────┘
```

---

## Integration Patterns

### Astro + React Islands

**Pattern**: Use Astro components for static content, React components for interactivity

**Example**:
```astro
---
// src/pages/blog/[slug].astro
import { Navbar } from '@afnizarnur/ui'
import BaseLayout from '../../layouts/BaseLayout.astro'
import { getPost } from '../../server/data'

const { slug } = Astro.params
const post = await getPost(slug)
---

<BaseLayout title={post.title}>
  <!-- Static Astro component -->
  <article class="prose">
    <h1>{post.title}</h1>
    <div set:html={post.body} />
  </article>

  <!-- Interactive React island (only if needed) -->
  <Navbar client:load />
</BaseLayout>
```

### Sanity → Astro Data Fetching

**Pattern**: Build-time GROQ queries using `@sanity/client`

**Example**:
```typescript
// apps/web/src/server/data.ts
import { sanity } from './sanity'

export async function getAllPosts() {
  return sanity.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "coverImage": coverImage.asset->url
    }
  `)
}

export async function getPost(slug: string) {
  return sanity.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      publishedAt,
      body,
      tags[]->{ title, "slug": slug.current }
    }
  `, { slug })
}
```

### Shared Config Pattern

**Pattern**: Extend base configurations from shared packages

**Example**:
```json
// apps/web/tsconfig.json
{
  "extends": "@afnizarnur/config-typescript/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

---

## Performance Optimization Strategies

### 1. Static Site Generation (SSG)
- All content pages pre-rendered at build time
- No client-side data fetching or loading states
- Instant page loads (just HTML/CSS, minimal JS)

### 2. Selective Hydration
- Use `client:load` only for above-fold interactive components
- Use `client:visible` for below-fold components (lazy load on scroll)
- Use `client:idle` for non-critical interactive elements

### 3. Image Optimization
- Sanity image CDN provides automatic format conversion (WebP/AVIF)
- Use Sanity image URLs with query parameters for responsive sizes
- Astro Image component generates srcset for responsive images
- Lazy load images below the fold

### 4. Code Splitting
- Astro automatically code-splits by route
- Each page gets its own bundle
- Shared dependencies extracted to common chunks

### 5. CSS Optimization
- Tailwind purges unused utility classes in production
- Critical CSS inlined in `<head>`
- Non-critical CSS loaded asynchronously

---

## Security Considerations

### 1. Content Security Policy (CSP)
- Configure CSP headers in Netlify to prevent XSS attacks
- Whitelist Sanity CDN for images

### 2. Environment Variables
- Store Sanity project ID and dataset in Netlify environment variables
- Use public dataset for read-only content access
- Keep Sanity API tokens out of client-side code

### 3. Input Validation
- Sanity schemas validate content structure before publish
- GROQ query parameters are sanitized by Sanity client

### 4. Dependency Security
- Use `pnpm audit` to check for vulnerable dependencies
- Enable Dependabot in GitHub for automated security updates

---

## Development Workflow

### Local Development
1. `pnpm install` - Install all dependencies
2. `pnpm turbo run build --filter=@afnizarnur/tokens` - Build tokens first
3. `pnpm dev` - Start all dev servers (Astro + Sanity Studio)

### Making Changes to Packages
1. Make changes to package code
2. `pnpm build --filter=@afnizarnur/package-name` - Build specific package
3. Consuming apps will automatically pick up changes (via workspace protocol)

### Releasing Package Updates
1. `pnpm changeset` - Create changeset describing changes
2. `pnpm changeset version` - Bump versions based on changesets
3. `pnpm install` - Update lockfile with new versions
4. `pnpm build` - Ensure all packages build
5. Commit changes and push

### Deployment
1. Push to GitHub
2. Netlify automatically builds and deploys
3. Or manually trigger build via Netlify webhook from Sanity

---

## Testing Strategy

### Build Validation
- `pnpm turbo run build` must pass across all workspaces
- No TypeScript errors or build warnings allowed

### Type Safety
- `pnpm turbo run typecheck` enforces strict TypeScript
- All Sanity data must be typed (use GROQ-generated types or manual interfaces)

### Linting
- `pnpm turbo run lint` enforces code style consistency
- ESLint rules from `@afnizarnur/config-eslint`

### Manual Testing Checklist
- Visual regression at 375px, 768px, 1440px breakpoints
- Test navigation flows (homepage → blog → post → back)
- Test all content types render correctly from Sanity
- Keyboard navigation works (tab through links, forms)
- Screen reader announces content correctly
- Test in Chrome, Firefox, Safari

### Performance Testing
- Run Lighthouse on production build
- Verify Core Web Vitals (LCP, CLS, TBT)
- Check bundle sizes don't exceed budgets

---

## Future Considerations

### Potential Enhancements
- Add `apps/experiments` for Three.js/WebGL demos
- Add `apps/docs` for technical writing
- Export tokens to iOS/Android via Terrazzo plugins
- Add visual regression testing with Playwright
- Integrate analytics (Plausible, Fathom)
- Add search functionality (Algolia, Pagefind)

### Scalability
- Current architecture supports adding new apps without restructuring
- Token system can expand to support theming (light/dark mode)
- Component library can grow with new primitives as needed
- Monorepo structure supports 10+ packages without performance degradation

---

## References

### Documentation
- [Turborepo Handbook](https://turbo.build/repo/docs/handbook)
- [pnpm Monorepo Guide](https://pnpm.io/workspaces)
- [Astro Documentation](https://docs.astro.build)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Terrazzo Documentation](https://terrazzo.app/docs)

### Community Resources
- [Astro Discord](https://astro.build/chat)
- [Sanity Slack](https://slack.sanity.io)
- [Turborepo Community](https://github.com/vercel/turbo/discussions)

### Example Repositories
- [Astro + Sanity Starter](https://github.com/sanity-io/sanity-template-astro-clean)
- [Turborepo Design System Example](https://github.com/vercel/turbo/tree/main/examples/design-system)
