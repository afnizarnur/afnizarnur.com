# Documentation

Welcome to the afnizarnur.com documentation. This directory contains comprehensive guides for developers, content editors, and anyone contributing to this project.

## Quick Links

- **New to the project?** Start with [Getting Started](#getting-started)
- **Building features?** Check [Development Workflow](./development-workflow.md)
- **Managing content?** Read [Content Management](./content-management.md)
- **Having issues?** See [Troubleshooting](./troubleshooting.md)

## Documentation Index

### Core Documentation

#### [Architecture Overview](./architecture.md)

Comprehensive system architecture documentation covering:

- System architecture and data flow
- Technology stack (Astro, Sanity, React, Tailwind)
- Monorepo structure and organization
- Build pipeline and deployment architecture
- Performance and scalability considerations

**Best for:** Understanding how the system works, onboarding new developers, making architectural decisions.

#### [Development Workflow](./development-workflow.md)

Day-to-day development guide covering:

- Initial setup and prerequisites
- Daily development workflow
- Working with monorepo packages
- Making changes to apps and packages
- Testing procedures
- Git workflow and conventions
- Code review process
- Deployment procedures

**Best for:** Daily development tasks, contributing code, following best practices.

#### [Content Management](./content-management.md)

Complete guide to managing content with Sanity Studio:

- Content types (Posts, Projects, Pages, Tags)
- Publishing workflows
- SEO optimization
- Media management (images, videos)
- Best practices for content creation
- Troubleshooting content issues

**Best for:** Content editors, marketing team, anyone publishing content.

#### [Design System](./design-system.md)

Design system documentation covering:

- Design tokens (colors, typography, spacing)
- Component patterns
- Styling with Tailwind CSS
- Responsive design guidelines
- Accessibility standards

**Best for:** Designers, frontend developers, maintaining visual consistency.

#### [Deployment Guide](./deployment.md)

Detailed deployment instructions:

- Netlify configuration
- Environment variables
- Webhook setup
- Automated deployments
- Troubleshooting deployment issues

**Best for:** DevOps, setting up CI/CD, deployment troubleshooting.

#### [Troubleshooting](./troubleshooting.md)

Common issues and solutions for:

- Build issues
- Development server problems
- Type errors
- Dependency conflicts
- Deployment failures
- Sanity Studio issues
- Content problems
- Performance optimization

**Best for:** Debugging issues, finding quick solutions, understanding error messages.

### Additional Resources

#### Product Requirements Documents (PRD)

Located in [`prd/`](./prd/) directory:

- Feature specifications
- User stories
- Technical requirements
- Implementation details

### Root Documentation

Important documentation files in the project root:

#### [CLAUDE.md](../CLAUDE.md)

Project development guidelines for human developers:

- Tech stack overview
- Monorepo structure
- Available commands
- Development workflow
- Code style guidelines
- Deployment information

#### [AGENTS.md](../AGENTS.md)

Guidelines specifically for AI agents (Claude, GitHub Copilot, Cursor):

- Coding conventions
- File naming patterns
- Testing requirements
- Commit message format
- Pull request guidelines
- Common patterns and examples

#### [README.md](../README.md)

Project overview and quick start:

- Background and history
- Installation instructions
- Monorepo structure
- Package versioning with Changesets
- License information

## Getting Started

### For New Developers

1. **Read the README**
    - Start with [../README.md](../README.md) for project overview
    - Understand the background and goals

2. **Understand the Architecture**
    - Read [Architecture Overview](./architecture.md)
    - Learn about the tech stack
    - Understand data flow

3. **Set Up Your Environment**
    - Follow [Development Workflow - Getting Started](./development-workflow.md#getting-started)
    - Install dependencies
    - Configure IDE

4. **Review Coding Standards**
    - Read [AGENTS.md](../AGENTS.md) for coding conventions
    - Check [Design System](./design-system.md) for styling guidelines
    - Understand Git workflow

5. **Make Your First Change**
    - Follow [Development Workflow](./development-workflow.md)
    - Create a feature branch
    - Make a small change
    - Submit a pull request

### For Content Editors

1. **Learn the Basics**
    - Read [Content Management](./content-management.md)
    - Understand content types
    - Learn about SEO best practices

2. **Access Sanity Studio**
    - Get credentials from team
    - Log in to Studio
    - Familiarize yourself with the interface

3. **Create Your First Post**
    - Follow [Publishing a New Blog Post](./content-management.md#publishing-a-new-blog-post)
    - Write content
    - Add images
    - Publish

4. **Optimize for SEO**
    - Follow [SEO Guidelines](./content-management.md#seo-guidelines)
    - Use proper meta tags
    - Optimize images

### For Designers

1. **Understand the Design System**
    - Read [Design System](./design-system.md)
    - Review design tokens
    - Check color system and typography

2. **Review Components**
    - Examine component patterns
    - Understand responsive design approach
    - Learn accessibility requirements

3. **Make Design Changes**
    - Update design tokens
    - Create new components
    - Ensure consistency

## Project Structure

```
afnizarnur.com/
├── apps/
│   ├── web/                   # Astro frontend
│   └── studio/                # Sanity CMS
├── packages/
│   ├── config-*/              # Shared configurations
│   ├── tokens/                # Design tokens
│   └── ui/                    # Shared components
├── docs/                      # 📁 YOU ARE HERE
│   ├── README.md             # This file
│   ├── architecture.md       # System architecture
│   ├── development-workflow.md
│   ├── content-management.md
│   ├── design-system.md
│   ├── deployment.md
│   ├── troubleshooting.md
│   └── prd/                  # Product requirements
├── CLAUDE.md                  # Developer guidelines
├── AGENTS.md                  # AI agent guidelines
└── README.md                  # Project overview
```

## Common Tasks

### Development

```bash
# Start development
pnpm install
pnpm dev

# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Build for production
pnpm build
```

📚 **More:** [Development Workflow](./development-workflow.md)

### Content Management

- **Create a blog post:** [Publishing Guide](./content-management.md#publishing-a-new-blog-post)
- **Add a project:** [Project Guide](./content-management.md#adding-a-new-project)
- **Optimize images:** [Media Management](./content-management.md#media-management)
- **SEO best practices:** [SEO Guidelines](./content-management.md#seo-guidelines)

### Design

- **Update colors:** [Color System](./design-system.md#color-system)
- **Modify typography:** [Typography](./design-system.md#typography)
- **Change spacing:** [Spacing](./design-system.md#spacing)
- **Create components:** [Components](./design-system.md#components)

### Troubleshooting

- **Build fails:** [Build Issues](./troubleshooting.md#build-issues)
- **Dev server problems:** [Development Server Issues](./troubleshooting.md#development-server-issues)
- **Type errors:** [Type Errors](./troubleshooting.md#type-errors)
- **Deployment fails:** [Deployment Issues](./troubleshooting.md#deployment-issues)

## Technology Stack

### Frontend

- **[Astro](https://astro.build/)** - Static site framework
- **[React](https://react.dev/)** - UI components
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### CMS

- **[Sanity Studio](https://www.sanity.io/)** - Content management
- **[GROQ](https://www.sanity.io/docs/groq)** - Query language

### Build & Deploy

- **[Turborepo](https://turbo.build/)** - Monorepo build system
- **[pnpm](https://pnpm.io/)** - Package manager
- **[Netlify](https://www.netlify.com/)** - Hosting & CDN

### Design Tokens

- **[Terrazzo](https://terrazzo.app/)** - Token management

## Contributing

### Code Contributions

1. **Fork and clone** the repository
2. **Create a branch** following naming conventions
3. **Make changes** following coding standards
4. **Test thoroughly** (type check, lint, build)
5. **Commit** with conventional commit messages
6. **Submit PR** with detailed description

📚 **More:** [Development Workflow - Git Workflow](./development-workflow.md#git-workflow)

### Content Contributions

1. **Access Sanity Studio**
2. **Create/edit content** following guidelines
3. **Optimize for SEO** and accessibility
4. **Publish** when ready

📚 **More:** [Content Management](./content-management.md)

### Documentation Contributions

Documentation improvements are always welcome!

1. **Identify gaps** or outdated information
2. **Make changes** in `docs/` directory
3. **Follow Markdown** conventions
4. **Submit PR** with clear description

## Conventions

### File Naming

- **Components:** `PascalCase.tsx` or `PascalCase.astro`
- **Utils:** `camelCase.ts`
- **Routes:** `kebab-case.astro`
- **Config:** `kebab-case.ts`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(scope): add new feature
fix(scope): fix bug
docs(scope): update documentation
chore(scope): maintenance task
```

### Code Style

- **2 spaces** for indentation
- **Single quotes** for strings
- **Semicolons** required
- **ESLint** and **Prettier** enforced

📚 **More:** [AGENTS.md - Coding Style](../AGENTS.md#coding-style--naming-conventions)

## Versioning

This project uses [Changesets](https://github.com/changesets/changesets) for package versioning.

**Versioned packages:**

- `@afnizarnur/tokens`
- `@afnizarnur/ui`
- `@afnizarnur/ui-primitives`

**Creating changesets:**

```bash
pnpm changeset
```

📚 **More:** [Development Workflow - Changesets](./development-workflow.md#changesets-package-versioning)

## Support & Community

### Getting Help

1. **Check documentation** - Most answers are here
2. **Search issues** - GitHub repository issues
3. **Ask the team** - Slack/Discord channel
4. **Create an issue** - If you found a bug

### Useful Links

- **Website:** https://afnizarnur.com
- **Repository:** https://github.com/afnizarnur/afnizarnur.com
- **Netlify Dashboard:** https://app.netlify.com
- **Sanity Dashboard:** https://sanity.io/manage

### External Documentation

- [Astro Docs](https://docs.astro.build)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [Turborepo Docs](https://turbo.build/repo/docs)

## License

This website is a personal project shared openly for educational purposes. It's not a template. Feel free to incorporate portions of the code into your own website, giving proper attribution is appreciated.

## Changelog

Major documentation updates:

- **2025-10-11** - Initial comprehensive documentation
    - Added architecture overview
    - Added development workflow guide
    - Added content management guide
    - Added design system documentation
    - Added troubleshooting guide

---

**Need help?** Check the [Troubleshooting Guide](./troubleshooting.md) or create an issue on GitHub.

**Found a bug in docs?** Submit a PR or create an issue. Documentation improvements are always welcome!
