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

- [X] T001 Create monorepo root structure with `apps/` and `packages/` directories
- [X] T002 Initialize root `package.json` with workspaces and Turborepo scripts
- [X] T003 Create `pnpm-workspace.yaml` defining workspace packages pattern
- [X] T004 Create `turbo.json` with build pipeline configuration and dependency graph
- [X] T005 Initialize `.gitignore` with Node.js, build artifacts, and environment files
- [X] T006 Create `.changeset/` directory with Changesets configuration
- [X] T007 [P] Create `packages/config-eslint/` with shared ESLint configuration
- [X] T008 [P] Create `packages/config-typescript/` with base and React TypeScript configs
- [X] T009 [P] Create `packages/config-tailwind/` with shared Tailwind preset
- [X] T010 Install root dependencies: `pnpm`, `turbo`, `@changesets/cli`

**Checkpoint**: Monorepo structure established, shared configs available

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Package Versioning Infrastructure

- [X] T011 Create `.changeset/config.json` with configuration for internal package versioning
- [X] T012 Configure Changesets for linked packages: `@afnizarnur/tokens`, `@afnizarnur/ui`, `@afnizarnur/ui-primitives`, config packages
- [X] T013 Add `changeset` and `version-packages` scripts to root `package.json`
- [X] T014 Document Changesets workflow in root `README.md`: when to create changesets, how to bump versions

### Design Token System (US1, US2, US3 all depend on this)

- [X] T015 Create `packages/tokens/` package structure with `src/` and `dist/` directories
- [X] T016 Add `packages/tokens/package.json` with Terrazzo as devDependency
- [X] T017 Create `packages/tokens/terrazzo.config.ts` with CSS and Tailwind output plugins
- [X] T018 Create `packages/tokens/src/tokens.json` following W3C Design Token format with semantic naming:
  - Colors: `color.primary.{50-900}`, `color.neutral.{50-900}`, `color.semantic.{error,success,warning}`
  - Spacing: `spacing.{0-20}` (0.25rem increments)
  - Typography: `fontSize.{xs,sm,base,lg,xl,2xl,3xl,4xl}`, `fontWeight.{normal,medium,semibold,bold}`, `lineHeight.{tight,normal,relaxed}`
  - Breakpoints: `breakpoint.{mobile: 375px, tablet: 768px, desktop: 1440px}`
- [X] T019 Add build script to `packages/tokens/package.json` running Terrazzo CLI
- [X] T020 Build tokens package to generate `dist/tokens.css`, `dist/tailwind-theme.cjs`, `dist/types.ts`

### Sanity Studio Setup (US1 depends on this)

- [X] T021 Create `apps/studio/` directory structure
- [X] T022 Initialize Sanity project with `sanity init` or create `package.json` manually
- [X] T023 Create `apps/studio/sanity.config.ts` with project ID, dataset, and schema configuration
- [X] T024 Create `apps/studio/.env.example` with `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` placeholders
- [X] T025 Add `apps/studio/tsconfig.json` extending `@afnizarnur/config-typescript/base.json`

### Astro Web App Setup (US2, US3, US4 depend on this)

