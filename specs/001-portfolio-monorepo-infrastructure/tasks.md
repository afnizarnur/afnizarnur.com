# Tasks: Portfolio Monorepo Infrastructure

**Input**: Design documents from `/specs/001-portfolio-monorepo-infrastructure/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not explicitly requested in specification - focusing on build validation and manual testing

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
This is a monorepo with apps and packages:
- **Apps**: `apps/web/` (Astro), `apps/studio/` (Sanity)
- **Packages**: `packages/tokens/`, `packages/ui/`, `packages/config-*/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and monorepo structure

- [ ] T001 Create monorepo root structure with `apps/` and `packages/` directories
- [ ] T002 Initialize root `package.json` with workspaces and Turborepo scripts
- [ ] T003 Create `pnpm-workspace.yaml` defining workspace packages pattern
- [ ] T004 Create `turbo.json` with build pipeline configuration and dependency graph
- [ ] T005 Initialize `.gitignore` with Node.js, build artifacts, and environment files
- [ ] T006 Create `.changeset/` directory with Changesets configuration
- [ ] T007 [P] Create `packages/config-eslint/` with shared ESLint configuration
- [ ] T008 [P] Create `packages/config-typescript/` with base and React TypeScript configs
- [ ] T009 [P] Create `packages/config-tailwind/` with shared Tailwind preset
- [ ] T010 Install root dependencies: `pnpm`, `turbo`, `@changesets/cli`

**Checkpoint**: Monorepo structure established, shared configs available

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Design Token System (US1, US2, US3 all depend on this)

- [ ] T011 Create `packages/tokens/` package structure with `src/` and `dist/` directories
- [ ] T012 Add `packages/tokens/package.json` with Terrazzo as devDependency
- [ ] T013 Create `packages/tokens/terrazzo.config.ts` with CSS and Tailwind output plugins
- [ ] T014 Create `packages/tokens/src/tokens.json` with color, spacing, typography, and breakpoint tokens
- [ ] T015 Add build script to `packages/tokens/package.json` running Terrazzo CLI
- [ ] T016 Build tokens package to generate `dist/tokens.css`, `dist/tailwind-theme.cjs`, `dist/types.ts`

### Sanity Studio Setup (US1 depends on this)

- [ ] T017 Create `apps/studio/` directory structure
- [ ] T018 Initialize Sanity project with `sanity init` or create `package.json` manually
- [ ] T019 Create `apps/studio/sanity.config.ts` with project ID, dataset, and schema configuration
- [ ] T020 Create `apps/studio/.env.example` with `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` placeholders
- [ ] T021 Add `apps/studio/tsconfig.json` extending `@afnizarnur/config-typescript/base.json`

### Astro Web App Setup (US2, US3, US4 depend on this)

