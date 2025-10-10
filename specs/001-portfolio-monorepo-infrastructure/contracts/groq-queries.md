# GROQ Query Contracts

**Feature**: Portfolio Monorepo Infrastructure
**Date**: 2025-10-10
**Purpose**: Define all GROQ queries used to fetch data from Sanity CMS

## Overview

This document specifies the exact GROQ queries used throughout the application. These queries serve as the contract between Sanity CMS and the Astro frontend.

---

## Blog Queries

### 1. Get All Published Posts

**Function**: `getAllPosts()`
**Location**: `apps/web/src/server/data.ts`
**Purpose**: Fetch all published blog posts for the blog index page

**Query**:
```groq
*[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  "tags": tags[]->{
    title,
    "slug": slug.current
  }
}
```

**Return Type**:
```typescript
interface PostPreview {
  title: string
  slug: string
  publishedAt: string  // ISO 8601 datetime
  excerpt: string
  coverImage?: string  // Sanity CDN URL
  coverImageAlt?: string
  tags?: Array<{
    title: string
    slug: string
  }>
}
```

**Usage**:
- Blog index page (`/blog`)
- Homepage recent posts section

---

### 2. Get Post by Slug

**Function**: `getPostBySlug(slug: string)`
**Location**: `apps/web/src/server/data.ts`
**Purpose**: Fetch a single blog post for the detail page

**Query**:
```groq
*[_type == "post" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  body,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  "tags": tags[]->{
    title,
    "slug": slug.current
  },
  seo {
    title,
    description,
    keywords
  }
}
```

**Parameters**:
```typescript
{
  slug: string  // URL slug (e.g., "building-design-system")
}
```

**Return Type**:
```typescript
interface Post {
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  body: PortableTextBlock[]  // Sanity Portable Text array
  coverImage?: string
  coverImageAlt?: string
  tags?: Array<{
    title: string
    slug: string
  }>
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}
```

**Usage**:
- Blog post detail page (`/blog/[slug]`)

---

### 3. Get All Post Slugs

**Function**: `getAllPostSlugs()`
**Location**: `apps/web/src/server/data.ts`
**Purpose**: Generate static paths for all blog post pages

**Query**:
```groq
*[_type == "post"] {
  "slug": slug.current
}
```

**Return Type**:
```typescript
interface PostSlug {
  slug: string
}
```

**Usage**:
- `getStaticPaths()` in `src/pages/blog/[slug].astro`

---

## Project Queries

### 4. Get All Projects

**Function**: `getAllProjects()`
**Location**: `apps/web/src/server/data.ts`
**Purpose**: Fetch all projects for the work index page

**Query**:
```groq
*[_type == "project"] | order(_createdAt desc) {
  title,
  "slug": slug.current,
  description,
  role,
  selected,
  year,
  technologies,
  "thumbnail": gallery[0].asset->url,
  "thumbnailAlt": gallery[0].alt,
  links
}
```

**Return Type**:
```typescript
interface ProjectPreview {
  title: string
  slug: string
  description: string
  role: string[]
  selected?: boolean
  year?: number
  technologies?: string[]
  thumbnail?: string
  thumbnailAlt?: string
  links?: Array<{
    label: string
    url: string
  }>
}
```

**Usage**:
- Work index page (`/work`)

---

### 5. Get Featured Projects

**Function**: `getFeaturedProjects()`
**Location**: `apps/web/src/server/data.ts`
**Purpose**: Fetch only selected/featured projects for homepage

**Query**:
```groq
*[_type == "project" && selected == true] | order(_createdAt desc) {
  title,
  "slug": slug.current,
  description,
  role,
  year,
  "thumbnail": gallery[0].asset->url,
  "thumbnailAlt": gallery[0].alt
}
```

**Return Type**:
```typescript
interface FeaturedProject {
  title: string
  slug: string
  description: string
  role: string[]
  year?: number
  thumbnail?: string
  thumbnailAlt?: string
}
```

**Usage**:
- Homepage featured work section

---

### 6. Get Project by Slug

**Function**: `getProjectBySlug(slug: string)`
**Location**: `apps/web/src/server/data.ts`
**Purpose**: Fetch a single project for the detail page

**Query**:
```groq
*[_type == "project" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  description,
  role,
  body,
  gallery[] {
    "url": asset->url,
    alt,
    caption
  },
  links[] {
    label,
    url
  },
  technologies,
  year,
  client,
  seo {
    title,
    description,
    keywords
  }
}
```

**Parameters**:
```typescript
{
  slug: string  // URL slug (e.g., "acme-ecommerce-redesign")
}
```

**Return Type**:
```typescript
interface Project {
  title: string
  slug: string
  description: string
  role: string[]
  body: PortableTextBlock[]
  gallery?: Array<{
    url: string
    alt?: string
    caption?: string
  }>
  links?: Array<{
    label: string
    url: string
  }>
  technologies?: string[]
  year?: number
  client?: string
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}
```

**Usage**:
- Project detail page (`/work/[slug]`)

---

### 7. Get All Project Slugs

**Function**: `getAllProjectSlugs()`
**Location**: `apps/web/src/server/data.ts`
**Purpose**: Generate static paths for all project pages

