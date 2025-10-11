import { defineConfig } from "@terrazzo/cli"
import css from "@terrazzo/plugin-css"

export default defineConfig({
    tokens: "./src/tokens.tokens.json",
    outDir: "./dist",
    plugins: [
        css({
            fileName: "tokens.css",
        }),
    ],
})
