import type { Meta, StoryObj } from "@storybook/react"
import { NavigationBar } from "./NavigationBar"

const meta: Meta<typeof NavigationBar> = {
    title: "Components/NavigationBar",
    component: NavigationBar,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        nextjs: {
            appDirectory: true,
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultItems = [
    { title: "Work", href: "/work" },
    { title: "Blog", href: "/blog" },
    { title: "About", href: "/about" },
]

export const Default: Story = {
    args: {
        items: defaultItems,
    },
}

export const WithTextLogo: Story = {
    args: {
        items: defaultItems,
        logo: {
            type: "text",
            text: "John_Doe",
        },
    },
}

export const WithImageLogo: Story = {
    args: {
        items: defaultItems,
        logo: {
            type: "image",
            image: {
                url: "https://picsum.photos/48/48",
                alt: "Profile picture",
            },
        },
    },
}

export const WithTimezone: Story = {
    args: {
        items: defaultItems,
        timezone: {
            timeZone: "Asia/Jakarta",
            displayLabel: "ID",
        },
    },
}

export const WithExternalLinks: Story = {
    args: {
        items: [
            { title: "Work", href: "/work" },
            { title: "Blog", href: "/blog" },
            { title: "GitHub", href: "https://github.com", newTab: true },
            { title: "Twitter", href: "https://twitter.com", newTab: true },
        ],
    },
}

export const ManyItems: Story = {
    args: {
        items: [
            { title: "Work", href: "/work" },
            { title: "Blog", href: "/blog" },
            { title: "About", href: "/about" },
            { title: "Contact", href: "/contact" },
            { title: "Resume", href: "/resume" },
        ],
    },
}
