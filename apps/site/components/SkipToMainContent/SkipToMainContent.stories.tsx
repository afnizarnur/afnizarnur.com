import type { Meta, StoryObj } from "@storybook/react"
import { SkipToMainContent } from "./SkipToMainContent"

const meta: Meta<typeof SkipToMainContent> = {
    title: "Components/SkipToMainContent",
    component: SkipToMainContent,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Accessibility component that provides a skip link for keyboard users. Focus on this story and press Tab to see the skip link.",
            },
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        targetId: "main-content",
    },
    decorators: [
        (Story) => (
            <div>
                <Story />
                <div className="p-16 bg-background-secondary">
                    <p>Press Tab to reveal the skip link</p>
                </div>
                <main id="main-content" className="p-16">
                    <h1>Main Content</h1>
                    <p>This is where the skip link will navigate to.</p>
                </main>
            </div>
        ),
    ],
}

export const CustomTarget: Story = {
    args: {
        targetId: "custom-target",
    },
    decorators: [
        (Story) => (
            <div>
                <Story />
                <div className="p-16 bg-background-secondary">
                    <p>Press Tab to reveal the skip link</p>
                </div>
                <section id="custom-target" className="p-16">
                    <h2>Custom Target Section</h2>
                    <p>This is a custom target for the skip link.</p>
                </section>
            </div>
        ),
    ],
}
