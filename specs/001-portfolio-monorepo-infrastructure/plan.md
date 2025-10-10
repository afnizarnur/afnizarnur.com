# Implementation Plan: Portfolio Monorepo Infrastructure

**Branch**: `001-portfolio-monorepo-infrastructure` | **Date**: 2025-10-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-portfolio-monorepo-infrastructure/spec.md`

## Summary

Build a scalable personal portfolio and blog platform using a monorepo architecture. The system enables content management through Sanity CMS, renders high-performance static pages with Astro, and maintains design consistency through a shared token-based design system. The implementation follows a 5-phase approach: foundational setup (monorepo + tooling), content pipeline (Sanity ↔ Astro), design system (Terrazzo tokens + React components), integration (styled pages), and deployment (Netlify + automation).

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode), Node.js 20.x LTS
**Primary Dependencies**:
- Frontend: Astro 4.x, React 18.x, Tailwind CSS 3.x
- CMS: Sanity v4, @sanity/client
- Design Tokens: Terrazzo (latest)
- Monorepo: Turborepo 2.x, pnpm 9.x, Changesets

**Storage**: Sanity Content Lake (cloud-hosted CMS), Netlify CDN (static assets)
**Testing**:
- Build validation: Turborepo build pipeline
- Type checking: TypeScript compiler across all workspaces
- Linting: ESLint with shared config
- Manual: Visual regression at breakpoints, browser testing, accessibility audits

**Target Platform**: Web (static site generation), deployed to Netlify CDN
**Project Type**: Monorepo with multiple apps and shared packages
**Performance Goals**:
- Lighthouse Performance ≥90 mobile, ≥95 desktop
- LCP <2.5s, CLS <0.1, TBT <300ms, FCP <1.5s on 3G
- Page load <2s on standard broadband
- Build time <5 minutes for content updates

**Constraints**:
- Static generation only (no server-side rendering)
- Single content author (no multi-user CMS features)
- Build-time content fetching (no client-side data loading)
- Package build order dependencies must be explicit
- All styling must use design tokens (no hardcoded values)

**Scale/Scope**:
- 2 applications (web frontend, Sanity Studio)
- 6 shared packages (tokens, ui, ui-primitives, 3 config packages)
- 5 content types (post, project, page, navigation, siteSettings)
- ~10-20 initial content items (projects + blog posts)
- Expected traffic: <10k monthly visitors initially

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with `.specify/memory/constitution.md` principles:

- [x] **Code Quality (Principle I)**: Packages independently buildable, TypeScript strict mode, explicit dependencies
  - All packages in `packages/*` will have explicit `package.json` dependencies
  - `turbo.json` defines build order dependencies
  - TypeScript strict mode enforced via `@afnizarnur/config-typescript`

- [x] **Testing Standards (Principle II)**: Monorepo build/typecheck/lint gates planned; content pipeline validation included
  - Build gate: `pnpm turbo run build` across all workspaces
  - Type gate: `pnpm turbo run typecheck` across all workspaces
  - Lint gate: `pnpm turbo run lint` across all workspaces
  - Content pipeline: Manual verification of Sanity → Astro data flow

- [x] **UX Consistency (Principle III)**: Token-driven styling via `@afnizarnur/tokens`; shared components from `@afnizarnur/ui`
  - All colors, spacing, typography defined in `@afnizarnur/tokens`
  - Terrazzo generates CSS variables and Tailwind theme
  - UI components in `@afnizarnur/ui` consume tokens
  - No hardcoded design values in `apps/web`

- [x] **Performance (Principle IV)**: SSG-first approach; Lighthouse ≥90 mobile, ≥95 desktop; LCP <2.5s; selective hydration
  - Astro SSG for all content pages
  - React islands only for interactive components (`client:load`, `client:visible`)
  - Build-time GROQ queries (no client-side data fetching)
  - Image optimization via Sanity asset pipeline + Astro Image component

- [x] **Quality Gates**: All 10 gates included in task list (Monorepo Build, Type Check, Lint, Package Isolation, Content Pipeline, Visual, Browser, Performance, Accessibility, CI)
  - Tasks will include validation steps for all 10 constitutional gates
  - GitHub Actions workflow for automated CI gates

**Monorepo-Specific Checks**:
- [x] Package dependency chain respects build order (e.g., `tokens` → `ui` → `web`)
  - Build order: config packages → tokens → ui/ui-primitives → apps
  - Enforced via `turbo.json` `dependsOn` configuration

- [x] No circular dependencies between packages
  - Apps depend on packages (one-way)
  - Packages can depend on other packages (acyclic graph)
  - Verified during package setup

- [x] Turborepo `dependsOn` configured if new packages added
  - `turbo.json` will define build/dev/lint/typecheck dependencies

- [x] Changesets workflow planned if packages versioned
  - Changesets for internal package versioning
  - Conventional commits for changelog generation

**Exceptions** (document in Complexity Tracking if any principle is violated):
- None - all constitutional principles can be satisfied

## Project Structure

### Documentation (this feature)

```
specs/001-portfolio-monorepo-infrastructure/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output - technology decisions & patterns
├── data-model.md        # Phase 1 output - content schemas & entities
├── quickstart.md        # Phase 1 output - setup instructions
├── contracts/           # Phase 1 output - API contracts (GROQ queries, schema types)
├── checklists/
│   └── requirements.md  # Spec quality validation checklist
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
afnizarnur/                          # Monorepo root
├─ apps/
│  ├─ web/                           # Astro frontend application
│  │  ├─ src/
│  │  │  ├─ pages/                   # File-based routing
│  │  │  │  ├─ index.astro           # Homepage
│  │  │  │  ├─ blog/
│  │  │  │  │  ├─ index.astro        # Blog index
│  │  │  │  │  └─ [slug].astro       # Blog post detail
│  │  │  │  ├─ work/
│  │  │  │  │  ├─ index.astro        # Projects index
│  │  │  │  │  └─ [slug].astro       # Project detail
│  │  │  │  └─ about.astro           # About page
│  │  │  ├─ layouts/                 # Page templates
│  │  │  │  ├─ BaseLayout.astro      # Base layout with nav/footer
│  │  │  │  ├─ PostLayout.astro      # Blog post layout
│  │  │  │  └─ ProjectLayout.astro   # Project layout
│  │  │  ├─ components/              # Astro-specific components
│  │  │  │  ├─ Header.astro
│  │  │  │  ├─ Footer.astro
│  │  │  │  └─ SEO.astro
│  │  │  ├─ server/                  # Server-side utilities
│  │  │  │  ├─ sanity.ts             # Sanity client config
│  │  │  │  └─ data.ts               # GROQ query functions
│  │  │  └─ styles/
│  │  │     └─ global.css            # Token imports + Tailwind directives
│  │  ├─ public/                     # Static assets
│  │  ├─ astro.config.mjs
│  │  ├─ tailwind.config.ts          # Imports @afnizarnur/tokens theme
│  │  ├─ tsconfig.json
│  │  └─ package.json
│  │
│  └─ studio/                        # Sanity Studio (CMS)
│     ├─ schemas/                    # Content schemas
│     │  ├─ index.ts                 # Schema registry
│     │  ├─ post.ts                  # Blog post schema
│     │  ├─ project.ts               # Project schema
│     │  ├─ page.ts                  # Static page schema
│     │  ├─ navigation.ts            # Navigation schema
│     │  └─ siteSettings.ts          # Site settings singleton
│     ├─ sanity.config.ts
│     ├─ tsconfig.json
│     └─ package.json
│
├─ packages/
│  ├─ tokens/                        # @afnizarnur/tokens
│  │  ├─ src/
│  │  │  └─ tokens.json              # Terrazzo token definitions
│  │  ├─ dist/                       # Build output (generated)
│  │  │  ├─ tokens.css               # CSS custom properties
│  │  │  ├─ tailwind-theme.cjs       # Tailwind theme object
│  │  │  └─ types.ts                 # TypeScript token types
│  │  ├─ terrazzo.config.ts
│  │  ├─ tsconfig.json
│  │  └─ package.json
│  │
│  ├─ ui/                            # @afnizarnur/ui
│  │  ├─ src/
│  │  │  ├─ index.ts                 # Main exports
│  │  │  ├─ components/
│  │  │  │  ├─ Navbar.tsx            # Navigation component
│  │  │  │  ├─ Footer.tsx            # Footer component
│  │  │  │  ├─ Card.tsx              # Card component
│  │  │  │  ├─ PostCard.tsx          # Blog post card
│  │  │  │  └─ ProjectCard.tsx       # Project card
│  │  │  └─ types/
│  │  │     └─ index.ts              # Shared type definitions
│  │  ├─ tsconfig.json
│  │  └─ package.json
│  │
│  ├─ ui-primitives/                 # @afnizarnur/ui-primitives (optional)
│  │  ├─ src/
│  │  │  ├─ index.ts
│  │  │  └─ components/              # shadcn/ui base components
│  │  ├─ tsconfig.json
│  │  └─ package.json
│  │
│  ├─ config-eslint/                 # @afnizarnur/config-eslint
│  │  ├─ index.js                    # ESLint config
│  │  └─ package.json
│  │
│  ├─ config-typescript/             # @afnizarnur/config-typescript
│  │  ├─ base.json                   # Base tsconfig (strict mode)
│  │  ├─ react.json                  # React-specific config
│  │  └─ package.json
│  │
│  └─ config-tailwind/               # @afnizarnur/config-tailwind
│     ├─ index.js                    # Shared Tailwind preset
│     └─ package.json
│
├─ .changeset/                       # Changesets configuration
├─ .github/
│  └─ workflows/
│     └─ ci.yml                      # GitHub Actions CI pipeline
├─ turbo.json                        # Turborepo configuration
├─ pnpm-workspace.yaml               # PNPM workspace definition
├─ package.json                      # Root package.json
├─ .gitignore
└─ README.md
```

**Structure Decision**: This is a monorepo with multiple applications and shared packages. The structure follows the canonical layout defined in the PRD (Section 4.2) and constitution. Apps consume packages in a strict dependency hierarchy, with no circular dependencies. The design token package builds first, followed by UI components, then applications.

## Complexity Tracking

*No constitutional violations - this section is empty.*

The implementation strictly adheres to all constitutional principles:
- **Principle I (Code Quality)**: All packages are independently buildable with explicit dependencies and TypeScript strict mode
- **Principle II (Testing)**: All quality gates are included and enforceable via Turborepo + GitHub Actions
- **Principle III (UX Consistency)**: Design tokens provide single source of truth; all styling is token-driven
- **Principle IV (Performance)**: SSG-first architecture with Astro meets all performance budgets without compromise

No simpler alternatives were rejected because this architecture is already minimal viable complexity for the stated requirements.
