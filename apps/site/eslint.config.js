import sharedConfig from "@afnizarnur/config-eslint"
import nextPlugin from "@next/eslint-plugin-next"

export default [
    ...sharedConfig,
    {
        plugins: {
            "@next/next": nextPlugin,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
        },
    },
    {
        ignores: ["dist", "node_modules", ".turbo", ".next"],
    },
]
