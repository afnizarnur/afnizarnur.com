# Quickstart Guide: Portfolio Monorepo

**Feature**: Portfolio Monorepo Infrastructure
**Date**: 2025-10-10
**Purpose**: Step-by-step guide to set up and run the development environment

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: v20.x LTS or higher
- **pnpm**: v9.x or higher (install with `npm install -g pnpm`)
- **Git**: Latest version
- **Code Editor**: VS Code recommended (with TypeScript and Astro extensions)

**Optional but Recommended**:
- **Sanity CLI**: `npm install -g @sanity/cli` (for managing Sanity Studio)

---

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/afnizarnur/afnizarnur.com.git
cd afnizarnur.com
```

### 2. Install Dependencies

```bash
# Install all dependencies for all workspaces
pnpm install
```

This will install dependencies for:
- Root workspace
- `apps/web` (Astro app)
- `apps/studio` (Sanity Studio)
- All packages in `packages/` directory

Expected output:
```
Packages: +XXX
Progress: resolved XXX, reused XXX, downloaded X, added XXX, done
```

### 3. Set Up Environment Variables

Create environment files for each application:

**For apps/web** (Astro):
```bash
cd apps/web
cp .env.example .env
```

Edit `apps/web/.env`:
```env
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
PUBLIC_SITE_URL=http://localhost:4321
```

**For apps/studio** (Sanity):
```bash
cd apps/studio
cp .env.example .env
```

Edit `apps/studio/.env`:
```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

