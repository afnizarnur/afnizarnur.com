import type { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://afnizarnur.com"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/studio/", "/_next/"],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    }
}
