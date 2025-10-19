import type { PostCardProps } from "@afnizarnur/ui"
import Image from "next/image"
import Link from "next/link"

export function PostCard({
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage,
    coverImageAlt,
    tags,
}: PostCardProps): JSX.Element {
    const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <Link
            href={`/blog/${slug}`}
            className="group relative block overflow-hidden rounded-3xl border border-border-secondary bg-gradient-to-br from-bgColor-secondary to-bgColor-primary p-24 transition-transform duration-200 hover:translate-y-1 hover:shadow-lg"
        >
            <div className="space-y-16">
                {coverImage && (
                    <div className="overflow-hidden rounded-2xl relative w-full aspect-video">
                        <Image
                            src={`${coverImage}?w=800&h=400&fit=crop&auto=format`}
                            alt={coverImageAlt || title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                )}

                <div className="space-y-8">
                    <time className="text-sm text-text-tertiary" dateTime={publishedAt}>
                        {formattedDate}
                    </time>

                    <h3 className="text-xl font-semibold text-text-primary transition-colors group-hover:text-text-accent-primary">
                        {title}
                    </h3>

                    <p className="text-text-secondary">{excerpt}</p>

                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-8 pt-8">
                            {tags.map((tag) => (
                                <span
                                    key={tag.slug}
                                    className="inline-flex items-center gap-8 rounded-full bg-background-secondary px-12 py-4 text-xs font-medium text-text-primary"
                                >
                                    {tag.title}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}
