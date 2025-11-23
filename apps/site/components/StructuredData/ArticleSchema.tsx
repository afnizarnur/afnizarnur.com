const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://afnizarnur.com"

interface ArticleSchemaProps {
    title: string
    description: string
    slug: string
    publishedAt: string
    updatedAt?: string
    image?: string
    authorName?: string
}

/**
 * JSON-LD structured data for an Article (Schema.org).
 * Helps search engines understand blog post content.
 */
export function ArticleSchema({
    title,
    description,
    slug,
    publishedAt,
    updatedAt,
    image,
    authorName = "Afnizar Nur Ghifari",
}: ArticleSchemaProps): JSX.Element {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image,
        datePublished: publishedAt,
        dateModified: updatedAt || publishedAt,
        url: `${BASE_URL}/blog/${slug}`,
        author: {
            "@type": "Person",
            name: authorName,
            url: BASE_URL,
        },
        publisher: {
            "@type": "Person",
            name: authorName,
            url: BASE_URL,
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
