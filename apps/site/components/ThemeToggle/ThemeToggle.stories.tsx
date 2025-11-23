import type { Meta, StoryObj } from "@storybook/react"
import { ThemeToggle } from "./ThemeToggle"

const meta: Meta<typeof ThemeToggle> = {
    title: "Components/ThemeToggle",
    component: ThemeToggle,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
}

export const SmallSize: Story = {
    args: {
        size: 16,
    },
}

export const LargeSize: Story = {
    args: {
        size: 32,
    },
}
