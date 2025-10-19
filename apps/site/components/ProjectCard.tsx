import type { ProjectCardProps } from "@afnizarnur/ui"
import Link from "next/link"

export function ProjectCard({
    title,
    slug,
    description,
    role,
    thumbnail,
    thumbnailAlt,
    year,
}: ProjectCardProps): JSX.Element {
    return (
        <Link
            href={`/work/${slug}`}
            className="group relative block overflow-hidden rounded-3xl border border-border-secondary bg-gradient-to-br from-bgColor-secondary to-bgColor-primary p-24 transition-transform duration-200 hover:translate-y-1 hover:shadow-lg"
        >
            <div className="space-y-16">
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
                    {year && <p className="text-sm text-text-tertiary">{year}</p>}

                    <h3 className="text-xl font-semibold text-text-primary transition-colors group-hover:text-text-accent-primary">
                        {title}
                    </h3>

                    <p className="text-text-secondary">{description}</p>

                    {role && role.length > 0 && (
                        <div className="flex flex-wrap gap-8 pt-8">
                            {role.map((r) => (
                                <span
                                    key={r}
                                    className="inline-flex items-center gap-8 rounded-full bg-background-secondary px-12 py-4 text-xs font-medium text-text-primary"
                                >
                                    {r}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}
