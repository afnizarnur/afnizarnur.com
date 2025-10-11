# Repository Guidelines

This monorepo powers afnizarnur.com and its content tooling. Use the notes below to stay consistent with the Astro + Sanity stack.

## Project Structure & Module Organization

- `apps/web`: public Astro site; `src/pages` drives routing, `src/components` and `src/server` host UI/data helpers.
- `apps/studio`: Sanity Studio project with schemas in `schemas/`.
- `packages/ui`: shared React/TSX components; `packages/tokens`: design tokens generated via `terrazzo`.
- `packages/config-*`: lint, Tailwind, and TypeScript presets consumed by every workspace.
- `docs/` and `specs/`: product context; cite the relevant file when it shapes a change.

## Build, Test, and Development Commands

- `pnpm install`: sync workspace dependencies (Node ≥20, pnpm ≥9).
- `pnpm dev`: run all dev servers; scope with `pnpm --filter @afnizarnur/web dev` or `@afnizarnur/studio dev`.
- `pnpm build`: Turbo build, running `astro build` and Sanity’s static export.
- `pnpm lint` / `pnpm typecheck`: ESLint + TypeScript; both gate PRs.
- `pnpm clean`: drop Turbo cache and root `node_modules` when tooling misbehaves.

## Coding Style & Naming Conventions

- The shared ESLint config (`packages/config-eslint/index.js`) extends `@typescript-eslint`, `astro`, and `prettier`; fix reported issues before pushing.
- Keep two-space indentation and single quotes as in existing files.
- Components, hooks, and exported tokens use PascalCase; utility functions stay camelCase; Astro routes remain kebab-case.
- Prefer Tailwind utility classes or tokens over ad-hoc colours or spacing.

## Testing Guidelines

- Always run `pnpm typecheck` and `pnpm lint`; `astro check` runs within these tasks.
- For schema changes, sanity-check via `pnpm --filter @afnizarnur/studio dev` and create a test document.
- When adding logic, include a Vitest-style unit in the affected package or outline manual QA steps in the PR until broader automation lands.

## Commit & Pull Request Guidelines

- Use Conventional Commit syntax (`feat(scope): message`, `fix(scope): message`) as seen in history.
- Bundle related work per commit and generate a Changeset (`pnpm changeset`) when altering shared packages or public behaviour.
- PR descriptions should cover intent, verification, linked `docs/` or `specs/` items, and screenshots for UI updates.

## Environment & Configuration

- Copy `.env.example` files in `apps/web` and `apps/studio`; provide matching Sanity project IDs and datasets.
- Deployment defaults live in `netlify.toml`; adjust shared settings there rather than per-app overrides.
