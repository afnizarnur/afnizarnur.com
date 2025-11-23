import type { Meta, StoryObj } from "@storybook/react"
import { ProjectCard } from "./ProjectCard"

const meta: Meta<typeof ProjectCard> = {
    title: "Components/ProjectCard",
    component: ProjectCard,
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
        title: "Design System",
        slug: "design-system",
        description: "A comprehensive design system for enterprise applications.",
    },
}

export const WithThumbnail: Story = {
    args: {
        title: "E-commerce Platform",
        slug: "ecommerce-platform",
        description: "A modern e-commerce platform with a focus on user experience.",
        thumbnail: "https://picsum.photos/800/500",
        thumbnailAlt: "E-commerce platform screenshot",
    },
}

export const WithYear: Story = {
    args: {
        title: "Mobile Banking App",
        slug: "mobile-banking-app",
        description: "Redesigned mobile banking experience for a major financial institution.",
        year: "2024",
    },
}

export const WithRoles: Story = {
    args: {
        title: "Healthcare Dashboard",
        slug: "healthcare-dashboard",
        description: "Analytics dashboard for healthcare providers.",
        role: ["Product Design", "Frontend Development"],
    },
}

export const FullFeatured: Story = {
    args: {
        title: "SaaS Platform Redesign",
        slug: "saas-platform-redesign",
        description: "Complete redesign of a B2B SaaS platform, improving user engagement by 40%.",
        thumbnail: "https://picsum.photos/800/500?random=3",
        thumbnailAlt: "SaaS platform dashboard",
        year: "2024",
        role: ["Lead Designer", "UX Research", "Design System"],
    },
}

export const MultipleRoles: Story = {
    args: {
        title: "Startup MVP",
        slug: "startup-mvp",
        description: "End-to-end product development for an early-stage startup.",
        year: "2023",
        role: ["Product Strategy", "UX Design", "UI Design", "Prototyping", "User Testing"],
    },
}
