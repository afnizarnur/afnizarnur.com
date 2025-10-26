import type { Metadata } from "next"
import { PageHeader } from "@/components/PageHeader"
import { ProjectCard } from "@/components/ProjectCard"
import { getAllProjects } from "@/lib/sanity/queries"

export const metadata: Metadata = {
    title: "Work",
    description: "Browse my portfolio of projects, case studies, and design work.",
}

export default async function WorkPage(): Promise<JSX.Element> {
    const projects = await getAllProjects()

    return (
        <section className="mx-auto max-w-7xl px-16 py-60 sm:px-24 lg:px-32">
            <PageHeader
                eyebrow="Case Studies"
                title="Work"
                description="Selected projects and case studies showcasing my design and development work."
            />

            {projects && projects.length > 0 ? (
                <div className="grid grid-cols-1 gap-24 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.slug}
                            title={project.title}
                            slug={project.slug}
                            description={project.description}
                            role={project.role}
                            thumbnail={project.thumbnail}
                            thumbnailAlt={project.thumbnailAlt}
                            year={project.year}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-text-secondary">No projects found. Check back soon!</p>
            )}
        </section>
    )
}
