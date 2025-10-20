# Development Workflow

This guide covers the day-to-day development workflow for contributing to the afnizarnur.com monorepo. It includes setup, coding practices, testing, and deployment procedures.

## Table of Contents

- [Getting Started](#getting-started)
- [Daily Development Workflow](#daily-development-workflow)
- [Working with Packages](#working-with-packages)
- [Making Changes](#making-changes)
- [Testing Your Changes](#testing-your-changes)
- [Git Workflow](#git-workflow)
- [Code Review Process](#code-review-process)
- [Deployment](#deployment)

## Getting Started

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/afnizarnur/afnizarnur.com.git
cd afnizarnur.com

# Install dependencies
pnpm install

# Build shared packages
pnpm turbo run build --filter="@afnizarnur/config-*" --filter="@afnizarnur/tokens"

# Set up environment variables
cp apps/site/.env.example apps/site/.env
cp apps/studio/.env.example apps/studio/.env
# Edit .env files with your Sanity credentials
```

### Prerequisites

- **Node.js** ≥20.0.0 (check with `node --version`)
- **pnpm** ≥9.0.0 (install with `npm install -g pnpm`)
- **Git** (check with `git --version`)
- **Sanity account** (sign up at https://sanity.io)

### IDE Setup

**Recommended: VS Code**

Install these extensions:

- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- Thunder Client or REST Client for API testing

**VS Code Settings:**

```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```

## Daily Development Workflow

### Starting Your Day

```bash
# Update your local repository
git checkout main
git pull origin main

# Install any new dependencies
pnpm install

# Start development servers
pnpm dev
```

This will start:

- Web app at `http://localhost:3000`
- Studio at `http://localhost:3333`

### Typical Development Session

1. **Create a feature branch**

    ```bash
    git checkout -b feature/add-project-filters
    ```

2. **Make your changes**
    - Edit files in appropriate packages/apps
    - Follow coding conventions (see AGENTS.md)

3. **Test locally**

    ```bash
    # Run type checking
    pnpm typecheck

    # Run linting
    pnpm lint

    # Test in browser
    # Visit http://localhost:4321
    ```

4. **Commit your changes**

    ```bash
    git add .
    git commit -m "feat(web): add project filtering by technology"
    ```

5. **Push and create PR**
    ```bash
    git push origin feature/add-project-filters
    # Then create a Pull Request on GitHub
    ```

### Common Commands

```bash
# Development
pnpm dev                          # Run all dev servers
pnpm --filter @afnizarnur/web dev # Run web only
pnpm --filter @afnizarnur/studio dev # Run studio only

# Building
pnpm build                        # Build all apps
pnpm --filter @afnizarnur/web build # Build web only

# Quality checks
pnpm typecheck                    # Type checking
pnpm lint                         # Linting
pnpm format                       # Format code
pnpm format:check                 # Check formatting

# Cleaning
pnpm clean                        # Clean all build artifacts
rm -rf node_modules && pnpm install # Fresh install
```

## Working with Packages

### Shared Packages

The monorepo includes several shared packages:

**Config Packages:**

- `@afnizarnur/config-eslint` - ESLint configuration
- `@afnizarnur/config-tailwind` - Tailwind preset
- `@afnizarnur/config-typescript` - TypeScript config

**Library Packages:**

- `@afnizarnur/tokens` - Design tokens
- `@afnizarnur/ui` - Shared UI components

### Using Shared Packages

In any app, you can import from shared packages:

```typescript
// apps/site/src/components/Button.tsx
import { tokens } from '@afnizarnur/tokens';

export function Button() {
  return (
    <button style={{ color: tokens.color.primary }}>
      Click me
    </button>
  );
}
```

### Modifying Shared Packages

When you modify a shared package, you need to rebuild it:

```bash
# Option 1: Rebuild specific package
pnpm --filter @afnizarnur/tokens build

# Option 2: Rebuild all packages
pnpm build

# The web app will auto-reload with changes
```

### Adding Dependencies

**To a specific app:**

```bash
# Add to site app
pnpm --filter @afnizarnur/site add package-name

# Add to studio
pnpm --filter @afnizarnur/studio add package-name
```

**To a shared package:**

```bash
# Add to tokens package
pnpm --filter @afnizarnur/tokens add package-name
```

**To root (workspace-wide):**

```bash
# Add to root (e.g., dev tools)
pnpm add -w package-name -D
```

## Making Changes

### Working on the Web App

**File Structure:**

```
apps/site/app/
├── (routes)/        # Route segments with optional grouping
├── layout.tsx       # Root and segment layouts
├── page.tsx         # Page components
└── api/             # API routes (optional)

apps/site/lib/
├── sanity/          # Sanity client and queries
└── utils/           # Utility functions

apps/site/components/
└── *.tsx            # Reusable React components
```

**Creating a New Page:**

```tsx
// apps/site/app/contact/page.tsx
export const metadata = {
    title: "Contact",
    description: "Get in touch with me"
}

export default function ContactPage() {
    return (
        <main>
            <h1>Contact Me</h1>
            <p>Get in touch...</p>
        </main>
    )
}
```

**Creating a New Component:**

```tsx
// apps/site/src/components/ProjectCard.tsx
export interface ProjectCardProps {
    title: string
    description: string
    imageUrl: string
}

export function ProjectCard({ title, description, imageUrl }: ProjectCardProps) {
    return (
        <div className="project-card">
            <img src={imageUrl} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}
```

**Fetching Content from Sanity (Server Component):**

```typescript
// apps/site/lib/sanity/queries.ts
import { sanity } from "./client"

export async function getAllProjects() {
    return await sanity.fetch(`
        *[_type == "project"] | order(_createdAt desc) {
            _id,
            title,
            slug,
            description,
            technologies
        }
    `)
}
```

**Using in a Page:**

```tsx
// apps/site/app/projects/page.tsx
import { getAllProjects } from "@/lib/sanity/queries"

export default async function ProjectsPage() {
    const projects = await getAllProjects()

    return (
        <main>
            <h1>Projects</h1>
            <div className="grid">
                {projects.map((project) => (
                    <div key={project._id}>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}
```

### Working on Sanity Studio

**Adding a New Content Type:**

```typescript
// apps/studio/schemas/testimonial.ts
import { defineType } from "sanity"

export default defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    fields: [
        {
            name: "author",
            title: "Author",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "role",
            title: "Role",
            type: "string",
        },
        {
            name: "content",
            title: "Content",
            type: "text",
            validation: (Rule) => Rule.required().max(500),
        },
        {
            name: "avatar",
            title: "Avatar",
            type: "image",
        },
    ],
})
```

**Register the schema:**

```typescript
// apps/studio/schemas/index.ts
import post from "./post"
import project from "./project"
import testimonial from "./testimonial" // Add this

export const schemaTypes = [
    post,
    project,
    testimonial, // Add this
    // ... other schemas
]
```

### Working with Design Tokens

**Modifying Tokens:**

```json
// packages/tokens/tokens.json
{
    "color": {
        "primary": {
            "$type": "color",
            "$value": "#3b82f6"
        },
        "secondary": {
            "$type": "color",
            "$value": "#8b5cf6"
        }
    }
}
```

**Rebuild tokens:**

```bash
pnpm --filter @afnizarnur/tokens build
```

**Using tokens in Tailwind:**

```javascript
// Tokens are automatically available in Tailwind
<div className="bg-primary text-white">
```

## Testing Your Changes

### Manual Testing Checklist

**Before every commit:**

- [ ] Run `pnpm typecheck` - No TypeScript errors
- [ ] Run `pnpm lint` - No ESLint errors
- [ ] Run `pnpm format:check` - Code is formatted
- [ ] Test in browser - Features work as expected
- [ ] Check responsive design - Mobile, tablet, desktop
- [ ] Test in different browsers - Chrome, Firefox, Safari

**For content changes:**

- [ ] Content displays correctly
- [ ] Images load properly
- [ ] Links work
- [ ] SEO meta tags are correct

**For UI changes:**

- [ ] Component renders correctly
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] Loading states
- [ ] Error states
- [ ] Edge cases (long text, missing data, etc.)

### Running Type Checks

```bash
# Check all packages
pnpm typecheck

# Check specific app
pnpm --filter @afnizarnur/site typecheck
```

### Running Linters

```bash
# Lint all packages
pnpm lint

# Auto-fix issues
pnpm lint --fix

# Lint specific app
pnpm --filter @afnizarnur/site lint
```

### Testing Builds

```bash
# Build everything
pnpm build

# Build and preview site app
pnpm --filter @afnizarnur/site build
pnpm --filter @afnizarnur/site start
# Visit http://localhost:3000
```

### Browser Testing

**Desktop:**

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Mobile:**

- iOS Safari
- Android Chrome

**Tools:**

- Chrome DevTools (responsive mode)
- [BrowserStack](https://www.browserstack.com/) (cross-browser testing)

## Git Workflow

### Branch Naming

Follow this convention:

```
<type>/<short-description>

Examples:
- feature/add-dark-mode
- fix/header-mobile-nav
- docs/update-readme
- refactor/simplify-layout
- chore/upgrade-dependencies
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**

```bash
feat(site): add project filtering by technology
fix(studio): correct slug generation for posts
docs(deployment): add troubleshooting section
refactor(components): simplify ProjectCard logic
chore(deps): upgrade Next.js to v15.1
```

### Working with Branches

**Create feature branch:**

```bash
git checkout main
git pull origin main
git checkout -b feature/my-feature
```

**Keep branch updated:**

```bash
git checkout main
git pull origin main
git checkout feature/my-feature
git rebase main
```

**Commit changes:**

```bash
git add .
git commit -m "feat(scope): description"
```

**Push branch:**

```bash
git push origin feature/my-feature
```

### Creating Pull Requests

**PR Title:**
Use the same format as commit messages:

```
feat(web): add project filtering by technology
```

**PR Description Template:**

```markdown
## Summary

Brief description of changes

## Changes

- Added filter dropdown to projects page
- Implemented filtering logic
- Updated project card component
- Added tests

## Testing

- [x] Tested filtering with all technology tags
- [x] Verified responsive design
- [x] Checked accessibility with keyboard navigation
- [x] Ran type checking and linting

## Screenshots

[Add before/after screenshots for UI changes]

## Related Issues

Closes #123

## Checklist

- [x] Code follows project conventions
- [x] Tests pass locally
- [x] Documentation updated
- [x] Changeset created (if needed)
```

## Code Review Process

### As Author

1. **Self-review first**
    - Review your own code
    - Check for console.logs, TODOs
    - Ensure tests pass
    - Verify formatting

2. **Respond to feedback**
    - Address all comments
    - Ask for clarification if needed
    - Push updates and re-request review

3. **After approval**
    - Squash commits if needed
    - Merge with "Squash and merge"
    - Delete feature branch

### As Reviewer

1. **Review for:**
    - Code quality and readability
    - Follows project conventions
    - No obvious bugs
    - Performance considerations
    - Accessibility
    - Security issues

2. **Provide constructive feedback:**

    ```
    ❌ Bad: "This is wrong"
    ✅ Good: "Consider using X instead of Y because..."
    ```

3. **Approve when:**
    - Code meets quality standards
    - All concerns addressed
    - Tests pass
    - No blocking issues

## Deployment

### Automatic Deployment (Production)

**Triggers:**

- Push to `main` branch
- Webhook from Sanity (content update)

**Process:**

1. Netlify detects change
2. Runs build: `pnpm build`
3. Deploys `apps/site/dist/` to CDN
4. Site updated (~2-5 minutes)

**Monitor deployment:**

- Check [Netlify Dashboard](https://app.netlify.com)
- View deploy logs
- Get notified of failures

### Manual Deployment

**Trigger manual deploy:**

1. Go to Netlify dashboard
2. Navigate to Deploys tab
3. Click "Trigger deploy"
4. Select "Deploy site"

**Deploy Studio:**

```bash
pnpm --filter @afnizarnur/studio deploy
```

### Deploy Previews

**For every PR:**

- Netlify creates a preview deployment
- Preview URL in PR comments
- Test changes before merging

**Preview URLs:**

```
https://deploy-preview-[PR-NUMBER]--afnizarnur.netlify.app
```

### Rollback

**If deployment breaks:**

1. Go to Netlify dashboard
2. Navigate to Deploys tab
3. Find last working deploy
4. Click options (⋯)
5. Select "Publish deploy"

**Or revert via Git:**

```bash
git revert <commit-hash>
git push origin main
```

## Changesets (Package Versioning)

### When to Create a Changeset

Create a changeset when modifying versioned packages:

- `@afnizarnur/tokens`
- `@afnizarnur/ui`
- `@afnizarnur/ui-primitives`

**Don't create changesets for:**

- `config-*` packages
- Apps (`@afnizarnur/web`, `@afnizarnur/studio`)
- Documentation changes

### Creating a Changeset

```bash
pnpm changeset
```

Follow the prompts:

1. Select changed packages (spacebar to select)
2. Choose bump type:
    - `major` - Breaking changes
    - `minor` - New features (backward compatible)
    - `patch` - Bug fixes
3. Write summary (used in CHANGELOG)

### Releasing Packages

```bash
# 1. Update versions based on changesets
pnpm version-packages

# 2. Commit version changes
git add .
git commit -m "chore: version packages"

# 3. Build and publish (if needed)
pnpm release
```

## Troubleshooting

### Common Issues

**Problem: Build fails with "Cannot find module"**

```bash
# Solution: Rebuild shared packages
pnpm clean
pnpm install
pnpm turbo run build --filter="@afnizarnur/config-*" --filter="@afnizarnur/tokens"
```

**Problem: Type errors after updating packages**

```bash
# Solution: Clear cache and rebuild
rm -rf .turbo
rm -rf node_modules
pnpm install
pnpm typecheck
```

**Problem: Astro dev server not updating**

```bash
# Solution: Clear Astro cache
rm -rf apps/site/.astro
pnpm --filter @afnizarnur/web dev
```

**Problem: Port already in use**

```bash
# Solution: Kill process or use different port
lsof -ti:4321 | xargs kill -9
# Or specify different port
pnpm --filter @afnizarnur/web dev -- --port 4322
```

### Getting Help

- Check [AGENTS.md](../AGENTS.md) for coding guidelines
- Review [Architecture docs](./architecture.md) for system overview
- Check [Troubleshooting guide](./troubleshooting.md)
- Ask in team chat/Slack
- Create an issue on GitHub

## Quick Reference

### Essential Commands

```bash
# Setup
pnpm install
pnpm build

# Development
pnpm dev
pnpm typecheck
pnpm lint

# Git
git checkout -b feature/my-feature
git commit -m "feat(scope): description"
git push origin feature/my-feature

# Deployment
# Automatic on push to main
```

### File Locations

```
apps/site/src/pages/          # Routes
apps/site/src/components/     # Components
apps/site/src/layouts/        # Layouts
apps/studio/schemas/         # Content schemas
packages/tokens/             # Design tokens
docs/                        # Documentation
```

## Related Documentation

- [Architecture Overview](./architecture.md)
- [Content Management](./content-management.md)
- [Deployment Guide](./deployment.md)
- [AGENTS.md](../AGENTS.md) - AI agent guidelines
- [CLAUDE.md](../CLAUDE.md) - Project guidelines
