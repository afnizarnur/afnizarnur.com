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
				"border-disabled": "var(--border-disabled)",
				"border-high": "var(--border-high)",
				surface: "var(--surface-default)",
				"surface-hover": "var(--surface-hover)",
				"inverse-subdued": "var(--text-inverse-subdued)",
				shadow: "var(--shadow)",
				overlay: "var(--overlay)",

				// Button interactivity colors
				"btn-default": "var(--button-default)",
				"btn-hover": "var(--button-hover)",
				"btn-active": "var(--button-active)",
				"btn-focus": "var(--button-focus-ring)",

				// Base colors
				white: "var(--color-white)",
				black: "var(--color-black)",
				gray: {
					50: "var(--color-gray-50)",
					100: "var(--color-gray-100)",
					200: "var(--color-gray-200)",
					300: "var(--color-gray-300)",
					400: "var(--color-gray-400)",
					500: "var(--color-gray-500)",
					600: "var(--color-gray-600)",
					700: "var(--color-gray-700)",
					800: "var(--color-gray-800)",
					900: "var(--color-gray-900)",
					950: "var(--color-gray-950)"
				},
				pink: {
					50: "var(--color-pink-50)",
					100: "var(--color-pink-100)",
					200: "var(--color-pink-200)",
					300: "var(--color-pink-300)",
					400: "var(--color-pink-400)",
					500: "var(--color-pink-500)",
					600: "var(--color-pink-600)",
					700: "var(--color-pink-700)",
					800: "var(--color-pink-800)",
					900: "var(--color-pink-900)",
					950: "var(--color-pink-950)"
				},
				blue: {
					50: "var(--color-blue-50)",
					100: "var(--color-blue-100)",
					200: "var(--color-blue-200)",
					300: "var(--color-blue-300)",
					400: "var(--color-blue-400)",
					500: "var(--color-blue-500)",
					600: "var(--color-blue-600)",
					700: "var(--color-blue-700)",
					800: "var(--color-blue-800)",
					900: "var(--color-blue-900)",
					950: "var(--color-blue-950)"
				},
				green: {
					50: "var(--color-green-50)",
					100: "var(--color-green-100)",
					200: "var(--color-green-200)",
					300: "var(--color-green-300)",
					400: "var(--color-green-400)",
					500: "var(--color-green-500)",
					600: "var(--color-green-600)",
					700: "var(--color-green-700)",
					800: "var(--color-green-800)",
					900: "var(--color-green-900)",
					950: "var(--color-green-950)"
				},
				yellow: {
					50: "var(--color-yellow-50)",
					100: "var(--color-yellow-100)",
					200: "var(--color-yellow-200)",
					300: "var(--color-yellow-300)",
					400: "var(--color-yellow-400)",
					500: "var(--color-yellow-500)",
					600: "var(--color-yellow-600)",
					700: "var(--color-yellow-700)",
					800: "var(--color-yellow-800)",
					900: "var(--color-yellow-900)",
					950: "var(--color-yellow-950)"
				},
				orange: {
					50: "var(--color-orange-50)",
					100: "var(--color-orange-100)",
					200: "var(--color-orange-200)",
					300: "var(--color-orange-300)",
					400: "var(--color-orange-400)",
					500: "var(--color-orange-500)",
					600: "var(--color-orange-600)",
					700: "var(--color-orange-700)",
					800: "var(--color-orange-800)",
					900: "var(--color-orange-900)",
					950: "var(--color-orange-950)"
				}
			},
			fontFamily: {
				sans: ["Inter var", "system-ui", "sans-serif"],
				display: ["Aksen", "system-ui", "sans-serif"],
				mono: ["Fonetika", "monospace"]
			},
			fontSize: {
				"heading-1": [
					"2rem",
					{ lineHeight: "2.2rem", fontWeight: "600" }
				],
				"heading-2": [
					"2rem",
					{ lineHeight: "2.2rem", fontWeight: "600" }
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
				subtitle: ["1.125rem", { lineHeight: "1.575rem" }],
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
			},
			borderColor: {
				DEFAULT: "var(--border-default)",
				disabled: "var(--border-disabled)"
			},
			ringColor: {
				DEFAULT: "var(--button-focus-ring)"
			},
			ringWidth: {
				DEFAULT: "2px"
			},
			ringOffsetWidth: {
				DEFAULT: "2px"
			},
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px"
			}
		}
	},
	plugins: []
}
