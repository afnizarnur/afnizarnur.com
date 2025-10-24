## Product Requirements Document

**Project:** afnizarnur — Portfolio Monorepo & Infrastructure
**Version:** 1.1
**Focus:** Phased delivery of a scalable, content-driven personal portfolio.
**Date:** October 2025

### 1\. Executive Summary 📝

This document outlines the plan to build afnizarnur.com, a modern personal portfolio, blog, and project showcase. The project's core is a **monorepo architecture** designed for long-term scalability and maintainability. We will use a headless stack featuring **Next.js** for the frontend, **Sanity** for content management, and a shared design system powered by **Terrazzo** and **Tailwind CSS**.

The goal is to create a high-performance, content-driven static site that is easy to update, showcases modern development practices, and provides a solid foundation for future projects. This plan breaks the work into five distinct, sequential phases, from foundational setup to final deployment.

---

### 2\. User Stories 🎯

These stories define the "why" behind the technical features.

- **As the site owner (Afnizar), I want to...**
    - Manage all my projects, blog posts, and page content in a user-friendly CMS (Sanity) without touching code.
    - Have a single, unified development environment (monorepo) to streamline updates to shared code like UI components and design tokens.
    - Write content once and have it render beautifully and performantly on the website.
    - Deploy new content automatically just by publishing it in the CMS.
- **As a site visitor (e.g., recruiter, fellow developer), I want to...**
    - Quickly understand Afnizar's skills and experience by viewing his projects.
    - Read blog posts on a clean, fast, and accessible interface.
    - Easily navigate between the homepage, blog, and project sections.

---

### 3\. Phased Implementation Plan 🚀

This is the core sequence of tasks required to build the project. Each phase builds upon the last.

#### **Phase 1: Foundational Setup (The Scaffolding)** 🏗️

**Goal:** Establish the monorepo structure and core developer tooling. Nothing will be visible on the web yet.

- **Tasks:**
    1.  Initialize the project directory with `pnpm` workspaces.
    2.  Set up **Turborepo** for task orchestration (`turbo.json`).
    3.  Create the basic directory structure (`apps/`, `packages/`).
    4.  Create placeholder `package.json` files for all planned apps and packages.
    5.  Implement the shared configuration packages: `@afnizarnur/config-eslint` and `@afnizarnur/config-typescript`.
    6.  Set up basic **GitHub Actions** for linting and type-checking on pull requests.

- **Definition of Done:**
    - `pnpm install` successfully installs all dependencies.
    - `pnpm turbo run lint` and `pnpm turbo run typecheck` pass across all workspaces.

---

#### **Phase 2: The Content Pipeline (Sanity ↔️ Next.js)** 🔗

**Goal:** Establish the core data flow. Fetch content from Sanity and render it in a minimal Next.js app.

- **Tasks:**
    1.  Set up the **Sanity Studio** project (`apps/studio`).
    2.  Define and implement all Sanity schemas (`post`, `project`, `siteSettings`, etc.).
    3.  Add some dummy content in the Studio.
    4.  Initialize the **Next.js** application (`apps/site`).
    5.  Establish a connection to the Sanity client (`@sanity/client`).
    6.  Create a simple data-fetching module to get all posts using GROQ.
    7.  Create two Next.js route pages:
        - A blog index page (`/blog`) that lists the titles of the dummy posts.
        - A dynamic route page (`/blog/[slug]`) that displays the full body of a single post.
    8.  No styling is needed at this stage.

- **Definition of Done:**
    - The Sanity Studio is locally runnable with `pnpm dev`.
    - The Next.js dev server (`pnpm dev`) successfully fetches and displays content from Sanity on unstyled pages.

---

#### **Phase 3: The Design System (Tokens & UI)** 🎨

**Goal:** Build the visual foundation as independent, reusable packages.

- **Tasks:**
    1.  Set up the `@afnizarnur/tokens` package using **Terrazzo**.
    2.  Define the core design tokens (colors, spacing, typography).
    3.  Configure the Terrazzo pipeline to output CSS variables and a Tailwind theme preset.
    4.  Set up the `@afnizarnur/ui` package with **React**.
    5.  Build a few essential, unstyled components (e.g., `Card`, `Navbar`) that will consume the design tokens later.
    6.  (Optional) Set up `@afnizarnur/ui-primitives` if using `shadcn/ui`.

