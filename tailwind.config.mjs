/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				// Theme colors using CSS variables
				bg: "var(--background-default)",
				primary: "var(--text-primary)",
				secondary: "var(--text-secondary)",
				disabled: "var(--text-disabled)",
				border: "var(--border-default)",
				surface: "var(--surface-default)",
				"inverse-subdued": "var(--text-inverse-subdued)",
				shadow: "var(--shadow)",
				overlay: "var(--overlay)"
			},
			fontFamily: {
				sans: ["Inter var", "system-ui", "sans-serif"],
				display: ["Aksen", "system-ui", "sans-serif"]
			},
			fontSize: {
				// Heading sizes
				"heading-1": [
					"3.25rem",
					{ lineHeight: "3.575rem", fontWeight: "600" }
				],
				"heading-2": [
					"2.875rem",
					{ lineHeight: "3.1625rem", fontWeight: "600" }
				],
				"heading-3": [
					"2.25rem",
					{ lineHeight: "2.475rem", fontWeight: "600" }
				],
				"heading-4": [
					"2rem",
					{ lineHeight: "2.2rem", fontWeight: "600" }
				],
				"heading-5": [
					"1.8125rem",
					{ lineHeight: "1.99375rem", fontWeight: "600" }
				],
				"heading-6": [
					"1.25rem",
					{ lineHeight: "1.375rem", fontWeight: "600" }
				],

				// Other text sizes
				subtitle: ["1.4375rem", { lineHeight: "2.0125rem" }],
				"body-large": [
					"1.125rem",
					{ lineHeight: "1.575rem", fontWeight: "520" }
				],
				body: [
					"1rem",
					{ lineHeight: "1.5", letterSpacing: "-0.01rem" }
				],
				small: [
					"0.875rem",
					{
						lineHeight: "1.2rem",
						fontWeight: "520",
						letterSpacing: "-0.01rem"
					}
				],
				helper: ["0.8125rem", { lineHeight: "1.2rem" }]
			},
			boxShadow: {
				DEFAULT: "var(--shadow)"
			}
		}
	},
	plugins: []
}
