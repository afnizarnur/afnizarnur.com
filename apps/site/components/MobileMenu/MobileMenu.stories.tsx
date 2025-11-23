import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { MobileMenu } from "./MobileMenu"

const meta: Meta<typeof MobileMenu> = {
    title: "Components/MobileMenu",
    component: MobileMenu,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        viewport: {
            defaultViewport: "mobile1",
        },
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
    { title: "Contact", href: "/contact" },
]

export const Closed: Story = {
    args: {
        items: defaultItems,
        isOpen: false,
    },
}

export const Open: Story = {
    args: {
        items: defaultItems,
        isOpen: true,
        onToggle: fn(),
    },
    decorators: [
        (Story) => (
            <div style={{ height: "100vh", position: "relative" }}>
                <div
                    style={{
                        height: "66px",
                        borderBottom: "1px solid #e5e5e5",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 16px",
                    }}
                >
                    <span>Navigation Bar Placeholder</span>
                </div>
                <Story />
            </div>
        ),
    ],
}

export const WithTimezone: Story = {
    args: {
        items: defaultItems,
        isOpen: true,
        onToggle: fn(),
        timezone: {
            timeZone: "America/New_York",
            displayLabel: "NYC",
        },
    },
    decorators: [
        (Story) => (
            <div style={{ height: "100vh", position: "relative" }}>
                <div
                    style={{
                        height: "66px",
                        borderBottom: "1px solid #e5e5e5",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 16px",
                    }}
                >
                    <span>Navigation Bar Placeholder</span>
                </div>
                <Story />
            </div>
        ),
    ],
}

export const WithExternalLinks: Story = {
    args: {
        items: [
            { title: "Work", href: "/work" },
            { title: "Blog", href: "/blog" },
            { title: "GitHub", href: "https://github.com", newTab: true },
            { title: "LinkedIn", href: "https://linkedin.com", newTab: true },
        ],
        isOpen: true,
        onToggle: fn(),
    },
    decorators: [
        (Story) => (
            <div style={{ height: "100vh", position: "relative" }}>
                <div
                    style={{
                        height: "66px",
                        borderBottom: "1px solid #e5e5e5",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 16px",
                    }}
                >
                    <span>Navigation Bar Placeholder</span>
                </div>
                <Story />
            </div>
        ),
    ],
}