- **Definition of Done:**
    - `pnpm build` in the tokens package successfully generates `dist/` files.
    - UI components can be built and tested in isolation (e.g., with Storybook or a simple test page).

---

#### **Phase 4: Assembly & Styling (Putting It All Together)** ✨

**Goal:** Integrate the design system into the Next.js app to create a visually complete website.

- **Tasks:**
    1.  Integrate the `@afnizarnur/tokens` package into the Next.js app's Tailwind configuration and global CSS.
    2.  Create React components that consume Sanity data using Next.js rendering strategies (Server Components by default).
    3.  Import and use components from `@afnizarnur/ui` throughout the Next.js pages and layouts.
    4.  Replace the unstyled HTML from Phase 2 with styled UI components (e.g., use a `PostCard` component on the blog index).
    5.  Build out all remaining pages (Homepage, Project showcase, About page).
    6.  Ensure the site is responsive and accessible.

- **Definition of Done:**
    - The local Next.js site looks and feels like the final product.
    - All content from Sanity is rendered using the shared UI components.
    - Navigation, managed from Sanity, is fully functional.

---

#### **Phase 5: Deployment & Automation (Going Live)** 🌐

**Goal:** Deploy the site to production and automate the build process.

- **Tasks:**
    1.  Create a new project on **Netlify**.
    2.  Configure the build settings (`pnpm build`, `apps/site/.next`, environment variables).
    3.  Configure Next.js ISR and deployment settings for Netlify.
    4.  Perform the first successful production deploy.
    5.  Set up the **Sanity Webhook** to trigger a new Netlify build on content changes.
    6.  Set up **Changesets** for automated package versioning.

- **Definition of Done:**
    - The site is live on afnizarnur.com.
    - Publishing a change in Sanity automatically updates the live site within minutes.
    - The CI/CD pipeline in GitHub Actions passes reliably.

---

### 4\. Technical Specifications & Reference

This section contains the detailed technical information required to execute the implementation phases.

#### **4.1 Scope**

- **In Scope:**
    - Monorepo structure using Turborepo + pnpm.
    - Next.js app (`apps/site`) consuming Sanity content.
    - Sanity Studio (`apps/studio`) with schemas for posts, projects, navigation, and settings.
    - Token package with Terrazzo pipeline.
    - Shared UI and config packages.
    - Netlify deployment pipeline (production + preview).
- **Out of Scope:**
    - Detailed UI design or theming of content.
    - Non-web platform builds (e.g., iOS token export).
    - Analytics or marketing integrations (to be added later).

#### **4.2 Monorepo Architecture**

```
afnizarnur/
├─ apps/
│  ├─ site/               → Next.js app (portfolio & blog)
│  └─ studio/             → Sanity Studio (CMS backend)
├─ packages/
│  ├─ tokens/             → Terrazzo-based design tokens
│  ├─ ui/                 → Shared React components (Navbar, Footer, etc.)
│  ├─ ui-primitives/      → (optional) shadcn/ui primitives
│  ├─ config-eslint/      → Shared ESLint config
│  ├─ config-typescript/  → Shared TypeScript config
├─ .changeset/
├─ turbo.json
├─ pnpm-workspace.yaml
├─ package.json
└─ README.md
```

#### **4.3 Infrastructure Components**

| Layer                | Technology                              | Purpose                                          |
| :------------------- | :-------------------------------------- | :----------------------------------------------- |
| **Framework**        | Next.js 15 + React 19 + Tailwind CSS v4 | Server Components with ISR and dynamic rendering |
| **CMS**              | Sanity v4                               | Structured content management                    |
| **Design tokens**    | Terrazzo                                | Generate CSS vars + Tailwind theme               |
| **Styling**          | Tailwind CSS v4                         | Utility-first design with token integration      |
| **Shared UI**        | React + shadcn                          | Reusable, themeable components                   |
| **Monorepo tooling** | Turborepo + pnpm + Changesets           | Workspace orchestration & versioning             |
| **Deployment**       | Netlify with ISR support                | CDN-backed hosting with on-demand revalidation   |
| **CI/CD**            | GitHub Actions                          | Lint/build verification on PRs                   |

