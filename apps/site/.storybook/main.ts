import { resolve } from "node:path"
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

        // Configure path aliases to match tsconfig
        config.resolve = config.resolve || {}
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": resolve(__dirname, ".."),
            "@/components": resolve(__dirname, "../components"),
            "@/lib": resolve(__dirname, "../lib"),
            "@/app": resolve(__dirname, "../app"),
            "@/contexts": resolve(__dirname, "../contexts"),
            // Mock next/image for Storybook (no image optimization)
            "next/image": resolve(__dirname, "./mocks/next-image.tsx"),
        }

        // Define process.env for browser compatibility
        config.define = {
            ...config.define,
            "process.env": {},
        }

        return config
    },
}

export default config
