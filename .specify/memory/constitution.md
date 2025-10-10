<!--
Sync Impact Report - Version 1.0.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Version Change: Initial → 1.0.0 (MAJOR: Initial constitution ratification)

Context: Created for greenfield monorepo rebuild (see docs/prd/prd-infrastructure.md)

Principles Added:
  - I. Code Quality & Maintainability
  - II. Testing & Validation Standards
  - III. User Experience Consistency
  - IV. Performance Requirements

Sections Added:
  - Core Principles
  - Monorepo Development Standards
  - Quality Gates
  - Governance

Templates Requiring Updates:
  ✅ plan-template.md - Updated Constitution Check with monorepo-specific compliance (10 gates, package deps, Turborepo)
  ✅ spec-template.md - Added Constitutional Compliance section with monorepo performance/build criteria
  ✅ tasks-template.md - Added Phase FINAL with all 10 constitutional quality gates + feature-specific gates
  ✅ checklist-template.md - Generic template, no updates needed
  ✅ agent-file-template.md - Generic template, no agent-specific references

Follow-up TODOs:
  - None; all placeholders filled
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-->

# afnizarnur.com Constitution

## Core Principles

### I. Code Quality & Maintainability

Every package, component, and module MUST adhere to clean code principles that ensure long-term maintainability in a monorepo environment.

**Non-Negotiable Rules**:
- **Packages MUST be independently buildable** - Each workspace package (`@afnizarnur/*`) must build in isolation
- **Explicit dependencies only** - Internal dependencies declared in `package.json`; no implicit workspace coupling
- **TypeScript strict mode** - All code MUST use `strict: true`; no implicit `any` types
- **Single Responsibility Principle** - Components/modules serve one clear purpose
- **Naming conventions**:
  - Packages: `@afnizarnur/package-name` (kebab-case)
  - React components: `PascalCase`
  - Utilities/functions: `camelCase`
  - Files: Match export name (e.g., `Button.tsx` exports `Button`)
- **No dead code** - Unused imports, commented-out blocks, or orphaned files removed before commit
- **Props/interfaces explicitly typed** - All component props and function parameters have TypeScript interfaces

**Rationale**: A monorepo with shared packages requires strict boundaries and explicit contracts. Code quality demonstrates professional standards and enables safe refactoring as the codebase scales.

### II. Testing & Validation Standards

All features, packages, and integrations MUST be validated at multiple levels to ensure reliability and prevent regressions across the monorepo.

**Non-Negotiable Rules**:
- **Build verification** - `pnpm turbo run build` MUST succeed across all workspaces without errors or warnings
- **Type safety** - `pnpm turbo run typecheck` MUST pass before merging to `main`
- **Lint compliance** - `pnpm turbo run lint` MUST pass; no eslint-disable without justification
- **Package isolation tests** - Each `packages/*` workspace MUST build independently (`pnpm build --filter=@afnizarnur/package-name`)
- **Content pipeline validation** - Verify Sanity → Astro data flow for each content type (posts, projects, pages)
- **Visual regression** - Manual inspection at responsive breakpoints (375px mobile, 768px tablet, 1440px desktop)
- **Cross-browser verification** - Test in Chrome, Firefox, Safari (latest stable)
- **Accessibility baseline** - Keyboard navigation functional; no critical WAVE/axe violations
- **CI must pass** - GitHub Actions build/lint/typecheck gates required for PR merge

**Rationale**: Monorepo complexity requires rigorous build/type validation. Shared packages impact multiple apps, so regressions are costly. Automated checks catch issues early; manual UX/a11y testing ensures quality.

### III. User Experience Consistency

Every interaction and visual element MUST maintain consistency through a centralized design token system and shared component library.

**Non-Negotiable Rules**:
- **Single source of truth** - ALL design decisions (colors, spacing, typography, shadows) defined in `@afnizarnur/tokens` (Terrazzo)
- **Token-driven styling** - Components MUST consume tokens via Tailwind theme; no hardcoded colors/spacing values
- **Shared component library** - UI elements (buttons, cards, navigation) built once in `@afnizarnur/ui` and reused across apps
- **Mobile-first responsive design** - Build for 375px first, enhance with `md:` (768px) and `lg:` (1440px) breakpoints
- **Consistent interaction patterns**:
  - Hover/focus/active states defined per component type
  - Loading states prevent layout shift (skeleton screens or placeholders)
  - Animations use consistent timing curves (defined in tokens or GSAP config)
