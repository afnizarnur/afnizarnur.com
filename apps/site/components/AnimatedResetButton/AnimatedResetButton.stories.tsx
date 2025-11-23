import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { AnimatedResetButton } from "./AnimatedResetButton"

const meta: Meta<typeof AnimatedResetButton> = {
    title: "Components/AnimatedResetButton",
    component: AnimatedResetButton,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        onClick: fn(),
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Visible: Story = {
    args: {
        show: true,
        ariaLabel: "Reset widget positions",
    },
}

export const Hidden: Story = {
    args: {
        show: false,
        ariaLabel: "Reset widget positions",
    },
}

export const CustomLabel: Story = {
    args: {
        show: true,
        ariaLabel: "Clear all selections",
    },
}