- [ ] T022 Create `apps/web/` directory structure with `src/pages/`, `src/layouts/`, `src/components/`, `src/server/`
- [ ] T023 Initialize Astro project with `package.json` and dependencies: `astro`, `@astrojs/react`, `@astrojs/netlify`, `@astrojs/tailwind`, `@sanity/client`
- [ ] T024 Create `apps/web/astro.config.mjs` with React, Tailwind, and Netlify adapter integrations
- [ ] T025 Create `apps/web/tailwind.config.ts` importing theme from `@afnizarnur/tokens/dist/tailwind-theme.cjs`
- [ ] T026 Create `apps/web/tsconfig.json` extending `@afnizarnur/config-typescript/base.json` with path aliases
- [ ] T027 Create `apps/web/.env.example` with `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `PUBLIC_SITE_URL`
- [ ] T028 Create `apps/web/src/server/sanity.ts` with Sanity client configuration
- [ ] T029 Create `apps/web/src/styles/global.css` importing `@afnizarnur/tokens/dist/tokens.css` and Tailwind directives

**Checkpoint**: Foundation ready - all packages can be built, user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Content Management via CMS (Priority: P1) 🎯 MVP FOUNDATION

**Goal**: Enable site owner to manage all content (projects, blog posts, pages) through Sanity Studio without touching code

**Independent Test**: Create, edit, and delete content items in Sanity Studio at http://localhost:3333 and verify they persist correctly

### Sanity Schemas for User Story 1

- [ ] T030 [P] [US1] Create `apps/studio/schemas/post.ts` with Post schema (title, slug, publishedAt, excerpt, body, tags, coverImage, seo)
- [ ] T031 [P] [US1] Create `apps/studio/schemas/project.ts` with Project schema (title, slug, description, role, selected, gallery, links, body, technologies, year, client, seo)
- [ ] T032 [P] [US1] Create `apps/studio/schemas/page.ts` with Page schema (title, slug, body, seo)
- [ ] T033 [P] [US1] Create `apps/studio/schemas/navigation.ts` with Navigation singleton schema (items array with title, href, newTab)
- [ ] T034 [P] [US1] Create `apps/studio/schemas/siteSettings.ts` with SiteSettings singleton schema (title, description, ogImage, url, social)
- [ ] T035 [P] [US1] Create `apps/studio/schemas/tag.ts` with Tag schema (title, slug, description)
- [ ] T036 [US1] Create `apps/studio/schemas/index.ts` exporting all schemas as schemaTypes array
- [ ] T037 [US1] Update `apps/studio/sanity.config.ts` to import and register all schemas
- [ ] T038 [US1] Add validation rules to all schemas (slug uniqueness, required fields, character limits per data-model.md)

### Initial Content Seeding for User Story 1

- [ ] T039 [US1] Start Sanity Studio with `pnpm --filter=@afnizarnur/studio dev`
- [ ] T040 [US1] Create `siteSettings` singleton with site title, description, and default metadata
- [ ] T041 [US1] Create `navigation` singleton with menu items (Work, Blog, About)
- [ ] T042 [US1] Create 2-3 sample blog posts with titles, slugs, excerpts, body content, and cover images
- [ ] T043 [US1] Create 2-3 sample projects with titles, slugs, descriptions, roles, gallery images (mark 2 as `selected: true`)
- [ ] T044 [US1] Create "About" page with title, slug, and body content

**Checkpoint**: User Story 1 complete - Content can be managed in Sanity Studio and persists correctly

---

## Phase 4: User Story 2 - Browse Portfolio and Projects (Priority: P1) 🎯 MVP

**Goal**: Enable site visitors to view featured projects and case studies on the portfolio website

**Independent Test**: Navigate to projects section, view list of projects, click through to individual project detail pages

### Data Fetching for User Story 2

- [ ] T045 [US2] Create `apps/web/src/server/data.ts` with GROQ query functions
- [ ] T046 [P] [US2] Implement `getFeaturedProjects()` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #5)
- [ ] T047 [P] [US2] Implement `getAllProjects()` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #4)
- [ ] T048 [P] [US2] Implement `getProjectBySlug(slug: string)` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #6)
- [ ] T049 [P] [US2] Implement `getAllProjectSlugs()` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #7)

### UI Components for User Story 2

- [ ] T050 [US2] Create `packages/ui/` package structure with `src/components/` and `src/types/`
- [ ] T051 [US2] Add `packages/ui/package.json` with React and TypeScript dependencies
- [ ] T052 [US2] Create `packages/ui/src/types/index.ts` with TypeScript interfaces from contracts/typescript-interfaces.ts
- [ ] T053 [P] [US2] Create `packages/ui/src/components/ProjectCard.tsx` component accepting `ProjectCardProps`
- [ ] T054 [P] [US2] Create `packages/ui/src/components/Card.tsx` base component (used by ProjectCard)
- [ ] T055 [US2] Create `packages/ui/src/index.ts` exporting all components and types

### Pages for User Story 2

- [ ] T056 [US2] Create `apps/web/src/pages/index.astro` (homepage) fetching featured projects and displaying in grid
- [ ] T057 [US2] Create `apps/web/src/pages/work/index.astro` (projects listing) fetching all projects
- [ ] T058 [US2] Create `apps/web/src/pages/work/[slug].astro` (project detail) with `getStaticPaths()` and individual project rendering
- [ ] T059 [US2] Create `apps/web/src/layouts/BaseLayout.astro` with basic HTML structure and global styles
- [ ] T060 [US2] Create `apps/web/src/layouts/ProjectLayout.astro` extending BaseLayout for project detail pages

**Checkpoint**: User Story 2 complete - Visitors can browse projects and view project details

---

## Phase 5: User Story 3 - Read Blog Content (Priority: P2)

**Goal**: Enable site visitors to read blog posts on a clean, fast, and accessible interface

**Independent Test**: Navigate to blog section, view list of posts, read individual articles

### Data Fetching for User Story 3

- [ ] T061 [P] [US3] Implement `getAllPosts()` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #1)
- [ ] T062 [P] [US3] Implement `getPostBySlug(slug: string)` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #2)
- [ ] T063 [P] [US3] Implement `getAllPostSlugs()` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #3)

### UI Components for User Story 3

- [ ] T064 [P] [US3] Create `packages/ui/src/components/PostCard.tsx` component accepting `PostCardProps`
- [ ] T065 [US3] Update `packages/ui/src/index.ts` to export PostCard

### Pages for User Story 3

- [ ] T066 [US3] Create `apps/web/src/pages/blog/index.astro` (blog index) fetching all published posts
- [ ] T067 [US3] Create `apps/web/src/pages/blog/[slug].astro` (blog post detail) with `getStaticPaths()` and Portable Text rendering
- [ ] T068 [US3] Create `apps/web/src/layouts/PostLayout.astro` extending BaseLayout for blog post pages
- [ ] T069 [US3] Install `@portabletext/react` or Astro Portable Text renderer for rich text content
- [ ] T070 [US3] Configure Portable Text renderer with custom serializers for code blocks, images, and callouts

**Checkpoint**: User Story 3 complete - Visitors can browse blog posts and read articles

---

## Phase 6: User Story 4 - Site Navigation and Discovery (Priority: P2)

**Goal**: Enable site visitors to easily navigate between different sections (homepage, blog, projects, about)

**Independent Test**: Click through all navigation links and verify they lead to the correct pages

### Data Fetching for User Story 4

- [ ] T071 [P] [US4] Implement `getNavigation()` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #9)
- [ ] T072 [P] [US4] Implement `getSiteSettings()` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #10)
- [ ] T073 [P] [US4] Implement `getPageBySlug(slug: string)` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #8)

### UI Components for User Story 4

- [ ] T074 [P] [US4] Create `packages/ui/src/components/Navbar.tsx` component accepting `NavbarProps` with navigation items
- [ ] T075 [P] [US4] Create `packages/ui/src/components/Footer.tsx` component accepting `FooterProps` with social links
- [ ] T076 [US4] Update `packages/ui/src/index.ts` to export Navbar and Footer

### Pages and Layouts for User Story 4

- [ ] T077 [US4] Update `apps/web/src/layouts/BaseLayout.astro` to include Navbar and Footer components
- [ ] T078 [US4] Create `apps/web/src/components/SEO.astro` component for meta tags using site settings
- [ ] T079 [US4] Create `apps/web/src/pages/about.astro` (static about page) fetching page content by slug
- [ ] T080 [US4] Update `apps/web/src/pages/index.astro` to fetch and use site settings for SEO
- [ ] T081 [US4] Add active link highlighting to Navbar component based on current path

**Checkpoint**: User Story 4 complete - All pages have navigation, visitors can move between sections

---

## Phase 7: User Story 5 - Automated Content Publishing (Priority: P3)

**Goal**: Enable content changes in CMS to automatically trigger site rebuild and deployment

**Independent Test**: Publish content in Sanity and verify live site updates within 5 minutes

### Deployment Setup for User Story 5

- [ ] T082 [US5] Create Netlify account and link GitHub repository
- [ ] T083 [US5] Configure Netlify build settings: build command `pnpm turbo run build --filter=@afnizarnur/web`, publish directory `apps/web/dist`
- [ ] T084 [US5] Add environment variables to Netlify: `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `PUBLIC_SITE_URL`
- [ ] T085 [US5] Deploy initial build to Netlify and verify site loads correctly
- [ ] T086 [US5] Configure custom domain and HTTPS in Netlify settings