- **Typography hierarchy** - Heading scales, weights, line-heights enforced via token system
- **Component API consistency** - Similar components share prop naming (e.g., `variant`, `size`, `disabled`)

**Rationale**: Design tokens ensure visual consistency at scale. Centralized components prevent drift as multiple apps/features are built. This demonstrates design system maturity and technical discipline.

### IV. Performance Requirements

Performance directly impacts user experience and demonstrates technical competency; all apps MUST meet defined budgets.

**Non-Negotiable Rules**:
- **Core Web Vitals (production):**
  - Largest Contentful Paint (LCP): <2.5s
  - Cumulative Layout Shift (CLS): <0.1
  - Total Blocking Time (TBT): <300ms
  - First Contentful Paint (FCP): <1.5s on 3G networks
- **Lighthouse Performance score:** ≥90 mobile, ≥95 desktop (measured on production builds)
- **Static generation preferred** - Use Astro SSG for all content pages; avoid unnecessary client-side hydration
- **Selective hydration** - React islands (`client:load`, `client:visible`) only when interactivity required
- **Image optimization:**
  - Sanity asset pipeline for CMS images
  - Astro Image component with responsive srcsets
  - WebP/AVIF formats with fallbacks
  - Lazy loading for below-fold images
- **Bundle optimization:**
  - Code-splitting via Astro's built-in bundling
  - Tree-shaking enabled (Vite default)
  - Unused CSS purged by Tailwind
- **Build-time data fetching** - Sanity content fetched during build (SSG), not client-side

**Rationale**: As a content-driven portfolio, fast page loads are critical for first impressions and SEO. Astro's island architecture enables near-zero JS for static content. Performance budgets ensure technical excellence is visible to visitors.

## Monorepo Development Standards

### Workspace Structure

The monorepo MUST follow this canonical structure (per PRD):

```
afnizarnur/
├─ apps/
│  ├─ web/              → Astro frontend (portfolio + blog)
│  └─ studio/           → Sanity Studio (CMS)
├─ packages/
│  ├─ tokens/           → @afnizarnur/tokens (Terrazzo design tokens)
│  ├─ ui/               → @afnizarnur/ui (React components)
│  ├─ ui-primitives/    → @afnizarnur/ui-primitives (shadcn/ui base - optional)
│  ├─ config-eslint/    → @afnizarnur/config-eslint
│  ├─ config-typescript/→ @afnizarnur/config-typescript
│  └─ config-tailwind/  → @afnizarnur/config-tailwind
├─ .changeset/
├─ turbo.json
├─ pnpm-workspace.yaml
└─ package.json
```

### Package Dependency Rules

- **Apps depend on packages**, never the reverse (no circular deps)
- **Packages can depend on other packages** if explicitly declared in `package.json`
- **Build order enforced** - `turbo.json` defines `dependsOn` chains (e.g., `tokens` builds before `ui` builds before `web`)
- **Version management** - Use Changesets for publishing internal package updates

### Component Architecture

- **Astro-first for apps/web** - Prefer `.astro` components for static content
- **React islands for interactivity** - Import `@afnizarnur/ui` components with `client:*` directives only when needed
- **Package exports** - `@afnizarnur/ui` components exported from `src/index.ts` with explicit named exports
- **Composition over complexity** - Build larger features from smaller, reusable primitives

### Styling Guidelines

- **Token-driven Tailwind** - `apps/web/tailwind.config.ts` imports `@afnizarnur/tokens/dist/tailwind-theme.cjs`
- **Global CSS integration** - Import `@afnizarnur/tokens/dist/tokens.css` for CSS custom properties
- **Utility-first** - Use Tailwind classes; custom CSS only for complex animations or token-driven overrides
- **No arbitrary values** - Use token scale (e.g., `p-4` not `p-[17px]`); extend config if token missing

### File Organization (apps/web)

