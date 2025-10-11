/**
 * TypeScript Interface Contracts
 *
 * Feature: Portfolio Monorepo Infrastructure
 * Purpose: Define type contracts for all data structures used across the monorepo
 */

// =============================================================================
// PORTABLE TEXT TYPES
// =============================================================================

/**
 * Portable Text block (simplified)
 * Full type available from @portabletext/types
 */
export type PortableTextBlock = {
    _type: "block" | "code" | "image"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

// =============================================================================
// BLOG POST TYPES
// =============================================================================

/**
 * Blog post preview (for listing pages)
 */
export interface PostPreview {
    title: string
    slug: string
    publishedAt: string // ISO 8601 datetime string
    excerpt: string
    coverImage?: string // Sanity CDN URL
    coverImageAlt?: string
    tags?: TagPreview[]
}

/**
 * Full blog post (for detail pages)
 */
export interface Post {
    title: string
    slug: string
    publishedAt: string
    excerpt: string
    body: PortableTextBlock[]
    coverImage?: string
    coverImageAlt?: string
    tags?: TagPreview[]
    seo?: SEOMetadata
}

/**
 * Post slug for static path generation
 */
export interface PostSlug {
    slug: string
}

// =============================================================================
// PROJECT TYPES
// =============================================================================

/**
 * Project preview (for listing pages)
 */
export interface ProjectPreview {
    title: string
    slug: string
    description: string
    role: string[]
    selected?: boolean
    year?: number
    technologies?: string[]
    thumbnail?: string
    thumbnailAlt?: string
    links?: ProjectLink[]
}

/**
 * Featured project (for homepage)
 */
export interface FeaturedProject {
    title: string
    slug: string
    description: string
    role: string[]
    year?: number
    thumbnail?: string
    thumbnailAlt?: string
}

/**
 * Full project (for detail pages)
 */
export interface Project {
    title: string
    slug: string
    description: string
    role: string[]
    body: PortableTextBlock[]
    gallery?: ProjectImage[]
    links?: ProjectLink[]
    technologies?: string[]
    year?: number
    client?: string
    seo?: SEOMetadata
}

/**
 * Project image in gallery
 */
export interface ProjectImage {
    url: string
    alt?: string
    caption?: string
}

/**
 * Project external link
 */
export interface ProjectLink {
    label: string
    url: string
}

/**
 * Project slug for static path generation
 */
export interface ProjectSlug {
    slug: string
}

// =============================================================================
// PAGE TYPES
// =============================================================================

/**
 * Static page (About, Contact, etc.)
 */
export interface Page {
    title: string
    slug: string
    body: PortableTextBlock[]
    seo?: SEOMetadata
}

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

/**
 * Navigation menu structure (singleton)
 */
export interface Navigation {
    items: NavigationItem[]
}

/**
 * Single navigation link
 */
export interface NavigationItem {
    title: string
    href: string
    newTab?: boolean
}

// =============================================================================
// SITE SETTINGS TYPES
// =============================================================================

/**
 * Global site settings (singleton)
 */
export interface SiteSettings {
    title: string
    description: string
    ogImage?: string
    url?: string
    social?: SocialLinks
}

/**
 * Social media links
 */
export interface SocialLinks {
    twitter?: string
    github?: string
    linkedin?: string
    email?: string
}

// =============================================================================
// TAG TYPES
// =============================================================================

/**
 * Tag preview (for references in posts)
 */
export interface TagPreview {
    title: string
    slug: string
}

/**
 * Full tag (with post count)
 */
export interface Tag {
    title: string
    slug: string
    description?: string
    count: number // Number of posts with this tag
}

// =============================================================================
// SEO TYPES
// =============================================================================

/**
 * SEO metadata for pages
 */
export interface SEOMetadata {
    title?: string
    description?: string
    keywords?: string[]
}

/**
 * Full SEO data for page head
 * Combines document SEO with site defaults
 */
export interface PageSEO {
    title: string
    description: string
    ogImage?: string
    canonicalUrl?: string
    keywords?: string[]
    type?: "website" | "article"
    publishedTime?: string
    modifiedTime?: string
}

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

/**
 * Props for PostCard component
 */
export interface PostCardProps {
    title: string
    slug: string
    excerpt: string
    publishedAt: string
    coverImage?: string
    coverImageAlt?: string
    tags?: TagPreview[]
}

/**
 * Props for ProjectCard component
 */
export interface ProjectCardProps {
    title: string
    slug: string
    description: string
    role: string[]
    thumbnail?: string
    thumbnailAlt?: string
    year?: number
}

/**
 * Props for Navbar component
 */
export interface NavbarProps {
    items: NavigationItem[]
    currentPath?: string
}

/**
 * Props for Footer component
 */
export interface FooterProps {
    navigationItems?: NavigationItem[]
    socialLinks?: SocialLinks
}

/**
 * Props for SEO component (Astro)
 */
export interface SEOProps {
    title: string
    description: string
    ogImage?: string
    canonicalUrl?: string
    type?: "website" | "article"
    publishedTime?: string
}
