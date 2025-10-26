import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/PageHeader"
import { PortableText } from "@/components/PortableText"
import { getPageBySlug } from "@/lib/sanity/queries"

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageBySlug("about")

    if (!page) {
        return {}
    }

    return {
        title: page.seo?.title || page.title,
        description:
            page.seo?.description ||
            "Learn about Afnizar Nur Ghifari, product designer and developer.",
    }
}

export default async function AboutPage(): Promise<JSX.Element> {
    const page = await getPageBySlug("about")

    if (!page) {
        notFound()
    }

    return (
        <article className="mx-auto max-w-7xl px-16 py-60 sm:px-24 lg:px-32">
            <div className="mx-auto max-w-2xl">
                <PageHeader eyebrow="About" title={page.title} />

                <div className="prose prose-lg prose-neutral max-w-none">
                    <PortableText value={page.body} />
                </div>
            </div>
        </article>
    )
}
