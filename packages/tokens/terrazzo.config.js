import { defineConfig } from "@terrazzo/cli"
import css from "@terrazzo/plugin-css"

export default defineConfig({
    tokens: "./src/tokens.tokens.json",
    outDir: "./dist",
    plugins: [
        css({
            fileName: "tokens.css",
            modeSelectors: [
                {
                    mode: "light",
                    selectors: [":root", '[data-theme="light"]'],
                    scheme: "light",
                },
                {
                    mode: "dark",
                    selectors: ['[data-theme="dark"]'],
                    scheme: "dark",
                },
            ],
            baseScheme: "light dark",
        }),
    ],
})
