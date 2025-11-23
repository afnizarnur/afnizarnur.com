import type { Decorator, Preview } from "@storybook/react"
import * as NextImage from "next/image"
import { UserPreferencesProvider } from "../contexts/UserPreferencesContext"
import "../app/styles/global.css"

// Mock Next.js Image component to use unoptimized images in Storybook
const OriginalNextImage = NextImage.default
// @ts-expect-error - Mocking Next Image for Storybook
NextImage.default = function MockedImage(props: NextImage.ImageProps) {
    return <OriginalNextImage {...props} unoptimized />
}

// Decorator to wrap stories with necessary providers
const withProviders: Decorator = (Story) => (
    <UserPreferencesProvider>
        <Story />
    </UserPreferencesProvider>
)

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: "light",
            values: [
                { name: "light", value: "#ffffff" },
                { name: "dark", value: "#18181b" },
            ],
        },
    },
    decorators: [withProviders],
}

export default preview
