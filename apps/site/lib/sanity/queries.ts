import type {
    FeaturedProject,
    Navigation,
    Page,
    Post,
    PostPreview,
    PostSlug,
    Project,
    ProjectPreview,
    ProjectSlug,
    SiteSettings,
    Tag,
} from "@afnizarnur/ui"
import { sanityFetch } from "./fetch"
import { sanitizeNavigationItems, sanitizeSiteSettings } from "./sanitize"

// =============================================================================
// PROJECT QUERIES
// =============================================================================

/**
 * Get all projects for the work index page
 */
export async function getAllProjects(): Promise<ProjectPreview[]> {
    try {
        const query = `*[_type == "project"] | order(_createdAt desc) {
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
    }`

        const projects = await sanityFetch<ProjectPreview[]>({
            query,
            params: {},
            tags: ["projects"],
            revalidate: 3600,
        })
        return projects || []
    } catch (error) {
        console.error("Failed to fetch all projects:", error)
        return []
    }
}

/**
 * Get featured projects for homepage
 */
export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
    try {
        const query = `*[_type == "project" && selected == true] | order(_createdAt desc) {
      title,
      "slug": slug.current,
      description,
      role,
      year,
      "thumbnail": gallery[0].asset->url,
      "thumbnailAlt": gallery[0].alt
    }`

        const projects = await sanityFetch<FeaturedProject[]>({
            query,
            params: {},
            tags: ["projects", "featured"],
            revalidate: 3600,
        })
        return projects || []
    } catch (error) {
        console.error("Failed to fetch featured projects:", error)
        return []
    }
}

/**
 * Get single project by slug for detail page
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
    try {
        const query = `*[_type == "project" && slug.current == $slug][0] {
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
    }`

        const project = await sanityFetch<Project>({
            query,
            params: { slug },
            tags: [`project-${slug}`],
            revalidate: 3600,
        })
        return project || null
    } catch (error) {
        console.error(`Failed to fetch project with slug "${slug}":`, error)
        return null
    }
}

/**
 * Get all project slugs for static path generation
 */
export async function getAllProjectSlugs(): Promise<ProjectSlug[]> {
    try {
        const query = `*[_type == "project"] {
      "slug": slug.current
    }`

        const slugs = await sanityFetch<ProjectSlug[]>({
            query,
            params: {},
            tags: ["projects"],
            revalidate: 3600,
        })
        return slugs || []
    } catch (error) {
        console.error("Failed to fetch project slugs:", error)
        return []
    }
}

// =============================================================================
// BLOG POST QUERIES
// =============================================================================

/**
 * Get all published posts for blog index
 * Only shows posts with publishedAt <= now() (supports scheduled posts)
 */
export async function getAllPosts(): Promise<PostPreview[]> {
    try {
        const query = `*[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
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
    }`

        const posts = await sanityFetch<PostPreview[]>({
            query,
            params: {},
            tags: ["posts"],
            revalidate: 3600,
        })
        return posts || []
    } catch (error) {
        console.error("Failed to fetch all posts:", error)
        return []
    }
}

/**
 * Get single post by slug for detail page
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
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
    }`

        const post = await sanityFetch<Post>({
            query,
            params: { slug },
            tags: [`post-${slug}`],
            revalidate: 3600,
        })
        return post || null
    } catch (error) {
        console.error(`Failed to fetch post with slug "${slug}":`, error)
        return null
    }
}

/**
 * Get all post slugs for static path generation
 */
export async function getAllPostSlugs(): Promise<PostSlug[]> {
    try {
        const query = `*[_type == "post"] {
      "slug": slug.current
    }`

        const slugs = await sanityFetch<PostSlug[]>({
            query,
            params: {},
            tags: ["posts"],
            revalidate: 3600,
        })
        return slugs || []
    } catch (error) {
        console.error("Failed to fetch post slugs:", error)
        return []
    }
}

// =============================================================================
// PAGE QUERIES
// =============================================================================

/**
 * Get static page by slug
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
    try {
        const query = `*[_type == "page" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      body,
      seo {
        title,
        description,
        keywords
      }
    }`

        const page = await sanityFetch<Page>({
            query,
            params: { slug },
            tags: [`page-${slug}`],
            revalidate: 86400,
        })
        return page || null
    } catch (error) {
        console.error(`Failed to fetch page with slug "${slug}":`, error)
        return null
    }
}

// =============================================================================
// NAVIGATION & SETTINGS QUERIES
// =============================================================================

/**
 * Get navigation items
 */
export async function getNavigation(): Promise<Navigation | null> {
    try {
        const query = `*[_type == "navigation"][0] {
      items[] {
        title,
        href,
        newTab
      }
    }`

        const navigation = await sanityFetch<Navigation>({
            query,
            params: {},
            tags: ["navigation"],
            revalidate: 86400,
        })

        if (!navigation) return null

        // Sanitize navigation items to remove unwanted whitespace/characters
        return {
            ...navigation,
            items: sanitizeNavigationItems(navigation.items),
        }
    } catch (error) {
        console.error("Failed to fetch navigation:", error)
        return null
    }
}

/**
 * Get site settings
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
    try {
        const query = `*[_type == "siteSettings"][0] {
      title,
      description,
      logo {
        type,
        text,
        "image": {
          "url": image.asset->url,
          "alt": image.alt
        }
      },
      "ogImage": ogImage.asset->url,
      url,
      social {
        twitter,
        github,
        linkedin,
        email
      },
      timezone {
        timeZone,
        displayLabel
      }
    }`

        const settings = await sanityFetch<SiteSettings>({
            query,
            params: {},
            tags: ["settings"],
            revalidate: 86400,
        })

        // Sanitize settings to remove unwanted whitespace/characters
        return sanitizeSiteSettings(settings)
    } catch (error) {
        console.error("Failed to fetch site settings:", error)
        return null
    }
}

// =============================================================================
// TAG QUERIES
// =============================================================================

/**
 * Get all tags with post count (future enhancement)
 */
export async function getAllTags(): Promise<Tag[]> {
    try {
        const query = `*[_type == "tag"] | order(title asc) {
      title,
      "slug": slug.current,
      description,
      "count": count(*[_type == "post" && references(^._id)])
    }`

        const tags = await sanityFetch<Tag[]>({
            query,
            params: {},
            tags: ["tags"],
            revalidate: 3600,
        })
        return tags || []
    } catch (error) {
        console.error("Failed to fetch tags:", error)
        return []
    }
}

/**
 * Get posts by tag (future enhancement)
 */
export async function getPostsByTag(tagSlug: string): Promise<PostPreview[]> {
    try {
        const query = `*[_type == "post" && publishedAt <= now() && references(*[_type == "tag" && slug.current == $tagSlug]._id)] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "coverImage": coverImage.asset->url
    }`

        const posts = await sanityFetch<PostPreview[]>({
            query,
            params: { tagSlug },
            tags: [`tag-${tagSlug}`, "posts"],
            revalidate: 3600,
        })
        return posts || []
    } catch (error) {
        console.error(`Failed to fetch posts for tag "${tagSlug}":`, error)
        return []
    }
}