### Webhook Automation for User Story 5

- [ ] T087 [US5] Create Netlify build hook URL from Netlify dashboard
- [ ] T088 [US5] Add webhook to Sanity project settings pointing to Netlify build hook URL
- [ ] T089 [US5] Configure webhook to trigger on `publish` and `unpublish` events for all document types
- [ ] T090 [US5] Test webhook by publishing content in Sanity and verifying Netlify build triggers

**Checkpoint**: User Story 5 complete - Content updates automatically deploy to production

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T091 [P] Add responsive design breakpoint styles to all components (375px mobile, 768px tablet, 1440px desktop)
- [ ] T092 [P] Add `README.md` at repository root with project overview and quick start instructions
- [ ] T093 [P] Add image optimization to all gallery and cover images using Sanity image CDN parameters
- [ ] T094 [P] Add error handling to all GROQ query functions in `apps/web/src/server/data.ts`
- [ ] T095 Add 404 page at `apps/web/src/pages/404.astro` with helpful navigation
- [ ] T096 Add loading states and skeleton screens for interactive components (if any)
- [ ] T097 Add Open Graph meta tags to SEO component for social sharing
- [ ] T098 Add sitemap generation to Astro config for SEO
- [ ] T099 Add robots.txt to `apps/web/public/` directory
- [ ] T100 Review and update quickstart.md with final setup instructions