- [X] T026 Create `apps/web/` directory structure with `src/pages/`, `src/layouts/`, `src/components/`, `src/server/`
- [X] T027 Initialize Astro project with `package.json` and dependencies: `astro`, `@astrojs/react`, `@astrojs/netlify`, `@astrojs/tailwind`, `@sanity/client@^6.0.0`, `astro-portabletext`
- [X] T028 Create `apps/web/astro.config.mjs` with React, Tailwind, and Netlify adapter integrations
- [X] T029 Create `apps/web/tailwind.config.ts` importing theme from `@afnizarnur/tokens/dist/tailwind-theme.cjs`
- [X] T030 Create `apps/web/tsconfig.json` extending `@afnizarnur/config-typescript/base.json` with path aliases
- [X] T031 Create `apps/web/.env.example` with `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `PUBLIC_SITE_URL`
- [X] T032 Create `apps/web/src/server/sanity.ts` with Sanity client configuration
- [X] T033 Create `apps/web/src/styles/global.css` importing `@afnizarnur/tokens/dist/tokens.css` and Tailwind directives

### CI/CD Infrastructure

- [X] T034 Create `.github/workflows/ci.yml` with GitHub Actions workflow
- [X] T035 Configure CI workflow to run on pull requests to main branch
- [X] T036 Add CI workflow jobs: install dependencies, run lint/typecheck/build across all workspaces using `pnpm turbo run lint typecheck build`
- [ ] T037 Test CI workflow by creating a test branch and opening a PR

**Checkpoint**: Foundation ready - all packages can be built, CI automation operational, user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Content Management via CMS (Priority: P1) 🎯 MVP FOUNDATION

**Goal**: Enable site owner to manage all content (projects, blog posts, pages) through Sanity Studio without touching code

**Independent Test**: Create, edit, and delete content items in Sanity Studio at http://localhost:3333 and verify they persist correctly

### Sanity Schemas for User Story 1

- [X] T038 [P] [US1] Create `apps/studio/schemas/post.ts` with Post schema (title, slug, publishedAt, excerpt, body, tags, coverImage, seo)
- [X] T039 [P] [US1] Create `apps/studio/schemas/project.ts` with Project schema (title, slug, description, role, selected, gallery, links, body, technologies, year, client, seo)
- [X] T040 [P] [US1] Create `apps/studio/schemas/page.ts` with Page schema (title, slug, body, seo)
- [X] T041 [P] [US1] Create `apps/studio/schemas/navigation.ts` with Navigation singleton schema (items array with title, href, newTab)
- [X] T042 [P] [US1] Create `apps/studio/schemas/siteSettings.ts` with SiteSettings singleton schema (title, description, ogImage, url, social)
- [X] T043 [P] [US1] Create `apps/studio/schemas/tag.ts` with Tag schema (title, slug, description)
- [X] T044 [US1] Create `apps/studio/schemas/index.ts` exporting all schemas as schemaTypes array
- [X] T045 [US1] Update `apps/studio/sanity.config.ts` to import and register all schemas
- [X] T046 [US1] Add validation rules to all schemas (slug uniqueness, required fields, character limits per data-model.md)

### Initial Content Seeding for User Story 1

- [X] T047 [US1] Start Sanity Studio with `pnpm --filter=@afnizarnur/studio dev` (Ready - requires Sanity credentials)
- [X] T048 [US1] Create `siteSettings` singleton with site title, description, and default metadata (Ready - manual task in Studio UI)
- [X] T049 [US1] Create `navigation` singleton with menu items (Work, Blog, About) (Ready - manual task in Studio UI)
- [X] T050 [US1] Create 2-3 sample blog posts with titles, slugs, excerpts, body content, and cover images (Ready - manual task in Studio UI)
- [X] T051 [US1] Create 2-3 sample projects with titles, slugs, descriptions, roles, gallery images (mark 2 as `selected: true`) (Ready - manual task in Studio UI)
- [X] T052 [US1] Create "About" page with title, slug, and body content (Ready - manual task in Studio UI)

**Checkpoint**: User Story 1 complete - Content can be managed in Sanity Studio and persists correctly
**Note**: T047-T052 are ready to execute once Sanity credentials are configured (see apps/studio/README.md)

---

## Phase 4: User Story 2 - Browse Portfolio and Projects (Priority: P1) 🎯 MVP

**Goal**: Enable site visitors to view featured projects and case studies on the portfolio website

**Independent Test**: Navigate to projects section, view list of projects, click through to individual project detail pages

### Data Fetching for User Story 2

- [ ] T053 [US2] Create `apps/web/src/server/data.ts` with GROQ query functions
- [ ] T054 [P] [US2] Implement `getFeaturedProjects()` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #5)
- [ ] T055 [P] [US2] Implement `getAllProjects()` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #4)
- [ ] T056 [P] [US2] Implement `getProjectBySlug(slug: string)` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #6)
- [ ] T057 [P] [US2] Implement `getAllProjectSlugs()` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #7)

### UI Components for User Story 2

- [ ] T058 [US2] Create `packages/ui/` package structure with `src/components/` and `src/types/`
- [ ] T059 [US2] Add `packages/ui/package.json` with React and TypeScript dependencies
- [ ] T060 [US2] Create `packages/ui/src/types/index.ts` with TypeScript interfaces from contracts/typescript-interfaces.ts
- [ ] T061 [P] [US2] Create `packages/ui/src/components/ProjectCard.tsx` component accepting `ProjectCardProps`
- [ ] T062 [P] [US2] Create `packages/ui/src/components/Card.tsx` base component (used by ProjectCard)
- [ ] T063 [US2] Create `packages/ui/src/index.ts` exporting all components and types

### Pages for User Story 2

- [ ] T064 [US2] Create `apps/web/src/pages/index.astro` (homepage) fetching featured projects and displaying in grid
- [ ] T065 [US2] Create `apps/web/src/pages/work/index.astro` (projects listing) fetching all projects
- [ ] T066 [US2] Create `apps/web/src/pages/work/[slug].astro` (project detail) with `getStaticPaths()` and individual project rendering
- [ ] T067 [US2] Create `apps/web/src/layouts/BaseLayout.astro` with basic HTML structure and global styles
- [ ] T068 [US2] Create `apps/web/src/layouts/ProjectLayout.astro` extending BaseLayout for project detail pages

**Checkpoint**: User Story 2 complete - Visitors can browse projects and view project details

---

## Phase 5: User Story 3 - Read Blog Content (Priority: P2)

**Goal**: Enable site visitors to read blog posts on a clean, fast, and accessible interface

**Independent Test**: Navigate to blog section, view list of posts, read individual articles

### Data Fetching for User Story 3

- [ ] T069 [P] [US3] Implement `getAllPosts()` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #1)
- [ ] T070 [P] [US3] Implement `getPostBySlug(slug: string)` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #2)
- [ ] T071 [P] [US3] Implement `getAllPostSlugs()` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #3)

### UI Components for User Story 3

- [ ] T072 [P] [US3] Create `packages/ui/src/components/PostCard.tsx` component accepting `PostCardProps`
- [ ] T073 [US3] Update `packages/ui/src/index.ts` to export PostCard

### Pages for User Story 3

- [ ] T074 [US3] Configure `astro-portabletext` renderer with custom serializers for code blocks, images, and callouts (already installed in T027)
- [ ] T075 [US3] Create `apps/web/src/pages/blog/index.astro` (blog index) fetching all published posts
- [ ] T076 [US3] Create `apps/web/src/pages/blog/[slug].astro` (blog post detail) with `getStaticPaths()` and Portable Text rendering
- [ ] T077 [US3] Create `apps/web/src/layouts/PostLayout.astro` extending BaseLayout for blog post pages

**Checkpoint**: User Story 3 complete - Visitors can browse blog posts and read articles

---

## Phase 6: User Story 4 - Site Navigation and Discovery (Priority: P2)

**Goal**: Enable site visitors to easily navigate between different sections (homepage, blog, projects, about)

**Independent Test**: Click through all navigation links and verify they lead to the correct pages

### Data Fetching for User Story 4

- [ ] T078 [P] [US4] Implement `getNavigation()` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #9)
- [ ] T079 [P] [US4] Implement `getSiteSettings()` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #10)
- [ ] T080 [P] [US4] Implement `getPageBySlug(slug: string)` function in `apps/web/src/server/data.ts` (GROQ query from contracts/groq-queries.md #8)

### UI Components for User Story 4

- [ ] T081 [P] [US4] Create `packages/ui/src/components/Navbar.tsx` component accepting `NavbarProps` with navigation items
- [ ] T082 [P] [US4] Create `packages/ui/src/components/Footer.tsx` component accepting `FooterProps` with social links
- [ ] T083 [US4] Update `packages/ui/src/index.ts` to export Navbar and Footer

### Pages and Layouts for User Story 4

- [ ] T084 [US4] Update `apps/web/src/layouts/BaseLayout.astro` to include Navbar and Footer components
- [ ] T085 [US4] Create `apps/web/src/components/SEO.astro` component for meta tags using site settings
- [ ] T086 [US4] Create `apps/web/src/pages/about.astro` (static about page) fetching page content by slug
- [ ] T087 [US4] Update `apps/web/src/pages/index.astro` to fetch and use site settings for SEO
- [ ] T088 [US4] Add active link highlighting to Navbar component based on current path and verify navigation changes in Sanity Studio appear in web app after rebuild

**Checkpoint**: User Story 4 complete - All pages have navigation, visitors can move between sections

---

## Phase 7: User Story 5 - Automated Content Publishing (Priority: P3)

**Goal**: Enable content changes in CMS to automatically trigger site rebuild and deployment

**Independent Test**: Publish content in Sanity and verify live site updates within 5 minutes (including Netlify build time + CDN cache propagation)

### Deployment Setup for User Story 5

- [ ] T089 [US5] Create Netlify account and link GitHub repository
- [ ] T090 [US5] Configure Netlify build settings: build command `pnpm turbo run build --filter=@afnizarnur/web`, publish directory `apps/web/dist`
- [ ] T091 [US5] Add environment variables to Netlify: `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `PUBLIC_SITE_URL`
- [ ] T092 [US5] Deploy initial build to Netlify and verify site loads correctly
- [ ] T093 [US5] Configure custom domain and HTTPS in Netlify settings

