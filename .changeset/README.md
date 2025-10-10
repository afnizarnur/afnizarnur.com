# Changesets

This directory contains changeset files that track changes to packages in the monorepo.

## Workflow

1. Make changes to packages
2. Run `pnpm changeset` to create a changeset describing your changes
3. Run `pnpm changeset version` to bump package versions based on changesets
4. Run `pnpm build` to ensure all packages build correctly
5. Commit the changes

## Learn More

- [Changesets Documentation](https://github.com/changesets/changesets)
