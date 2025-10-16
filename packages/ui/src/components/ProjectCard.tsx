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
        <Card href={`/work/${slug}`} className="group space-y-16">
            {thumbnail && (
                <div className="overflow-hidden rounded-2xl">
                    <img
                        src={`${thumbnail}?w=800&h=500&fit=crop&auto=format`}
                        alt={thumbnailAlt || title}
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
            )}

            <div className="space-y-8">
                {year && <p className="text-sm text-fgColor-tertiary">{year}</p>}

                <h3 className="text-xl font-semibold text-fgColor-primary transition-colors group-hover:text-fgColor-accent-primary">
                    {title}
                </h3>

                <p className="text-fgColor-secondary">{description}</p>

                {role && role.length > 0 && (
                    <div className="flex flex-wrap gap-8 pt-8">
                        {role.map((r) => (
                            <span key={r} className="chip">
                                {r}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    )
}
