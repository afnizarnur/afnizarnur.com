/**
 * TypeScript Interface Contracts
 *
 * Feature: Portfolio Monorepo Infrastructure
 * Date: 2025-10-10
 * Purpose: Define type contracts for all data structures used across the monorepo
 *
 * These interfaces serve as the contract between:
 * - Sanity CMS data fetching (apps/web/src/server/data.ts)
 * - Astro pages and components
 * - React UI components (@afnizarnur/ui)
 */

// =============================================================================
// SANITY DOCUMENT TYPES
// =============================================================================

/**
 * Base interface for all Sanity documents
 */
interface SanityDocument {
    _id: string
    _type: string
    _createdAt: string
    _updatedAt: string
    _rev: string
}

/**
 * Sanity slug field structure
 */
interface Slug {
    _type: "slug"
    current: string
}

/**
 * Sanity image asset reference
 */
interface ImageAsset {
    _type: "image"
    asset: {
        _ref: string
        _type: "reference"
    }
    alt?: string
    caption?: string
}

/**
 * Portable Text block (simplified)
 * Full type available from @portabletext/types
 */
type PortableTextBlock = {
    _type: "block" | "code" | "image"
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

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Date formatting options
 */
export type DateFormat = "full" | "short" | "relative"

/**
 * Responsive breakpoint sizes (from design tokens)
 */
export type Breakpoint = "mobile" | "tablet" | "desktop"

/**
 * Theme mode (future dark mode support)
 */
export type ThemeMode = "light" | "dark" | "system"

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
    data: T | null
    error?: string
}

/**
 * Paginated response (future enhancement)
 */
export interface PaginatedResponse<T> {
    items: T[]
    total: number
    page: number
    pageSize: number
    hasMore: boolean
}

// =============================================================================
// DATA FETCHING FUNCTION SIGNATURES
// =============================================================================

/**
 * Type signatures for all data fetching functions
 * Located in apps/web/src/server/data.ts
 */
export interface DataAPI {
    // Blog posts
    getAllPosts(): Promise<PostPreview[]>
    getPostBySlug(slug: string): Promise<Post | null>
    getAllPostSlugs(): Promise<PostSlug[]>
    getPostsByTag(tagSlug: string): Promise<PostPreview[]> // Future

    // Projects
    getAllProjects(): Promise<ProjectPreview[]>
    getFeaturedProjects(): Promise<FeaturedProject[]>
    getProjectBySlug(slug: string): Promise<Project | null>
    getAllProjectSlugs(): Promise<ProjectSlug[]>

    // Pages
    getPageBySlug(slug: string): Promise<Page | null>

    // Navigation & Settings
    getNavigation(): Promise<Navigation | null>
    getSiteSettings(): Promise<SiteSettings | null>

    // Tags
    getAllTags(): Promise<Tag[]>
}

// =============================================================================
// CONFIGURATION TYPES
// =============================================================================

/**
 * Sanity client configuration
 */
export interface SanityConfig {
    projectId: string
    dataset: string
    apiVersion: string
    useCdn: boolean
    token?: string
}

/**
 * Astro site configuration (subset)
 */
export interface SiteConfig {
    site: string // Production URL
    base?: string // Base path
    trailingSlash?: "always" | "never" | "ignore"
}

// =============================================================================
// ERROR TYPES
// =============================================================================

/**
 * Custom error for data fetching failures
 */
export class DataFetchError extends Error {
    constructor(
        message: string,
        public readonly query: string,
        public readonly cause?: unknown
    ) {
        super(message)
        this.name = "DataFetchError"
    }
}

/**
 * Error boundary props (React)
 */
export interface ErrorBoundaryProps {
    fallback?: React.ReactNode
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

// =============================================================================
// TYPE GUARDS
// =============================================================================

/**
 * Type guard to check if a value is a valid Post
 */
export function isPost(value: unknown): value is Post {
    return (
        typeof value === "object" &&
        value !== null &&
        "title" in value &&
        "slug" in value &&
        "body" in value
    )
}

/**
 * Type guard to check if a value is a valid Project
 */
export function isProject(value: unknown): value is Project {
    return (
        typeof value === "object" &&
        value !== null &&
        "title" in value &&
        "slug" in value &&
        "description" in value &&
        "role" in value
    )
}

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Reserved route slugs that cannot be used for pages
 */
export const RESERVED_SLUGS = ["blog", "work", "about", "api", "admin"] as const
export type ReservedSlug = (typeof RESERVED_SLUGS)[number]

/**
 * Supported content types
 */
export const CONTENT_TYPES = ["post", "project", "page"] as const
export type ContentType = (typeof CONTENT_TYPES)[number]

/**
 * Default SEO values
 */
export const DEFAULT_SEO = {
    titleTemplate: "%s | Afnizar Nur Ghifari",
    description:
        "Portfolio and blog of Afnizar Nur Ghifari, showcasing design systems, frontend development, and product design work.",
    ogImageWidth: 1200,
    ogImageHeight: 630,
} as const