#### **4.4 Content Model (Sanity)**

| Document         | Key Fields                                                             | Description                     |
| :--------------- | :--------------------------------------------------------------------- | :------------------------------ |
| **post**         | title, slug, publishedAt, excerpt, body[], tags[], coverImage          | Blog articles                   |
| **project**      | title, slug, description, role[], selected, gallery[], links[], body[] | Case studies & work showcase    |
| **page**         | title, slug, body[]                                                    | Static content (About, Contact) |
| **navigation**   | items[]{title, href}                                                   | Navbar + Footer links           |
| **siteSettings** | title, description, ogImage                                            | Global metadata                 |

**Sanity schema directory:** `apps/studio/schemas/`

#### **4.5 Data Flow & Integration**

**Fetching strategy:** Use `@sanity/client` and GROQ inside Next.js API routes or Server Components. Content is fetched at build-time using ISR for optimal performance. Dynamic routes are generated with `generateStaticParams()`.

**Example `getAllPosts` query:**

```typescript
// apps/site/lib/sanity/queries.ts
import { sanity } from "./client"

export async function getAllPosts() {
    return sanity.fetch(`*[_type=="post"]{title, "slug":slug.current, excerpt}`)
}
```

**Example Next.js route (Server Component):**

```typescript
// apps/site/app/blog/[slug]/page.tsx
import { getPost } from "@/lib/sanity/queries"

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug)

    return (
        <article>
            <h1>{post.title}</h1>
            <div>{post.body}</div>
        </article>
    )
}
```

#### **4.6 Design Token System**

The `@afnizarnur/tokens` package uses Terrazzo to generate CSS variables, a Tailwind theme, and TypeScript exports. These outputs are consumed by the `apps/site` application.

**Example `global.css` (Tailwind v4):**

```css
@import "tailwindcss";
@import "@afnizarnur/tokens/tailwind";
@source "../components" "../app";
```

**Example `postcss.config.mjs`:**

```javascript
export default {
    plugins: {
        "@tailwindcss/postcss": {},
    },
}
```

#### **4.7 Shared UI Packages**

- **@afnizarnur/ui:** Contains primary React components (e.g., Navbar, Footer, PostCard) used in Next.js pages and layouts.
- **(Optional) @afnizarnur/ui-primitives:** Lightweight base components from `shadcn/ui` used by `@afnizarnur/ui`.

#### **4.8 Development & Deployment Flow**

- **Local Setup:**
    1.  `pnpm install`
    2.  `pnpm turbo run build --filter=@afnizarnur/tokens`
    3.  `pnpm dev`
- **Release Internal Packages:**
    1.  `pnpm changeset`
    2.  `pnpm changeset version`
    3.  `pnpm i -w && pnpm build`
    4.  `pnpm changeset publish`
- **Netlify Build Settings:**
    - **Build command:** `pnpm build`
    - **Publish directory:** `apps/site/.next`
    - **Environment variables:** `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`

#### **4.9 Governance & Maintenance**

- **Branching:** `main` (production) / `dev` (active work).
- **Commits:** Use Conventional Commits standard for automated changelogs.
- **Versioning:** Managed via Changesets.
- **CI:** GitHub Actions run lint + build on every PR to `main`.

---

### 5\. Success Criteria ✅

- Repository is reproducible with `pnpm i && pnpm dev`.
- The token package builds before dependent apps, and Tailwind correctly uses the generated theme.
- The Next.js site successfully fetches and renders all content types (lists and detail pages) from Sanity.
- Site-wide navigation and metadata are fully managed via Sanity singletons.
- Netlify deploys with ISR support, and rebuilds are automatically triggered by content updates in Sanity.
- Lint, typecheck, and build scripts pass across all monorepo workspaces.

---

### 6\. Future Extensions (Roadmap)

- Add an `apps/experiments` package for design prototypes or 3D/Three.js demos.
- Add an `apps/docs` for technical notes and documentation.
- Export design tokens to native platforms (iOS/Android) via Terrazzo.
- Integrate image optimization with Sanity's asset pipeline and Next.js Image component.
- Introduce visual regression testing with a tool like Chromatic or Playwright.
