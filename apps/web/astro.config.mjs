import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import netlify from "@astrojs/netlify"
import sitemap from "@astrojs/sitemap"

import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
    integrations: [react(), sitemap()],
    output: "static",
    adapter: netlify(),
    site: process.env.PUBLIC_SITE_URL || "http://localhost:4321",

    vite: {
        plugins: [tailwindcss()],
        define: {
            "process.env.NODE_ENV": JSON.stringify(
                process.env.NODE_ENV || (import.meta.env?.DEV ? "development" : "production")
            ),
        },
    },
})
