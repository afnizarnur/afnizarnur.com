import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { Widget } from "./Widget"

const meta: Meta<typeof Widget> = {
    title: "Components/Widget",
    component: Widget,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: "Widget Title",
        children: (
            <div className="text-text-primary">
                <p>This is the widget content.</p>
            </div>
        ),
    },
}

export const WithCloseButton: Story = {
    args: {
        title: "Closable Widget",
        showClose: true,
        onClose: fn(),
        children: (
            <div className="text-text-primary">
                <p>Click the X to close this widget.</p>
            </div>
        ),
    },
}

export const CustomSize: Story = {
    args: {
        title: "Custom Size",
        width: 400,
        height: 300,
        children: (
            <div className="text-text-primary">
                <p>This widget has custom dimensions.</p>
            </div>
        ),
    },
}

export const WithBackgroundColor: Story = {
    args: {
        title: "Colored Background",
        backgroundColor: "#3b82f6",
        children: (
            <div className="text-white">
                <p>This widget has a blue background.</p>
            </div>
        ),
    },
}

export const DarkBackground: Story = {
    args: {
        title: "Dark Widget",
        backgroundColor: "#1f2937",
        showClose: true,
        onClose: fn(),
        children: (
            <div className="text-white">
                <p>This widget has a dark background with light text.</p>
            </div>
        ),
    },
}

export const NoPadding: Story = {
    args: {
        title: "No Padding",
        noPadding: true,
        width: 400,
        height: 200,
        children: (
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <p>Content fills entire widget</p>
            </div>
        ),
    },
}

export const WithCustomActions: Story = {
    args: {
        title: "Custom Actions",
        customActions: (
            <div className="flex gap-8">
                <button
                    type="button"
                    className="text-xs text-text-secondary hover:text-text-primary"
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="text-xs text-text-secondary hover:text-text-primary"
                >
                    Share
                </button>
            </div>
        ),
        children: (
            <div className="text-text-primary">
                <p>This widget has custom action buttons in the header.</p>
            </div>
        ),
    },
}

export const NoTitle: Story = {
    args: {
        children: (
            <div className="text-text-primary">
                <p>This widget has no title, just content.</p>
            </div>
        ),
    },
}