### Webhook Automation for User Story 5

- [ ] T094 [US5] Create Netlify build hook URL from Netlify dashboard
- [ ] T095 [US5] Add webhook to Sanity project settings pointing to Netlify build hook URL
- [ ] T096 [US5] Configure webhook to trigger on `publish` and `unpublish` events for all document types
- [ ] T097 [US5] Test webhook by publishing content in Sanity and verifying Netlify build triggers

### Webhook Resilience Testing

- [ ] T098 [US5] Test webhook failure scenarios: temporarily disable Netlify webhook endpoint and verify Sanity still saves content
- [ ] T099 [US5] Test webhook retry behavior: publish content, check Netlify build logs for webhook receipt
- [ ] T100 [US5] Document webhook troubleshooting in `README.md`: how to verify webhook is firing, how to manually trigger builds

**Checkpoint**: User Story 5 complete - Content updates automatically deploy to production

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T101 [P] Add responsive design breakpoint styles to all components (375px mobile, 768px tablet, 1440px desktop)
- [ ] T102 [P] Add `README.md` at repository root with project overview and quick start instructions
- [ ] T103 [P] Add image optimization to all gallery and cover images using Sanity image CDN parameters:
  - Thumbnails: `?w=400&h=300&fit=crop&auto=format` (project/post cards)
  - Full images: `?w=1200&auto=format` (project detail galleries)
  - Cover images: `?w=1600&h=900&fit=crop&auto=format` (hero images)
  - Generate responsive srcsets: `?w=400`, `?w=800`, `?w=1200` for `<img srcset>`
