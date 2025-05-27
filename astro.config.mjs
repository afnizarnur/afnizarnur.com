// @ts-check
import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import umami from "@yeskunall/astro-umami"
import netlify from "@astrojs/netlify"

export default defineConfig({
	site: "https://afnizarnur.com",
	integrations: [
		tailwind(),
		sitemap({
			changefreq: "weekly",
			priority: 0.7,
			lastmod: new Date()
		}),
		umami({
			id: "cc3e0e53-f632-4b18-9634-a422d703728e"
		}),
		netlify()
	],
	image: {
		service: {
			entrypoint: "astro/assets/services/sharp",
			config: {
				quality: 85,
				format: ["webp", "avif", "png", "jpg"]
			}
		}
	},
	vite: {
		plugins: [],
		build: {
			rollupOptions: {}
		},
		ssr: {
			noExternal: ["gsap"]
		},
		optimizeDeps: {
			include: ["gsap"]
		}
	},
	output: "server",
	adapter: netlify()
})
