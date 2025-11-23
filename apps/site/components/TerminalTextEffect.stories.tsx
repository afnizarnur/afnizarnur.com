import type { Meta, StoryObj } from "@storybook/react"
import { TerminalTextEffect } from "./TerminalTextEffect"

const meta: Meta<typeof TerminalTextEffect> = {
    title: "Components/TerminalTextEffect",
    component: TerminalTextEffect,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        effect: {
            control: "select",
            options: ["cursor", "background", "colorful"],
        },
        as: {
            control: "select",
            options: ["span", "p", "h1", "h2", "h3", "div"],
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Cursor: Story = {
    args: {
        children: "Hover me for cursor effect",
        effect: "cursor",
    },
}

export const Background: Story = {
    args: {
        children: "Hover me for background effect",
        effect: "background",
    },
}

export const Colorful: Story = {
    args: {
        children: "Hover me for colorful effect",
        effect: "colorful",
    },
}

export const AsHeading: Story = {
    args: {
        children: "I am a heading",
        effect: "cursor",
        as: "h1",
        className: "text-3xl font-bold",
    },
}

export const CustomColors: Story = {
    args: {
        children: "Custom color palette",
        effect: "colorful",
        colors: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"],
    },
}
