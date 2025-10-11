import type { ProjectCardProps } from "../types"
import { Card } from "./Card"

/**
 * ProjectCard component for displaying project previews
 * Used in homepage and work index page
 */
export function ProjectCard({
    title,
    slug,
    description,
    role,
    thumbnail,
    thumbnailAlt,
    year,
}: ProjectCardProps) {
    return (
        <Card href={`/work/${slug}`} className="group">
            {thumbnail && (
                <div className="mb-4 overflow-hidden rounded-md">
                    <img
                        src={`${thumbnail}?w=800&h=500&fit=crop&auto=format`}
                        alt={thumbnailAlt || title}
                        className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
            )}

            <div className="space-y-2">
                {year && <p className="text-sm text-neutral-500">{year}</p>}

                <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600">
                    {title}
                </h3>

                <p className="text-neutral-600">{description}</p>

                {role && role.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {role.map((r) => (
                            <span
                                key={r}
                                className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700"
                            >
                                {r}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    )
}
