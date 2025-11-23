import type { Meta, StoryObj } from "@storybook/react"
import { TimeDisplay } from "./TimeDisplay"

const meta: Meta<typeof TimeDisplay> = {
    title: "Components/TimeDisplay",
    component: TimeDisplay,
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

export const WithTimezone: Story = {
    args: {
        timezone: {
            timeZone: "Asia/Jakarta",
            displayLabel: "ID",
        },
    },
}

export const WithCustomLabel: Story = {
    args: {
        timezone: {
            timeZone: "America/New_York",
            displayLabel: "NYC",
        },
    },
}

export const WithCustomClass: Story = {
    args: {
        className: "text-lg font-bold text-blue-600",
    },
}
