const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://afnizarnur.com"

interface ProjectSchemaProps {
    title: string
    description: string
    slug: string
    image?: string
    dateCreated?: string
    technologies?: string[]
    authorName?: string
}

/**
 * JSON-LD structured data for a CreativeWork/Project (Schema.org).
 * Helps search engines understand portfolio project content.
 */
export function ProjectSchema({
    title,
    description,
    slug,
    image,
    dateCreated,
    technologies = [],
    authorName = "Afnizar Nur Ghifari",
}: ProjectSchemaProps): JSX.Element {
    const schema = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: title,
        description,
        image,
        url: `${BASE_URL}/work/${slug}`,
        dateCreated,
        author: {
            "@type": "Person",
            name: authorName,
            url: BASE_URL,
        },
        keywords: technologies.join(", "),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
