import type { Meta, StoryObj } from "@storybook/react"
import { PageHeader } from "./PageHeader"

const meta: Meta<typeof PageHeader> = {
    title: "Components/PageHeader",
    component: PageHeader,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: "Page Title",
        description: "This is a description of the page content.",
    },
}

export const WithEyebrow: Story = {
    args: {
        eyebrow: "Blog",
        title: "How to Build a Design System",
        description:
            "A comprehensive guide to creating and maintaining a design system for your organization.",
    },
}

export const Centered: Story = {
    args: {
        title: "Welcome to My Portfolio",
        description: "I design and build digital products.",
        orientation: "center",
    },
}

export const WithActions: Story = {
    args: {
        title: "My Latest Project",
        description: "A case study on improving user experience.",
        actions: [
            { href: "#", label: "View Live Site", variant: "primary" },
            { href: "#", label: "Read Case Study", variant: "secondary" },
        ],
    },
}

export const CenteredWithActions: Story = {
    args: {
        title: "Get in Touch",
        description: "I am always open to discussing new projects and opportunities.",
        orientation: "center",
        actions: [
            { href: "mailto:hello@example.com", label: "Send Email", variant: "primary" },
            { href: "#", label: "Schedule a Call", variant: "ghost" },
        ],
    },
}

export const WithMeta: Story = {
    args: {
        eyebrow: "Article",
        title: "Understanding React Server Components",
        description: "A deep dive into the new React paradigm.",
        meta: (
            <>
                <span className="text-sm text-text-tertiary">Published: Jan 15, 2025</span>
                <span className="text-sm text-text-tertiary">5 min read</span>
            </>
        ),
    },
}

export const AsH2: Story = {
    args: {
        title: "Section Heading",
        description: "This uses an h2 tag instead of h1.",
        headingLevel: "h2",
    },
}

export const ExternalAction: Story = {
    args: {
        title: "Open Source Project",
        description: "Check out my open source contributions.",
        actions: [
            {
                href: "https://github.com",
                label: "View on GitHub",
                variant: "primary",
                external: true,
            },
        ],
    },
}
