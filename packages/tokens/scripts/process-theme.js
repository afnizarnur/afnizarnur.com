import { readFile, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

async function processTheme() {
    try {
        // Read the generated theme file
        const themePath = fileURLToPath(new URL("../dist/tailwind-theme.css", import.meta.url))
        let themeContent = await readFile(themePath, "utf-8")

        // Remove the @import "tailwindcss" line
        themeContent = themeContent.replace(/@import\s+["']tailwindcss["'];?\s*/g, "")

        // Fix variable references: --color-primitive-* → --color-*
        // The Tailwind plugin generates references using original token paths,
        // but defines variables using theme keys
        themeContent = themeContent.replace(/var\(--color-primitive-([\w-]+)\)/g, "var(--color-$1)")

        // Fix typography references: --typography-fontFamily-* → --fontFamily-*
        themeContent = themeContent.replace(
            /var\(--typography-font(Family|Size|Weight)-([\w-]+)\)/g,
            "var(--font$1-$2)"
        )

        // Fix typography references: --typography-lineHeight-* → --lineHeight-*
        themeContent = themeContent.replace(
            /var\(--typography-(lineHeight|letterSpacing)-([\w-]+)\)/g,
            "var(--$1-$2)"
        )

        // Replace @variant dark with [data-theme="dark"] selector
        // This transforms Tailwind's class-based dark mode to attribute-based
        themeContent = themeContent.replace(/@variant dark \{/g, '[data-theme="dark"] {')

        // Write processed version back to dist for package export
        const outputPath = fileURLToPath(new URL("../dist/tailwind-theme.css", import.meta.url))

        await writeFile(outputPath, themeContent, "utf-8")

        console.log("✓ Tailwind theme processed for package export")
    } catch (error) {
        console.error("Error processing theme:", error)
        process.exit(1)
    }
}

processTheme()
