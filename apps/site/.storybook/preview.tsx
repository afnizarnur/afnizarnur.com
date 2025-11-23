import type { Decorator, Preview } from "@storybook/react"
import { UserPreferencesProvider } from "../contexts/UserPreferencesContext"
import "../app/styles/global.css"

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
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: [withProviders],
}

export default preview
