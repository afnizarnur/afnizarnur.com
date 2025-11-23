import type { StorybookConfig } from "@storybook/react-vite"
import react from "@vitejs/plugin-react"

const config: StorybookConfig = {
    stories: ["../components/**/*.stories.@(ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-a11y",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    staticDirs: ["../public"],
    viteFinal: async (config) => {
        config.plugins = config.plugins || []
        config.plugins.push(
            react({
                jsxRuntime: "automatic",
            })
        )
        return config
    },
}

export default config