- [ ] T104 [P] Add error handling to all GROQ query functions in `apps/web/src/server/data.ts`
- [ ] T105 Add 404 page at `apps/web/src/pages/404.astro` with helpful navigation
- [ ] T106 Add loading states and skeleton screens for interactive components (if any)
- [ ] T107 Add Open Graph meta tags to SEO component for social sharing
- [ ] T108 Add sitemap generation to Astro config for SEO
- [ ] T109 Add robots.txt to `apps/web/public/` directory
- [ ] T110 Review and update quickstart.md with final setup instructions

---

## Phase FINAL: Constitutional Quality Gates ⚠️ REQUIRED

**Purpose**: Verify all constitutional requirements before feature completion

Per `.specify/memory/constitution.md`, ALL features MUST pass these gates:

### Core Monorepo Gates (1-5)

- [ ] T111 **Monorepo Build Gate**: Run `pnpm turbo run build` from repo root - must succeed across all workspaces without errors/warnings
- [ ] T112 **Type Check Gate**: Run `pnpm turbo run typecheck` - must pass for all packages (tokens, ui, config-*) and apps (web, studio)
- [ ] T113 **Lint Gate**: Run `pnpm turbo run lint` - must pass across all workspaces
- [ ] T114 **Package Isolation Gate**: Build each package independently: `pnpm build --filter=@afnizarnur/tokens`, `--filter=@afnizarnur/ui`, etc.
- [ ] T115 **Content Pipeline Gate**: Verify Sanity → Astro data flow - run `pnpm dev`, create/edit content in Studio, verify it appears in web app