**Query**:
```groq
*[_type == "project"] {
  "slug": slug.current
}
```

**Return Type**:
```typescript
interface ProjectSlug {
  slug: string
}
```

**Usage**:
- `getStaticPaths()` in `src/pages/work/[slug].astro`

---

## Page Queries

### 8. Get Page by Slug

**Function**: `getPageBySlug(slug: string)`
**Location**: `apps/web/src/server/data.ts`
**Purpose**: Fetch a static page (About, Contact, etc.)

**Query**:
```groq
*[_type == "page" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  body,
  seo {
    title,
    description,
    keywords
  }
}
```

**Parameters**:
```typescript
{
  slug: string  // URL slug (e.g., "about")
}
```

**Return Type**:
```typescript
interface Page {
  title: string
  slug: string
  body: PortableTextBlock[]
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}
```

**Usage**:
- Static pages like `/about`, `/contact`

---

## Navigation Queries

### 9. Get Navigation Items

**Function**: `getNavigation()`
**Location**: `apps/web/src/server/data.ts`
**Purpose**: Fetch site navigation menu items

**Query**:
```groq
*[_type == "navigation"][0] {
  items[] {
    title,
    href,
    newTab
  }
}
```

**Return Type**:
```typescript
interface Navigation {
  items: Array<{
    title: string
    href: string
    newTab?: boolean
  }>
}
```

**Usage**:
- Global navigation component (Navbar, Footer)
- Used in BaseLayout

---

## Site Settings Queries

### 10. Get Site Settings

**Function**: `getSiteSettings()`
**Location**: `apps/web/src/server/data.ts`
**Purpose**: Fetch global site metadata for SEO and social

**Query**:
```groq
*[_type == "siteSettings"][0] {
  title,
  description,
  "ogImage": ogImage.asset->url,
  url,
  social {
    twitter,
    github,
    linkedin,
    email
  }
}
```

**Return Type**:
```typescript
interface SiteSettings {
  title: string
  description: string
  ogImage?: string
  url?: string
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
    email?: string
  }
}
```

**Usage**:
- SEO component in `<head>`
- Footer social links
- Homepage metadata

---

## Tag Queries

### 11. Get All Tags

**Function**: `getAllTags()`
**Location**: `apps/web/src/server/data.ts`
**Purpose**: Fetch all available tags for filtering

**Query**:
```groq
*[_type == "tag"] | order(title asc) {
  title,
  "slug": slug.current,
  description,
  "count": count(*[_type == "post" && references(^._id)])
}
```

**Return Type**:
```typescript
interface Tag {
  title: string
  slug: string
  description?: string
  count: number  // Number of posts with this tag
}
```

**Usage**:
- Tag filter UI (future enhancement)
- Blog sidebar or footer

---

### 12. Get Posts by Tag

**Function**: `getPostsByTag(tagSlug: string)`
**Location**: `apps/web/src/server/data.ts`
**Purpose**: Fetch all posts with a specific tag (future enhancement)

**Query**:
```groq
*[_type == "post" && publishedAt <= now() && references(*[_type == "tag" && slug.current == $tagSlug]._id)] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "coverImage": coverImage.asset->url
}
```

**Parameters**:
```typescript
{
  tagSlug: string  // Tag slug (e.g., "design-systems")
}
```

**Return Type**:
```typescript
interface PostPreview {
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  coverImage?: string
}
```

**Usage**:
- Tag archive page `/blog/tag/[slug]` (future)

---

## Query Optimization Notes

### Image Asset URLs

All image references use `asset->url` projection to fetch the CDN URL directly. Additional transformations can be added via query parameters:

```typescript
// Example: Resize image to 800px width
`${coverImage}?w=800&auto=format`

// Example: Generate responsive srcset
`${coverImage}?w=400&auto=format 400w, ${coverImage}?w=800&auto=format 800w`
```

### Reference Expansion

Tags are expanded using `tags[]->{ ... }` to fetch full tag objects:

```groq
// This expands each tag reference to include tag details
"tags": tags[]->{ title, "slug": slug.current }
```

### Pagination (Future Enhancement)

For large datasets, add pagination using slice operator:

```groq
// Get posts 0-9 (first page)
*[_type == "post"][0...10]

// Get posts 10-19 (second page)
*[_type == "post"][10...20]
```

---

## Error Handling

All query functions should handle these cases:

1. **No results found**: Return `null` or empty array `[]`
2. **Invalid slug**: Return `null` (not throw error)
3. **Network errors**: Log error and return fallback/cached data
4. **Missing fields**: Use optional chaining and provide defaults

**Example**:
```typescript
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await sanity.fetch(QUERY, { slug })
    return post || null
  } catch (error) {
    console.error('Failed to fetch post:', error)
    return null
  }
}
```

---

## Query Testing Checklist

- [ ] Test each query in Sanity Vision/Playground
- [ ] Verify all fields are projected correctly
- [ ] Test with missing optional fields (e.g., no cover image)
- [ ] Test with empty references (e.g., no tags)
- [ ] Test with non-existent slug (should return null)
- [ ] Test with singleton documents (navigation, settings)
- [ ] Verify image URLs are valid Sanity CDN URLs
- [ ] Check query performance (use profiling for large datasets)
