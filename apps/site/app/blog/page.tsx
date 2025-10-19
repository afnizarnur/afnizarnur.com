import type { Metadata } from "next"
import { getAllPosts } from "@/lib/sanity/queries"
import { PageHeader } from "@/components/PageHeader"
import { PostCard } from "@/components/PostCard"

export const metadata: Metadata = {
    title: "Blog",
    description: "Articles about design systems, frontend development, and product design.",
}

export default async function BlogPage(): Promise<JSX.Element> {
    const posts = await getAllPosts()

    return (
        <section className="mx-auto max-w-7xl px-16 py-60 sm:px-24 lg:px-32">
            <PageHeader
                eyebrow="Journal"
                title="Blog"
                description="Thoughts on design systems, frontend development, and product design."
            />

            {posts && posts.length > 0 ? (
                <div className="grid grid-cols-1 gap-24 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <PostCard
                            key={post.slug}
                            title={post.title}
                            slug={post.slug}
                            excerpt={post.excerpt}
                            publishedAt={post.publishedAt}
                            coverImage={post.coverImage}
                            coverImageAlt={post.coverImageAlt}
                            tags={post.tags}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-text-secondary">No blog posts yet. Check back soon!</p>
            )}
        </section>
    )
}
