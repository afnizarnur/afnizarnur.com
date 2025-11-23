import { GearIcon, HeartIcon, MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { IconButton } from "./IconButton"

const meta: Meta<typeof IconButton> = {
    title: "Components/IconButton",
    component: IconButton,
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

export const Close: Story = {
    args: {
        icon: XIcon,
        ariaLabel: "Close",
    },
}

export const Settings: Story = {
    args: {
        icon: GearIcon,
        ariaLabel: "Settings",
    },
}

export const Search: Story = {
    args: {
        icon: MagnifyingGlassIcon,
        ariaLabel: "Search",
    },
}

export const Favorite: Story = {
    args: {
        icon: HeartIcon,
        ariaLabel: "Add to favorites",
    },
}

export const SmallSize: Story = {
    args: {
        icon: GearIcon,
        ariaLabel: "Settings",
        size: 16,
    },
}

export const LargeSize: Story = {
    args: {
        icon: GearIcon,
        ariaLabel: "Settings",
        size: 32,
    },
}
