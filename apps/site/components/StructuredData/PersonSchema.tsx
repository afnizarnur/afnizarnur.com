const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://afnizarnur.com"

interface PersonSchemaProps {
    name?: string
    jobTitle?: string
    description?: string
    image?: string
    sameAs?: string[]
}

/**
 * JSON-LD structured data for a Person (Schema.org).
 * Helps search engines understand the site owner's identity.
 */
export function PersonSchema({
    name = "Afnizar Nur Ghifari",
    jobTitle = "Product Designer",
    description = "Product Designer crafting digital experiences",
    image,
    sameAs = [
        "https://github.com/afnizarnur",
        "https://linkedin.com/in/afnizarnur",
        "https://figma.com/@afnizarnur",
    ],
}: PersonSchemaProps): JSX.Element {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        url: BASE_URL,
        jobTitle,
        description,
        image,
        sameAs,
        knowsAbout: ["Product Design", "UI/UX", "Design Systems", "Figma"],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