---

## Phase FINAL: Constitutional Quality Gates ⚠️ REQUIRED

**Purpose**: Verify all constitutional requirements before feature completion

Per `.specify/memory/constitution.md`, ALL features MUST pass these gates:

### Core Monorepo Gates (1-5)

- [ ] T101 **Monorepo Build Gate**: Run `pnpm turbo run build` from repo root - must succeed across all workspaces without errors/warnings
- [ ] T102 **Type Check Gate**: Run `pnpm turbo run typecheck` - must pass for all packages (tokens, ui, config-*) and apps (web, studio)
- [ ] T103 **Lint Gate**: Run `pnpm turbo run lint` - must pass across all workspaces
- [ ] T104 **Package Isolation Gate**: Build each package independently: `pnpm build --filter=@afnizarnur/tokens`, `--filter=@afnizarnur/ui`, etc.
- [ ] T105 **Content Pipeline Gate**: Verify Sanity → Astro data flow - run `pnpm dev`, create/edit content in Studio, verify it appears in web app

### User Experience Gates (6-9)

- [ ] T106 **Visual Gate**: Manual inspection at 375px (mobile), 768px (tablet), 1440px (desktop) - all layouts should be responsive and usable
- [ ] T107 **Browser Gate**: Test in Chrome, Firefox, Safari (latest stable versions) - all pages load and function correctly
- [ ] T108 **Performance Gate**: Run Lighthouse audit on production build - Performance ≥90 mobile, ≥95 desktop; LCP <2.5s; CLS <0.1; TBT <300ms
- [ ] T109 **Accessibility Gate**: Keyboard navigation test (tab through all interactive elements) + WAVE/axe DevTools check (no critical violations)

### CI/CD Gate (10)

- [ ] T110 **CI Gate**: Create `.github/workflows/ci.yml` with GitHub Actions workflow running lint/typecheck/build on pull requests
- [ ] T111 Verify GitHub Actions workflow passes on main branch

### Feature-Specific Gates

- [ ] T112 **Token Changes**: Verify `packages/tokens/dist/tokens.css` is imported in `apps/web/src/styles/global.css`
- [ ] T113 **Token Changes**: Verify `packages/tokens/dist/tailwind-theme.cjs` is imported in `apps/web/tailwind.config.ts`
- [ ] T114 **UI Component Changes**: Test all UI components can be imported as Astro islands with `client:load` directive
- [ ] T115 **Sanity Schema Changes**: Verify all GROQ queries in `apps/web/src/server/data.ts` return expected data structure
- [ ] T116 **Deployment**: Verify production build deploys successfully to Netlify and site is accessible at custom domain

**CRITICAL**: Feature is NOT complete until ALL applicable gates pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - US1 (Content Management) - Can start after Foundational
  - US2 (Browse Projects) - Depends on US1 (needs content in CMS)
  - US3 (Blog Content) - Depends on US1 (needs content in CMS)
  - US4 (Navigation) - Can start after Foundational, enhanced after US2/US3
  - US5 (Automated Publishing) - Depends on US2 or US3 (needs deployable site)
- **Polish (Phase 8)**: Depends on all desired user stories being complete
- **Quality Gates (Phase FINAL)**: Depends on all implementation being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - Foundation for all content-driven stories
- **User Story 2 (P1)**: Depends on US1 completing (needs project content in Sanity)
- **User Story 3 (P2)**: Depends on US1 completing (needs blog post content in Sanity)
- **User Story 4 (P2)**: Can start after Foundational, depends on US2/US3 for navigation targets
- **User Story 5 (P3)**: Depends on US2 or US3 (needs a deployable web application)

### Within Each User Story

- Foundational tasks (Sanity schemas, data fetching) before UI components
- UI components before pages
- Layouts before pages that use them
- Base components before specialized components
- GROQ queries implemented before pages that use them

### Parallel Opportunities

- **Phase 1 Setup**: All config packages (T007-T009) can run in parallel
- **Phase 2 Foundational**:
  - Token build (T011-T016) can run in parallel with Sanity setup (T017-T021)
  - Astro setup (T022-T029) after tokens are built
