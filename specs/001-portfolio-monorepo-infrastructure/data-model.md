# Data Model: Portfolio Monorepo Infrastructure

**Feature**: Portfolio Monorepo Infrastructure
**Date**: 2025-10-10
**Purpose**: Define content schemas, entity relationships, and data validation rules for Sanity CMS

## Overview

This data model defines the structure of all content managed in Sanity CMS. All schemas are defined in TypeScript in `apps/studio/schemas/` and follow Sanity v4 conventions.

---

## Core Entities

### 1. Post (Blog Article)

**Schema Name**: `post`
**Type**: Document
**Purpose**: Represents a blog article or written content piece

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `title` | string | Yes | Post title displayed in headings | Max 100 chars |
| `slug` | slug | Yes | URL-friendly identifier | Auto-generated from title, unique, lowercase |
| `publishedAt` | datetime | Yes | Publication date/time | Must be past or present date |
| `excerpt` | text | Yes | Short summary for preview cards | Max 200 chars |
| `body` | array (Portable Text) | Yes | Full article content | Rich text with headings, lists, code blocks, images |
| `tags` | array of references | No | Categorization tags | References to `tag` documents |
| `coverImage` | image | No | Hero image for post | Asset with alt text required if present |
| `author` | reference | No | Post author (future use) | Reference to `author` document |
| `seo` | object | No | SEO metadata | Title, description, keywords |

**Validation Rules**:
- `slug.current` must be unique across all posts
- `publishedAt` cannot be in the future
- `excerpt` length between 50-200 characters
- `coverImage.alt` required if `coverImage` is present
- `body` must contain at least one block

**State Transitions**:
- Draft → Published (when `publishedAt` is set and past)
- Published → Draft (manual unpublish)

**Example**:
```typescript
{
  _type: 'post',
  title: 'Building a Design System with Terrazzo',
  slug: { current: 'building-design-system-terrazzo' },
  publishedAt: '2025-10-01T12:00:00Z',
  excerpt: 'Learn how to create scalable design tokens using Terrazzo and integrate them with Tailwind CSS.',
  body: [
    { _type: 'block', style: 'h2', children: [{ text: 'Introduction' }] },
    { _type: 'block', children: [{ text: 'Design tokens are...' }] }
  ],
  tags: [
    { _ref: 'tag-design-systems' },
    { _ref: 'tag-frontend' }
  ],
  coverImage: {
    asset: { _ref: 'image-abc123' },
    alt: 'Design token workflow diagram'
  }
}
```

---

### 2. Project (Portfolio Work)

**Schema Name**: `project`
**Type**: Document
**Purpose**: Represents a case study or portfolio work sample

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `title` | string | Yes | Project name | Max 80 chars |
| `slug` | slug | Yes | URL-friendly identifier | Auto-generated from title, unique |
| `description` | text | Yes | One-sentence project summary | Max 150 chars |
| `role` | array of strings | Yes | Roles performed (e.g., "UI Design", "Frontend Dev") | At least one role |
| `selected` | boolean | No | Featured on homepage | Defaults to false |
| `gallery` | array of images | No | Project screenshots/images | Max 10 images, alt text required |
| `links` | array of objects | No | External links (live site, GitHub, etc.) | Each link has `label` and `url` |
| `body` | array (Portable Text) | Yes | Detailed case study | Rich text with sections, images, quotes |
| `technologies` | array of strings | No | Tech stack used | Freeform tags (e.g., "React", "Tailwind") |
| `year` | number | No | Project completion year | 4-digit year (e.g., 2024) |
| `client` | string | No | Client or company name | Max 80 chars |
| `seo` | object | No | SEO metadata | Title, description, keywords |

**Validation Rules**:
- `slug.current` must be unique across all projects
- `description` length between 50-150 characters
- `role` array must have at least one entry
- `gallery` images must include `alt` text
- `links` must have valid URLs (http/https)
- `year` must be between 2000 and current year + 1

