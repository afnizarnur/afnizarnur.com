<p align="center">
  <a href="https://github.com/afnizarnur">
    <img src="https://raw.githubusercontent.com/afnizarnur/afnizarnur.com/refs/heads/main/public/favicon.png" width="44">
  </a>
</p>

<p align="center">
  <a href="https://app.netlify.com/sites/afnizarnur/deploys"><img src="https://api.netlify.com/api/v1/badges/39910d3d-7848-4020-914c-209c03d34b82/deploy-status" alt="Netlify Status" /></a>
</p>

<p align="center">
 This is the source code of <a href="https://afnizarnur.com/">my personal site</a>. Built with Next.js and hosted on Netlify.
</p>

<p align="center">
  <a href="https://github.com/afnizarnur/afnizarnur.com/tree/2013">2013</a> · <a href="https://github.com/afnizarnur/afnizarnur.com/tree/2019">2019</a> · <a href="https://github.com/afnizarnur/afnizarnur.com/tree/2020">2020</a> · <a href="https://github.com/afnizarnur/afnizarnur.com/tree/2022">2022</a> · <a href="https://github.com/afnizarnur/afnizarnur.com/tree/2023">2023</a> · <a href="https://github.com/afnizarnur/afnizarnur.com/tree/2024">2024</a> · <a href="https://github.com/afnizarnur/afnizarnur.com/">Live</a>
</p>

---

## Background

Back in 2013 when I was in vocational high school, I decided to put together a portfolio website to show off my design skills. I didn't have any fancy tools at the time, just good ol' static HTML and CSS. I threw in some Bootstrap framework magic and slapped it on a shared hosting platform. Let me tell you, it was a blast!

Creating that website actually opened up a bunch of job opportunities for me. It was a two-pronged learning experience. First, I wanted to get the lowdown on design systems, from the design and user interface angles. Second, I wanted to understand the developer's side of things while building the site.

Now, I'm sharing this repository mainly for my own reference, but I thought, "Why not toss it up on GitHub for easy access and some peace of mind?" So, feel free to dig into the code and explore what I cooked up back in the day.

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/afnizarnur/afnizarnur.com.git
cd afnizarnur.com
pnpm install

# Build shared packages first
pnpm turbo run build --filter="@afnizarnur/config-*" --filter="@afnizarnur/tokens"

# Start development server
pnpm dev

# Build as production-ready
pnpm build
```

## Monorepo Structure

This project uses a monorepo architecture with:

- **apps/site** - Next.js 15 frontend (React 19, App Router)
- **apps/studio** - Sanity Studio CMS
- **packages/tokens** - Design tokens (Terrazzo)
- **packages/ui** - Shared React components
- **packages/config-\*** - Shared configurations (ESLint, TypeScript, Tailwind)

## Package Versioning

This monorepo uses [Changesets](https://github.com/changesets/changesets) for version management:

### Creating a Changeset

When you make changes to any package:

```bash
pnpm changeset
```

Follow the prompts to:

1. Select which packages have changed
2. Choose the version bump type (major, minor, patch)
3. Describe the changes (this becomes the changelog entry)

### Bumping Versions

To apply changesets and bump package versions:

```bash
pnpm version-packages
```

This will:

- Update package versions based on changesets
- Generate/update CHANGELOG.md files
- Remove consumed changeset files

### Publishing (Internal Packages)

For internal package updates:

```bash
pnpm build
pnpm changeset publish
```

Note: Config packages are ignored from changesets. Only versioned packages: `@afnizarnur/tokens`, `@afnizarnur/ui`, `@afnizarnur/ui-primitives`

## License

This website is my personal project, and I've chosen to share its source code openly for educational purposes. However, please note that **it's not a template**. Feel free to incorporate portions of the code into your own website, giving proper attribution to the author is appreciated.
