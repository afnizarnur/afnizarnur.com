# Sanity Studio - Content Management

This is the Sanity Studio CMS for managing portfolio content.

## Quick Start

### 1. Get Sanity Credentials

1. Go to https://sanity.io/manage
2. Create a new project (or use an existing one)
3. Copy your Project ID

### 2. Set Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
SANITY_STUDIO_PROJECT_ID=your-project-id-here
SANITY_STUDIO_DATASET=production
```

### 3. Start Studio

```bash
# From repository root
pnpm --filter=@afnizarnur/studio dev

# Or from this directory
pnpm dev
```

Studio will be available at http://localhost:3333

### 4. Create Initial Content

Once Studio is running, create the following content:

#### Required (Singletons):

1. **Site Settings** - Configure site title, description, social links
2. **Navigation** - Add menu items (Work, Blog, About)

#### Recommended:

3. **Tags** - Create some tags (e.g., "Design Systems", "Frontend", "React")
4. **Projects** - Add 2-3 projects, mark 2 as "Featured"
5. **Posts** - Add 2-3 blog posts
6. **Pages** - Create an "About" page

## Schema Reference

### Content Types

- **Post** - Blog articles
- **Project** - Portfolio case studies
- **Page** - Static pages (About, Contact, etc.)
- **Tag** - Categorization for posts
- **Navigation** (Singleton) - Site menu structure
- **Site Settings** (Singleton) - Global site configuration

### Validation Rules

All schemas include validation:

- **Slugs** - Auto-generated from title, unique
- **Required fields** - Title, slug, body for all content
- **Character limits** - Enforced per data model specification
- **Image alt text** - Required when image is present
- **URL validation** - Links must be valid http/https URLs

## Deployment

To deploy Studio to Sanity's hosted platform:

```bash
pnpm deploy
```

This will make Studio accessible at `https://your-project.sanity.studio`

## Troubleshooting

### "Project not found"

- Verify your `SANITY_STUDIO_PROJECT_ID` in `.env`
- Check that the project exists at https://sanity.io/manage

### "Schema errors"

- Run `pnpm typecheck` to verify TypeScript types
- Check that all schema files are imported in `schemas/index.ts`

### "Can't connect to Sanity"

- Ensure you're logged in: `pnpm sanity login`
- Verify your network connection
- Check Sanity status: https://status.sanity.io

## Learn More

- [Sanity Documentation](https://www.sanity.io/docs)
- [Schema Reference](https://www.sanity.io/docs/schema-types)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
