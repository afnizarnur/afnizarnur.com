import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPostSlugs, getPostBySlug } from "@/lib/sanity/queries"
import { PageHeader } from "@/components/PageHeader"
import { PortableText } from "@/components/PortableText"

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const slugs = await getAllPostSlugs()
    return slugs.map((item) => ({
        slug: item.slug,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        return {}
    }

    return {
        title: post.seo?.title || post.title,
        description: post.seo?.description || post.excerpt,
        openGraph: {
            type: "article",
            publishedTime: post.publishedAt,
            images: post.coverImage ? [{ url: post.coverImage }] : [],
        },
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps): Promise<JSX.Element> {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    const actions = [
        {
            href: "/blog",
            label: "Back to blog",
            variant: "ghost" as const,
        },
    ]

    const hasTags = post.tags && post.tags.length > 0

    return (
        <article className="mx-auto max-w-7xl px-16 py-60 sm:px-24 lg:px-32">
            <div className="mx-auto max-w-2xl">
                {/* Post Header */}
                <PageHeader
                    title={post.title}
                    description={post.excerpt}
                    actions={actions}
                    eyebrow={
                        <time
                            className="text-sm font-semibold uppercase tracking-wide text-text-tertiary"
                            dateTime={post.publishedAt}
                        >
                            {formattedDate}
                        </time>
                    }
                    meta={
                        hasTags ? (
                            <div className="flex flex-wrap gap-8">
                                {post.tags!.map((tag) => (
                                    <span
                                        key={tag.slug}
                                        className="inline-flex items-center gap-8 rounded-full bg-background-secondary px-12 py-4 text-xs font-medium text-text-primary"
                                    >
                                        {tag.title}
                                    </span>
                                ))}
                            </div>
                        ) : undefined
                    }
                />

                {/* Cover Image */}
                {post.coverImage && (
                    <figure className="mb-48">
                        <img
                            src={`${post.coverImage}?w=1200&auto=format`}
                            alt={post.coverImageAlt || post.title}
                            className="rounded-lg w-full"
                        />
                    </figure>
                )}

                {/* Post Content */}
                <div className="prose prose-lg prose-neutral max-w-none">
                    <PortableText value={post.body} />
                </div>
            </div>
        </article>
    )
}