- **Within US1**: All schema files (T030-T035) can run in parallel
- **Within US2**: Data fetching functions (T046-T049) can run in parallel; UI components (T053-T054) can run in parallel
- **Within US3**: Data fetching functions (T061-T063) can run in parallel
- **Within US4**: Data fetching functions (T071-T073) and UI components (T074-T075) can run in parallel
- **Phase 8 Polish**: Most polish tasks (T091-T094) can run in parallel

---

## Parallel Example: User Story 2 (Browse Projects)

```bash
# Parallel: Launch all data fetching functions together (different functions)
T046: "Implement getFeaturedProjects() in apps/web/src/server/data.ts"
T047: "Implement getAllProjects() in apps/web/src/server/data.ts"
T048: "Implement getProjectBySlug() in apps/web/src/server/data.ts"
T049: "Implement getAllProjectSlugs() in apps/web/src/server/data.ts"

# Parallel: Launch all UI components together (different files)
T053: "Create ProjectCard.tsx in packages/ui/src/components/"
T054: "Create Card.tsx in packages/ui/src/components/"

# Sequential: Pages depend on data fetching and components
T056: "Create apps/web/src/pages/index.astro" (after T046-T049, T053-T054)
T057: "Create apps/web/src/pages/work/index.astro" (after T046-T049, T053-T054)
T058: "Create apps/web/src/pages/work/[slug].astro" (after T046-T049, T053-T054)
```

---

## Implementation Strategy

### MVP First (User Story 1 + User Story 2)

1. Complete Phase 1: Setup (T001-T010)
2. Complete Phase 2: Foundational (T011-T029) - CRITICAL
3. Complete Phase 3: User Story 1 - CMS (T030-T044)
4. Complete Phase 4: User Story 2 - Projects (T045-T060)
5. **STOP and VALIDATE**: Test content creation in Studio and project browsing on website
6. Run quality gates (T101-T116)
7. Deploy/demo MVP

### Incremental Delivery

1. Setup + Foundational → Foundation ready (T001-T029)
2. Add US1 (CMS) → Test content management (T030-T044)
3. Add US2 (Projects) → Test project browsing → Deploy/Demo MVP! (T045-T060)
4. Add US3 (Blog) → Test blog reading → Deploy/Demo (T061-T070)
5. Add US4 (Navigation) → Test site navigation → Deploy/Demo (T071-T081)
6. Add US5 (Auto-publish) → Test webhooks → Deploy/Demo (T082-T090)
7. Polish → Final quality gates → Production launch (T091-T116)

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T029)
2. Once Foundational is done:
   - Developer A: Complete US1 (T030-T044)
3. Once US1 is done (content in CMS):
   - Developer A: US2 - Projects (T045-T060)
   - Developer B: US3 - Blog (T061-T070) in parallel
4. Once US2/US3 are done:
   - Developer A: US4 - Navigation (T071-T081)
   - Developer B: US5 - Deployment (T082-T090) in parallel
5. All developers: Polish and quality gates together (T091-T116)

---

## Notes

- [P] tasks = different files, no dependencies - safe to run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- All quality gates (T101-T116) MUST pass before feature is considered complete
- Commit after each task or logical group
- Stop at checkpoints to validate story independently
- Tests not included as they were not explicitly requested in spec.md
- Focus is on build validation, type safety, and manual testing per constitutional gates

---

## Task Summary

- **Total Tasks**: 116
- **Setup Phase**: 10 tasks (T001-T010)
- **Foundational Phase**: 19 tasks (T011-T029) - BLOCKS all user stories
- **User Story 1 (CMS)**: 15 tasks (T030-T044) - P1, MVP Foundation
- **User Story 2 (Projects)**: 16 tasks (T045-T060) - P1, MVP
- **User Story 3 (Blog)**: 10 tasks (T061-T070) - P2
- **User Story 4 (Navigation)**: 11 tasks (T071-T081) - P2
- **User Story 5 (Auto-publish)**: 9 tasks (T082-T090) - P3
- **Polish**: 10 tasks (T091-T100)
- **Quality Gates**: 16 tasks (T101-T116) - REQUIRED for completion

**Suggested MVP Scope**: Setup + Foundational + US1 + US2 = 60 tasks (T001-T060)

This delivers a working portfolio site where the owner can manage content and visitors can browse projects.