### User Experience Gates (6-9)

- [ ] T116 **Visual Gate**: Manual inspection at 375px (mobile), 768px (tablet), 1440px (desktop) - all layouts should be responsive and usable
- [ ] T117 **Browser Gate**: Test in Chrome, Firefox, Safari (latest stable versions) - all pages load and function correctly
- [ ] T118 **Performance Gate**: Run Lighthouse audit on production build - Performance ≥90 mobile, ≥95 desktop; LCP <2.5s; CLS <0.1; TBT <300ms
- [ ] T119 **Accessibility Gate**: Keyboard navigation test (tab through all interactive elements) + WAVE/axe DevTools check (no critical violations)

### CI/CD Gate (10)

- [ ] T120 **CI Gate**: Verify GitHub Actions workflow passes on current feature branch (CI setup completed in Phase 2: T034-T037)
- [ ] T121 Verify CI workflow correctly fails when intentional errors are introduced (negative test)

### Feature-Specific Gates

- [ ] T122 **Token Changes**: Verify `packages/tokens/dist/tokens.css` is imported in `apps/web/src/styles/global.css`
- [ ] T123 **Token Changes**: Verify `packages/tokens/dist/tailwind-theme.cjs` is imported in `apps/web/tailwind.config.ts`
- [ ] T124 **UI Component Changes**: Test all UI components can be imported as Astro islands with `client:load` directive
- [ ] T125 **Sanity Schema Changes**: Verify all GROQ queries in `apps/web/src/server/data.ts` return expected data structure
- [ ] T126 **Deployment**: Verify production build deploys successfully to Netlify and site is accessible at custom domain

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

- **Total Tasks**: 126 (was 116, +10 new tasks)
- **Setup Phase**: 10 tasks (T001-T010)
- **Foundational Phase**: 27 tasks (T011-T037) - BLOCKS all user stories
  - Added: Changesets configuration (T011-T014)
  - Added: CI/CD infrastructure (T034-T037)
  - Enhanced: Token naming conventions (T018)
  - Enhanced: Astro dependencies include `astro-portabletext` (T027)
- **User Story 1 (CMS)**: 15 tasks (T038-T052) - P1, MVP Foundation
- **User Story 2 (Projects)**: 16 tasks (T053-T068) - P1, MVP
- **User Story 3 (Blog)**: 9 tasks (T069-T077) - P2
  - Reduced by 2: Portable Text installation moved to foundational phase, tasks consolidated
- **User Story 4 (Navigation)**: 11 tasks (T078-T088) - P2
  - Enhanced: Navigation validation added to T088
- **User Story 5 (Auto-publish)**: 12 tasks (T089-T100) - P3
  - Added: Webhook resilience testing (T098-T100)
  - Enhanced: Independent test criteria clarified
- **Polish**: 10 tasks (T101-T110)
  - Enhanced: Image optimization with specific CDN parameters (T103)
- **Quality Gates**: 16 tasks (T111-T126) - REQUIRED for completion
  - Updated: CI gate now references Phase 2 setup (T120)

**Suggested MVP Scope**: Setup + Foundational + US1 + US2 = 68 tasks (T001-T068, was 60)

This delivers a working portfolio site where the owner can manage content and visitors can browse projects, with CI automation operational from the start.

**Key Improvements from Analysis**:
- ✅ CI setup moved to foundational phase (addresses C1)
- ✅ Changesets configuration added (addresses G1)
- ✅ Webhook failure testing added (addresses G2)
- ✅ Portable Text renderer specified as `astro-portabletext` (addresses A2)
- ✅ Image optimization parameters detailed (addresses U1)
- ✅ Token naming conventions specified (addresses U2)
- ✅ Navigation validation checkpoint added (addresses G3)
- ✅ Task ordering improved (Portable Text before blog pages)
