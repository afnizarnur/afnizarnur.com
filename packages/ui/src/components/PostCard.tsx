import type { PostCardProps } from "../types"
import { Card } from "./Card"

/**
 * PostCard component for displaying blog post previews
 * Used in blog index page
 */
export function PostCard({
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage,
    coverImageAlt,
    tags,
}: PostCardProps) {
    const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <Card href={`/blog/${slug}`} className="group space-y-16">
            {coverImage && (
                <div className="overflow-hidden rounded-2xl">
                    <img
                        src={`${coverImage}?w=800&h=400&fit=crop&auto=format`}
                        alt={coverImageAlt || title}
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
            )}

            <div className="space-y-8">
                <time className="text-sm text-fgColor-tertiary" dateTime={publishedAt}>
                    {formattedDate}
                </time>

                <h3 className="text-xl font-semibold text-fgColor-primary transition-colors group-hover:text-fgColor-accent-primary">
                    {title}
                </h3>

                <p className="text-fgColor-secondary">{excerpt}</p>

                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-8 pt-8">
                        {tags.map((tag) => (
                            <span key={tag.slug} className="chip">
                                {tag.title}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    )
}
