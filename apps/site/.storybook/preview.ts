import type { Preview } from "@storybook/react"
import "../app/styles/global.css"

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
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
}

export default preview