**Relationships**:
- Can reference `tag` documents via `technologies` (future enhancement)

**Example**:
```typescript
{
  _type: 'project',
  title: 'E-Commerce Redesign for Acme Corp',
  slug: { current: 'acme-ecommerce-redesign' },
  description: 'Led the complete redesign of Acme Corp's e-commerce platform, improving conversion rate by 40%.',
  role: ['UI/UX Design', 'Frontend Development', 'Design System'],
  selected: true,
  gallery: [
    { asset: { _ref: 'image-xyz' }, alt: 'Homepage redesign mockup' },
    { asset: { _ref: 'image-abc' }, alt: 'Product page on mobile' }
  ],
  links: [
    { label: 'Live Site', url: 'https://acme.com' },
    { label: 'Case Study', url: 'https://acme.com/case-study' }
  ],
  body: [
    { _type: 'block', style: 'h2', children: [{ text: 'Challenge' }] },
    { _type: 'block', children: [{ text: 'The existing platform...' }] }
  ],
  technologies: ['React', 'Tailwind CSS', 'Shopify'],
  year: 2024,
  client: 'Acme Corporation'
}
```

---

### 3. Page (Static Content)

**Schema Name**: `page`
**Type**: Document
**Purpose**: Represents static pages like About, Contact, etc.

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `title` | string | Yes | Page title | Max 60 chars |
| `slug` | slug | Yes | URL path | Unique, lowercase, no leading slash |
| `body` | array (Portable Text) | Yes | Page content | Rich text with full formatting |
| `seo` | object | No | SEO metadata | Title, description, keywords |

**Validation Rules**:
- `slug.current` must be unique across all pages
- `slug.current` cannot be reserved route names (e.g., `blog`, `work`, `api`)
- `body` must contain at least one block

**Example**:
```typescript
{
  _type: 'page',
  title: 'About Me',
  slug: { current: 'about' },
  body: [
    { _type: 'block', style: 'h2', children: [{ text: 'Hi, I'm Afnizar' }] },
    { _type: 'block', children: [{ text: 'I'm a product designer...' }] }
  ],
  seo: {
    title: 'About Afnizar - Product Designer & Developer',
    description: 'Learn about my background, skills, and approach to design and development.'
  }
}
```

---

### 4. Navigation (Site Menu)

**Schema Name**: `navigation`
**Type**: Document (Singleton)
**Purpose**: Defines the site's navigation menu structure

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `items` | array of objects | Yes | Navigation links | At least one item |

**Item Object Structure**:
```typescript
{
  title: string       // Link text (e.g., "About")
  href: string        // URL path (e.g., "/about" or "https://...")
  newTab?: boolean    // Open in new tab (for external links)
}
```

**Validation Rules**:
- `items` must have at least one entry
- Each `item.title` max 20 chars
- `item.href` must be valid path or URL
- Internal links start with `/`, external with `http://` or `https://`

**Singleton Behavior**:
- Only one `navigation` document can exist
- Document ID is always `navigation`
- Created during initial setup, edited thereafter

**Example**:
```typescript
{
  _id: 'navigation',
  _type: 'navigation',
  items: [
    { title: 'Work', href: '/work' },
    { title: 'Blog', href: '/blog' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' }
  ]
}
```

---

### 5. Site Settings (Global Metadata)