> **Note**: Get your Sanity project ID from [sanity.io/manage](https://sanity.io/manage)

### 4. Build Shared Packages

Before running the apps, build the shared packages (especially design tokens):

```bash
# From repo root
pnpm turbo run build --filter="@afnizarnur/config-*" --filter="@afnizarnur/tokens"
```

This ensures that:
- Configuration packages are available
- Design tokens are generated (CSS vars + Tailwind theme)
- UI components can reference tokens

Expected output:
```
@afnizarnur/config-eslint:build: Build completed
@afnizarnur/config-typescript:build: Build completed
@afnizarnur/config-tailwind:build: Build completed
@afnizarnur/tokens:build: ✓ Tokens generated
```

---

## Running the Development Environment

### Start All Development Servers

```bash
# From repo root
pnpm dev
```

This starts:
- **Astro dev server**: http://localhost:4321
- **Sanity Studio**: http://localhost:3333

You should see output similar to:
```
> afnizarnur@0.0.0 dev
> turbo run dev --parallel

@afnizarnur/web:dev: ▶ astro dev
@afnizarnur/web:dev:   🚀 Server running at http://localhost:4321
@afnizarnur/studio:dev: ▶ sanity dev
@afnizarnur/studio:dev:   ✔ Studio is running at http://localhost:3333
```

### Access the Applications

1. **Portfolio Website**: http://localhost:4321
   - Homepage, blog, projects, about pages
   - Hot reload enabled (changes update automatically)

2. **Sanity Studio**: http://localhost:3333
   - Content management interface
   - Login with your Sanity account
   - Create/edit blog posts, projects, pages

---

## Verify Installation

### Check Build Status

Run the full build to ensure everything is configured correctly:

```bash
pnpm turbo run build
```

Expected result: All packages and apps build without errors.

### Check Type Safety

```bash
pnpm turbo run typecheck
```

Expected result: TypeScript compilation succeeds across all workspaces.

### Check Code Quality

```bash
pnpm turbo run lint
```

Expected result: No ESLint errors.

---

## Common Development Tasks

### Create a New Blog Post

1. Open Sanity Studio: http://localhost:3333
2. Click "Post" in the sidebar
3. Click "Create new post"
4. Fill in required fields:
   - Title
   - Slug (auto-generated from title)
   - Published date
   - Excerpt
   - Body content
5. Click "Publish"
6. View at: http://localhost:4321/blog/your-slug

### Add a New Project

1. Open Sanity Studio: http://localhost:3333
2. Click "Project" in the sidebar
3. Click "Create new project"
4. Fill in required fields:
   - Title
   - Slug
   - Description
   - Role (add at least one)
   - Body content
5. Toggle "Selected" to feature on homepage
6. Upload gallery images
7. Click "Publish"
8. View at: http://localhost:4321/work/your-slug

### Update Design Tokens

1. Edit `packages/tokens/src/tokens.json`
2. Modify color, spacing, or typography values
3. Rebuild tokens:
   ```bash
   pnpm turbo run build --filter="@afnizarnur/tokens"
   ```
4. Restart Astro dev server:
   ```bash
   pnpm --filter=@afnizarnur/web dev
   ```
5. Changes will be reflected in all consuming apps

### Add a New UI Component

1. Create component in `packages/ui/src/components/MyComponent.tsx`
2. Export from `packages/ui/src/index.ts`:
   ```typescript
   export { MyComponent } from './components/MyComponent'
   ```
3. Import in Astro pages:
   ```astro
   ---
   import { MyComponent } from '@afnizarnur/ui'
   ---
   <MyComponent client:load />
   ```

---

## Building for Production

### Build All Workspaces

```bash
pnpm turbo run build
```

This builds:
- All config packages
- Design tokens
- UI component library
- Astro static site (output in `apps/web/dist`)
- Sanity Studio (if deploying separately)

### Preview Production Build

```bash
# Build first
pnpm turbo run build --filter=@afnizarnur/web

# Preview
pnpm --filter=@afnizarnur/web preview
```

Visit http://localhost:4321 to see the production build.

---

## Troubleshooting

### Issue: "Module not found: @afnizarnur/tokens"

**Solution**: Build the tokens package first:
```bash
pnpm turbo run build --filter="@afnizarnur/tokens"
```

### Issue: "Sanity Studio won't start"

**Solution**: Check environment variables:
```bash
cd apps/studio
cat .env  # Verify SANITY_STUDIO_PROJECT_ID is set
```

### Issue: "No content appearing in Astro"

**Solution**: Verify Sanity client configuration:
1. Check `apps/web/.env` has correct project ID
2. Ensure dataset is "production" (or matches your dataset)
3. Check Sanity Studio has published content (not drafts)

### Issue: "TypeScript errors after updating a package"

**Solution**: Rebuild dependencies and restart TypeScript server:
```bash
pnpm turbo run build
# In VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Issue: "Build fails with 'turbo' command not found"

**Solution**: Install Turborepo globally or use via pnpm:
```bash
pnpm install turbo --global
# OR use it via pnpm:
pnpm turbo run build
```

### Issue: "Styles not applying after token changes"

**Solution**: Clear Astro cache and rebuild:
```bash
rm -rf apps/web/.astro
pnpm turbo run build --filter="@afnizarnur/tokens"
pnpm --filter=@afnizarnur/web dev
```

---

## Useful Commands Reference

### Workspace Management

```bash
# Install dependency in specific workspace
pnpm --filter=@afnizarnur/web add package-name

# Run script in specific workspace
pnpm --filter=@afnizarnur/web dev

# Run script across all workspaces
pnpm -r dev

# List all workspaces
pnpm list -r --depth 0
```

### Turborepo Commands

```bash
# Run task across all workspaces
pnpm turbo run build

# Run task for specific package
pnpm turbo run build --filter=@afnizarnur/tokens

# Run with cache bypass
pnpm turbo run build --force

# Visualize task graph
pnpm turbo run build --graph
```

### Development Shortcuts

```bash
# Start only Astro (not Sanity)
pnpm --filter=@afnizarnur/web dev

# Start only Sanity (not Astro)
pnpm --filter=@afnizarnur/studio dev

# Build and preview production
pnpm turbo run build && pnpm --filter=@afnizarnur/web preview
```

### Quality Checks

```bash
# Run all checks
pnpm turbo run lint typecheck build

# Auto-fix linting issues
pnpm turbo run lint -- --fix

# Type-check in watch mode
pnpm turbo run typecheck -- --watch
```

---

## Next Steps

1. **Explore the codebase**:
   - Review `apps/web/src/pages/` for page structure
   - Check `apps/studio/schemas/` for content models
   - Examine `packages/tokens/src/tokens.json` for design system

2. **Create sample content**:
   - Add 2-3 blog posts in Sanity Studio
   - Add 2-3 projects (mark some as "selected")
   - Update site settings and navigation

3. **Customize design**:
   - Modify tokens in `packages/tokens/src/tokens.json`
   - Update UI components in `packages/ui/src/components/`

4. **Set up deployment**:
   - See `docs/deployment.md` for Netlify setup
   - Configure Sanity webhook for automatic rebuilds

---

## Additional Resources

- **Astro Documentation**: https://docs.astro.build
- **Sanity Documentation**: https://www.sanity.io/docs
- **Turborepo Handbook**: https://turbo.build/repo/docs/handbook
- **pnpm Workspace Guide**: https://pnpm.io/workspaces
- **Project README**: `../README.md`

---

## Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/afnizarnur/afnizarnur.com/issues)
2. Review relevant documentation (Astro, Sanity, Turborepo)
3. Join the [Astro Discord](https://astro.build/chat) or [Sanity Slack](https://slack.sanity.io)

---

**Setup complete!** You're ready to start building. 🚀
