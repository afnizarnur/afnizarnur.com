import type { Meta, StoryObj } from "@storybook/react"
import { ErrorBoundary } from "./ErrorBoundary"

const meta: Meta<typeof ErrorBoundary> = {
    title: "Components/ErrorBoundary",
    component: ErrorBoundary,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
}

export default meta
type Story = StoryObj<typeof meta>

// Component that throws an error for testing
function BuggyComponent(): never {
    throw new Error("Test error for ErrorBoundary")
}

export const Default: Story = {
    args: {
        children: <div className="p-4">Normal content renders here</div>,
    },
}

export const WithError: Story = {
    args: {
        children: <BuggyComponent />,
    },
}

export const WithCustomFallback: Story = {
    args: {
        children: <BuggyComponent />,
        fallback: (
            <div className="p-4 bg-red-100 text-red-800 rounded">
                Custom error message: Something went wrong!
            </div>
        ),
    },
}
