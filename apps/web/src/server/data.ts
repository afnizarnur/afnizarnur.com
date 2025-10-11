import { sanity } from './sanity';
import type {
  PostPreview,
  Post,
  PostSlug,
  ProjectPreview,
  FeaturedProject,
  Project,
  ProjectSlug,
  Page,
  Navigation,
  SiteSettings,
  Tag,
} from '@afnizarnur/ui';

// =============================================================================
// PROJECT QUERIES
// =============================================================================

/**
 * T054: Get all projects for the work index page
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
    }`;

    const projects = await sanity.fetch<ProjectPreview[]>(query);
    return projects || [];
  } catch (error) {
    console.error('Failed to fetch all projects:', error);
    return [];
  }
}

/**
 * T054: Get featured projects for homepage
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
    }`;

    const projects = await sanity.fetch<FeaturedProject[]>(query);
    return projects || [];
  } catch (error) {
    console.error('Failed to fetch featured projects:', error);
    return [];
  }
}

/**
 * T056: Get single project by slug for detail page
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
    }`;

    const project = await sanity.fetch<Project>(query, { slug });
    return project || null;
  } catch (error) {
    console.error(`Failed to fetch project with slug "${slug}":`, error);
    return null;
  }
}

/**
 * T057: Get all project slugs for static path generation
 */
export async function getAllProjectSlugs(): Promise<ProjectSlug[]> {
  try {
    const query = `*[_type == "project"] {
      "slug": slug.current
    }`;

    const slugs = await sanity.fetch<ProjectSlug[]>(query);
    return slugs || [];
  } catch (error) {
    console.error('Failed to fetch project slugs:', error);
    return [];
  }
}

// =============================================================================
// BLOG POST QUERIES
// =============================================================================

/**
 * T069: Get all published posts for blog index
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
    }`;

    const posts = await sanity.fetch<PostPreview[]>(query);
    return posts || [];
  } catch (error) {
    console.error('Failed to fetch all posts:', error);
    return [];
  }
}

/**
 * T070: Get single post by slug for detail page
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
    }`;

    const post = await sanity.fetch<Post>(query, { slug });
    return post || null;
  } catch (error) {
    console.error(`Failed to fetch post with slug "${slug}":`, error);
    return null;
  }
}

/**
 * T071: Get all post slugs for static path generation
 */
export async function getAllPostSlugs(): Promise<PostSlug[]> {
  try {
    const query = `*[_type == "post"] {
      "slug": slug.current
    }`;

    const slugs = await sanity.fetch<PostSlug[]>(query);
    return slugs || [];
  } catch (error) {
    console.error('Failed to fetch post slugs:', error);
    return [];
  }
}

// =============================================================================
// PAGE QUERIES
// =============================================================================

/**
 * T080: Get static page by slug
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
    }`;

    const page = await sanity.fetch<Page>(query, { slug });
    return page || null;
  } catch (error) {
    console.error(`Failed to fetch page with slug "${slug}":`, error);
    return null;
  }
}

// =============================================================================
// NAVIGATION & SETTINGS QUERIES
// =============================================================================

/**
 * T078: Get navigation items
 */
export async function getNavigation(): Promise<Navigation | null> {
  try {
    const query = `*[_type == "navigation"][0] {
      items[] {
        title,
        href,
        newTab
      }
    }`;

    const navigation = await sanity.fetch<Navigation>(query);
    return navigation || null;
  } catch (error) {
    console.error('Failed to fetch navigation:', error);
    return null;
  }
}

/**
 * T079: Get site settings
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const query = `*[_type == "siteSettings"][0] {
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
    }`;

    const settings = await sanity.fetch<SiteSettings>(query);
    return settings || null;
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return null;
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
    }`;

    const tags = await sanity.fetch<Tag[]>(query);
    return tags || [];
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
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
    }`;

    const posts = await sanity.fetch<PostPreview[]>(query, { tagSlug });
    return posts || [];
  } catch (error) {
    console.error(`Failed to fetch posts for tag "${tagSlug}":`, error);
    return [];
  }
}