```
apps/web/src/
├─ pages/              → Astro file-based routes
├─ layouts/            → Page templates (BaseLayout, PostLayout)
├─ components/         → Astro-specific components
├─ server/
│  ├─ sanity.ts        → Sanity client config
│  └─ data.ts          → GROQ query functions (getAllPosts, getProject, etc.)
└─ styles/
   └─ global.css       → Token imports + Tailwind directives
```

### Sanity Content Model (apps/studio)

Per PRD Section 4.4, schemas MUST include:

- `post` - Blog articles (title, slug, publishedAt, body, tags, coverImage)
- `project` - Work showcase (title, slug, role, gallery, links, body)
- `page` - Static pages (About, Contact)
- `navigation` - Site-wide nav links
- `siteSettings` - Global metadata (SEO, OG image)

All schemas in `apps/studio/schemas/` directory.

## Quality Gates

Before any feature can be marked complete, it MUST pass these gates:

1. **Monorepo Build Gate**: `pnpm turbo run build` succeeds across all workspaces without errors/warnings
2. **Type Check Gate**: `pnpm turbo run typecheck` passes (all packages + apps)
3. **Lint Gate**: `pnpm turbo run lint` passes (ESLint across all workspaces)
4. **Package Isolation Gate**: Each modified package builds independently (`pnpm build --filter=@afnizarnur/package-name`)
5. **Content Pipeline Gate**: Verify Sanity → Astro flow works for modified content types (run local dev, check data fetching)
6. **Visual Gate**: Manual inspection at responsive breakpoints (375px, 768px, 1440px)
7. **Browser Gate**: Tested in Chrome, Firefox, Safari (latest stable)
8. **Performance Gate**: Lighthouse audit on production build meets thresholds (Principle IV: ≥90 mobile, ≥95 desktop)
9. **Accessibility Gate**: Keyboard navigation functional; no critical WAVE/axe violations
10. **CI Gate**: GitHub Actions workflow passes (auto-runs lint/typecheck/build on PRs)

**Feature-Specific Gates** (apply if relevant):
- **Token Changes**: Verify `@afnizarnur/tokens` builds and outputs are consumed correctly by `apps/web` Tailwind config
- **UI Component Changes**: Verify component exports work in Astro islands (`client:load` test)
- **Sanity Schema Changes**: Test in Sanity Studio locally; verify GROQ queries still work

## Governance

### Amendment Procedure

1. Proposed changes MUST be documented with rationale
2. Changes affecting existing implementations MUST include migration plan
3. Version number MUST be incremented per semantic versioning rules:
   - **MAJOR**: Breaking changes requiring code refactoring (e.g., removing a principle, changing fundamental architecture)
   - **MINOR**: Additive changes (e.g., new principle, expanded guidance)
   - **PATCH**: Clarifications, typo fixes, non-semantic refinements
4. Sync Impact Report MUST be generated and embedded in constitution file
5. Dependent templates MUST be reviewed and updated for consistency

### Compliance Review

- All feature specifications (spec.md) MUST reference relevant constitutional principles
- All implementation plans (plan.md) MUST include "Constitution Check" section
- All task lists (tasks.md) MUST include quality gate validation tasks
- Pull requests MUST reference constitutional compliance in description

### Living Document Philosophy

This constitution evolves with the project. When principles conflict with practical needs, document the exception and rationale in the Complexity Tracking section of plan.md. Repeated exceptions indicate the need for constitutional amendment.

### Phased Implementation Context

Per `docs/prd/prd-infrastructure.md`, this constitution applies across all five implementation phases:

1. **Phase 1 (Foundational Setup)**: Emphasis on Code Quality (Principle I) and Build Gate compliance
2. **Phase 2 (Content Pipeline)**: Emphasis on Content Pipeline Gate and data integrity
3. **Phase 3 (Design System)**: Emphasis on UX Consistency (Principle III) and token system standards
4. **Phase 4 (Assembly & Styling)**: Emphasis on Visual/Browser/Accessibility Gates
5. **Phase 5 (Deployment)**: Emphasis on Performance (Principle IV) and full CI/CD compliance

All principles apply at all times, but gate priorities shift per phase.

**Version**: 1.0.0 | **Ratified**: 2025-10-10 | **Last Amended**: 2025-10-10
