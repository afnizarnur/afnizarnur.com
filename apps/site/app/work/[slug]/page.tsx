import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/sanity/queries"
import { PageHeader } from "@/components/PageHeader"
import { PortableText } from "@/components/PortableText"

interface WorkProjectPageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const slugs = await getAllProjectSlugs()
    return slugs.map((item) => ({
        slug: item.slug,
    }))
}

export async function generateMetadata({ params }: WorkProjectPageProps): Promise<Metadata> {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        return {}
    }

    const ogImage = project.gallery && project.gallery.length > 0 ? project.gallery[0].url : undefined

    return {
        title: project.seo?.title || project.title,
        description: project.seo?.description || project.description,
        openGraph: {
            type: "article",
            images: ogImage ? [{ url: ogImage }] : [],
        },
    }
}

export default async function WorkProjectPage({ params }: WorkProjectPageProps): Promise<JSX.Element> {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    const headerActions =
        project.links?.map((link, index) => ({
            href: link.url,
            label: link.label,
            variant: index === 0 ? ("primary" as const) : ("secondary" as const),
            external: true,
        })) ?? []

    const hasRole = project.role && project.role.length > 0
    const hasClient = Boolean(project.client)
    const hasTechnologies = project.technologies && project.technologies.length > 0

    return (
        <article className="mx-auto max-w-7xl px-16 py-60 sm:px-24 lg:px-32">
            <div className="mx-auto max-w-4xl">
                {/* Project Header */}
                <PageHeader
                    title={project.title}
                    description={project.description}
                    actions={headerActions}
                    eyebrow={
                        project.year ? (
                            <span className="text-sm font-semibold uppercase tracking-wide text-text-tertiary">
                                {project.year}
                            </span>
                        ) : undefined
                    }
                    meta={
                        hasRole || hasClient || hasTechnologies ? (
                            <div className="grid gap-16 md:grid-cols-2">
                                {hasRole && (
                                    <div className="flex flex-col gap-8">
                                        <p className="text-sm font-semibold text-text-primary">Role</p>
                                        <p className="text-sm text-text-secondary">{project.role!.join(", ")}</p>
                                    </div>
                                )}

                                {hasClient && (
                                    <div className="flex flex-col gap-8">
                                        <p className="text-sm font-semibold text-text-primary">Client</p>
                                        <p className="text-sm text-text-secondary">{project.client}</p>
                                    </div>
                                )}

                                {hasTechnologies && (
                                    <div className="flex flex-col gap-8">
                                        <p className="text-sm font-semibold text-text-primary">Technologies</p>
                                        <div className="flex flex-wrap gap-8">
                                            {project.technologies!.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="inline-flex items-center gap-8 rounded-full bg-background-secondary px-12 py-4 text-xs font-medium text-text-primary"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : undefined
                    }
                />

                {/* Project Content */}
                <div className="prose prose-lg prose-neutral max-w-none">
                    <PortableText value={project.body} />
                </div>

                {/* Gallery */}
                {project.gallery && project.gallery.length > 1 && (
                    <div className="mt-48">
                        <h2 className="mb-24 text-2xl font-bold text-text-primary">Gallery</h2>
                        <div className="grid grid-cols-1 gap-24 md:grid-cols-2">
                            {project.gallery.slice(1).map((image, index) => (
                                <figure key={index}>
                                    <img
                                        src={`${image.url}?w=800&auto=format`}
                                        alt={image.alt || ""}
                                        className="rounded-lg"
                                        loading="lazy"
                                    />
                                    {image.caption && (
                                        <figcaption className="mt-8 text-sm text-text-tertiary">
                                            {image.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}
