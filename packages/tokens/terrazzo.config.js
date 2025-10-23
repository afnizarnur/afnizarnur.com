import { defineConfig } from "@terrazzo/cli"
import css from "@terrazzo/plugin-css"
import tailwind from "@terrazzo/plugin-tailwind"

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
        tailwind({
            fileName: "tailwind-theme.css",
            theme: {
                color: {
                    // Primitive colors - creates utilities like bg-gray-900, text-red-500
                    gray: ["color.primitive.gray.*"],
                    red: ["color.primitive.red.*"],
                    orange: ["color.primitive.orange.*"],
                    amber: ["color.primitive.amber.*"],
                    yellow: ["color.primitive.yellow.*"],
                    lime: ["color.primitive.lime.*"],
                    green: ["color.primitive.green.*"],
                    teal: ["color.primitive.teal.*"],
                    blue: ["color.primitive.blue.*"],
                    purple: ["color.primitive.purple.*"],
                    magenta: ["color.primitive.magenta.*"],
                    // Semantic colors - creates utilities like bg-background-primary, text-text-primary
                    background: ["color.semantic.background.*"],
                    text: ["color.semantic.text.*"],
                    icon: ["color.semantic.icon.*"],
                    border: ["color.semantic.border.*"],
                    focus: ["color.semantic.focus.*"],
                },
                ringWidth: ["focusRing.width"],
                ringOffsetWidth: ["focusRing.offset"],
                borderRadius: ["radius.*"],
                spacing: ["space.*"],
                width: ["size.*"],
                height: ["size.*"],
                fontFamily: ["typography.fontFamily.*"],
                fontSize: ["typography.fontSize.*"],
                fontWeight: ["typography.fontWeight.*"],
                lineHeight: ["typography.lineHeight.*"],
                letterSpacing: ["typography.letterSpacing.*"],
                boxShadow: ["shadow.*"],
                opacity: ["opacity.*"],
                zIndex: ["zIndex.*"],
                blur: ["blur.*"],
                screens: ["breakpoint.*"],
            },
            modeVariants: [{ variant: "dark", mode: "dark" }],
        }),
    ],
})
