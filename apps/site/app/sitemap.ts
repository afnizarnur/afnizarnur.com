import type { MetadataRoute } from "next"
import { getAllPostSlugs, getAllProjectSlugs } from "@/lib/sanity/queries"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://afnizarnur.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/work`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ]

    // Dynamic project pages
    let projectPages: MetadataRoute.Sitemap = []
    try {
        const projects = await getAllProjectSlugs()
        projectPages = projects.map((project) => ({
            url: `${BASE_URL}/work/${project.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        }))
    } catch (error) {
        console.error("Failed to fetch project slugs for sitemap:", error)
    }

    // Dynamic blog pages
    let postPages: MetadataRoute.Sitemap = []
    try {
        const posts = await getAllPostSlugs()
        postPages = posts.map((post) => ({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }))
    } catch (error) {
        console.error("Failed to fetch post slugs for sitemap:", error)
    }

    return [...staticPages, ...projectPages, ...postPages]
}
