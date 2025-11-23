import type { Meta, StoryObj } from "@storybook/react"
import { PostCard } from "./PostCard"

const meta: Meta<typeof PostCard> = {
    title: "Components/PostCard",
    component: PostCard,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: "400px" }}>
                <Story />
            </div>
        ),
    ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: "How to Build a Design System",
        slug: "how-to-build-a-design-system",
        excerpt:
            "A comprehensive guide to creating and maintaining a design system for your organization.",
        publishedAt: "2025-01-15",
    },
}

export const WithCoverImage: Story = {
    args: {
        title: "Understanding React Server Components",
        slug: "understanding-react-server-components",
        excerpt:
            "A deep dive into the new React paradigm and how it changes the way we build apps.",
        publishedAt: "2025-01-10",
        coverImage: "https://picsum.photos/800/400",
        coverImageAlt: "Abstract code visualization",
    },
}

export const WithTags: Story = {
    args: {
        title: "CSS Grid vs Flexbox: When to Use What",
        slug: "css-grid-vs-flexbox",
        excerpt:
            "Learn the key differences between CSS Grid and Flexbox and when to use each layout method.",
        publishedAt: "2025-01-05",
        tags: [
            { title: "CSS", slug: "css" },
            { title: "Web Development", slug: "web-development" },
            { title: "Frontend", slug: "frontend" },
        ],
    },
}

export const FullFeatured: Story = {
    args: {
        title: "Building Accessible Web Applications",
        slug: "building-accessible-web-applications",
        excerpt:
            "Best practices for creating web applications that are accessible to all users, including those with disabilities.",
        publishedAt: "2025-01-01",
        coverImage: "https://picsum.photos/800/400?random=2",
        coverImageAlt: "Accessibility illustration",
        tags: [
            { title: "Accessibility", slug: "accessibility" },
            { title: "React", slug: "react" },
        ],
    },
}

export const LongTitle: Story = {
    args: {
        title: "A Very Long Article Title That Might Wrap to Multiple Lines and Test Our Layout",
        slug: "long-title-article",
        excerpt: "Testing how the card handles long titles.",
        publishedAt: "2024-12-25",
    },
}