**Schema Name**: `siteSettings`
**Type**: Document (Singleton)
**Purpose**: Global site configuration and SEO defaults

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `title` | string | Yes | Site name | Max 60 chars |
| `description` | text | Yes | Default meta description | Max 160 chars |
| `ogImage` | image | No | Default social sharing image | 1200x630px recommended |
| `url` | url | No | Canonical site URL | Must be valid URL (e.g., https://afnizarnur.com) |
| `social` | object | No | Social media links | Object with `twitter`, `github`, `linkedin`, etc. |

**Social Object Structure**:
```typescript
{
  twitter?: string   // Twitter/X handle (without @)
  github?: string    // GitHub username
  linkedin?: string  // LinkedIn profile URL
  email?: string     // Contact email
}
```

**Validation Rules**:
- `title` length 10-60 characters
- `description` length 50-160 characters
- `ogImage` must be at least 1200x630px if provided
- `url` must be valid https URL
- Social handles validated as usernames (alphanumeric + dashes/underscores)

**Singleton Behavior**:
- Only one `siteSettings` document exists
- Document ID is always `siteSettings`

**Example**:
```typescript
{
  _id: 'siteSettings',
  _type: 'siteSettings',
  title: 'Afnizar Nur Ghifari — Product Designer & Developer',
  description: 'Portfolio and blog of Afnizar Nur Ghifari, showcasing design systems, frontend development, and product design work.',
  ogImage: {
    asset: { _ref: 'image-og-default' },
    alt: 'Afnizar Nur Ghifari Portfolio'
  },
  url: 'https://afnizarnur.com',
  social: {
    twitter: 'afnizarnur',
    github: 'afnizarnur',
    linkedin: 'https://linkedin.com/in/afnizarnur',
    email: 'hello@afnizarnur.com'
  }
}
```

---

## Supporting Entities

### 6. Tag (Categorization)

**Schema Name**: `tag`
**Type**: Document
**Purpose**: Reusable tags for categorizing posts and projects

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `title` | string | Yes | Tag name | Max 30 chars, unique |
| `slug` | slug | Yes | URL-friendly identifier | Auto-generated, unique |
| `description` | text | No | Tag explanation | Max 200 chars |

**Validation Rules**:
- `title` must be unique across all tags
- `slug.current` must be unique
- `title` max 30 characters

**Usage**:
- Referenced by `post.tags[]` array
- Can be referenced by `project.technologies[]` (future enhancement)

**Example**:
```typescript
{
  _type: 'tag',
  title: 'Design Systems',
  slug: { current: 'design-systems' },
  description: 'Posts about building and maintaining design systems'
}
```

---

### 7. Author (Future Use)

**Schema Name**: `author`
**Type**: Document
**Purpose**: Author information for multi-author blogs (future enhancement)

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `name` | string | Yes | Author full name | Max 60 chars |
| `slug` | slug | Yes | URL-friendly identifier | Unique |
| `bio` | text | No | Author biography | Max 500 chars |
| `avatar` | image | No | Profile photo | Square aspect ratio recommended |

**Note**: Currently not used (single-author site), but included for future scalability.

---

## Entity Relationships

### Relationship Diagram

```
┌─────────────┐
│ siteSettings│ (singleton - global metadata)
└─────────────┘

┌─────────────┐
│ navigation  │ (singleton - menu links)
└─────────────┘

┌─────────────┐       ┌─────────────┐
│    post     │──────>│     tag     │ (many-to-many via references)
└─────────────┘       └─────────────┘
       │
       │ (future)
       ▼
┌─────────────┐
│   author    │ (one-to-many)
└─────────────┘

┌─────────────┐
│   project   │ (independent, can reference tags in future)
└─────────────┘

┌─────────────┐
│    page     │ (independent)
└─────────────┘
```

### Reference Types

**Strong References** (referential integrity enforced):
- `post.tags[]` → `tag._id`
- `post.author` → `author._id` (future)

**Weak References** (validation only):
- None currently

---

## Data Validation Summary

### Required Fields by Entity

**Post**: `title`, `slug`, `publishedAt`, `excerpt`, `body`
**Project**: `title`, `slug`, `description`, `role`, `body`
**Page**: `title`, `slug`, `body`
**Navigation**: `items` (with at least one item)
**Site Settings**: `title`, `description`
**Tag**: `title`, `slug`

### Unique Constraints

- `post.slug.current` (unique across posts)
- `project.slug.current` (unique across projects)
- `page.slug.current` (unique across pages)
- `tag.title` (unique across tags)
- `tag.slug.current` (unique across tags)

### Character Limits

| Entity | Field | Min | Max |
|--------|-------|-----|-----|
| Post | title | - | 100 |
| Post | excerpt | 50 | 200 |
| Project | title | - | 80 |
| Project | description | 50 | 150 |
| Page | title | - | 60 |
| Site Settings | title | 10 | 60 |
| Site Settings | description | 50 | 160 |
| Tag | title | - | 30 |

---

## Portable Text Schemas

### Standard Blocks

All `body` fields use Portable Text with these allowed block types:

**Text Blocks**:
- Normal paragraph
- Headings (H2, H3, H4)
- Blockquote
- Ordered/unordered lists

**Inline Elements**:
- Bold, italic, underline
- Links (internal and external)
- Inline code

**Custom Blocks**:
- Code block (with language syntax highlighting)
- Image (with caption and alt text)
- Callout/note box (informational, warning, tip)

### Example Portable Text Structure

```typescript
body: [
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Section Title' }]
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'This is a paragraph with ' },
      { _type: 'span', text: 'bold text', marks: ['strong'] },
      { _type: 'span', text: ' and a ' },
      {
        _type: 'span',
        text: 'link',
        marks: ['link-abc123']
      }
    ],
    markDefs: [
      {
        _key: 'link-abc123',
        _type: 'link',
        href: 'https://example.com'
      }
    ]
  },
  {
    _type: 'code',
    language: 'typescript',
    code: 'const greeting = "Hello World";'
  },
  {
    _type: 'image',
    asset: { _ref: 'image-xyz789' },
    alt: 'Screenshot of the interface',
    caption: 'The redesigned dashboard view'
  }
]
```

---

## Data Migration & Seeding

### Initial Content Setup

**Required for Launch**:
1. Create `siteSettings` singleton with site metadata
2. Create `navigation` singleton with menu items
3. Create at least 2-3 sample blog posts
4. Create at least 2-3 featured projects (with `selected: true`)
5. Create "About" page

**Optional for Launch**:
- Author document (use default author for now)
- Additional tags (can be created as needed)

### Content Import Strategy

**Phase 1**: Manual creation in Sanity Studio
- Site settings and navigation
- Initial featured projects
- About page

**Phase 2**: Bulk import via script (if needed)
- Historical blog posts from existing platform
- Use Sanity CLI or import API

---

## Query Patterns (GROQ)

### Common Queries

**Get all published posts (with excerpt)**:
```groq
*[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "coverImage": coverImage.asset->url,
  "tags": tags[]->{ title, "slug": slug.current }
}
```

**Get single post by slug**:
```groq
*[_type == "post" && slug.current == $slug][0] {
  title,
  publishedAt,
  body,
  "coverImage": coverImage.asset->url,
  "tags": tags[]->{ title, "slug": slug.current },
  seo
}
```

**Get featured projects**:
```groq
*[_type == "project" && selected == true] | order(_createdAt desc) {
  title,
  "slug": slug.current,
  description,
  role,
  "gallery": gallery[0].asset->url,
  technologies
}
```

**Get navigation items**:
```groq
*[_type == "navigation"][0] {
  items[]{ title, href, newTab }
}
```

**Get site settings**:
```groq
*[_type == "siteSettings"][0] {
  title,
  description,
  "ogImage": ogImage.asset->url,
  url,
  social
}
```

---

## Schema Implementation Checklist

- [ ] Create `apps/studio/schemas/` directory
- [ ] Implement `post.ts` schema with validation
- [ ] Implement `project.ts` schema with validation
- [ ] Implement `page.ts` schema with validation
- [ ] Implement `navigation.ts` schema (singleton)
- [ ] Implement `siteSettings.ts` schema (singleton)
- [ ] Implement `tag.ts` schema
- [ ] Create `index.ts` to export all schemas
- [ ] Register schemas in `sanity.config.ts`
- [ ] Test schema validation in Sanity Studio
- [ ] Seed initial content (settings, navigation, sample posts)
- [ ] Verify GROQ queries return expected data structure
