/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				primary: "rgb(var(--color-primary) / <alpha-value>)",
				secondary: "rgb(var(--color-secondary) / <alpha-value>)",
				text: "rgb(var(--color-text) / <alpha-value>)",
				background: "rgb(var(--color-background) / <alpha-value>)",
				muted: "rgb(var(--color-muted) / <alpha-value>)"
			},
			fontFamily: {
				sans: ["Inter var", "system-ui", "sans-serif"],
				display: ["Aksen", "system-ui", "sans-serif"]
			}
		}
	},
	plugins: []
}
