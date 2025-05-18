export interface Metadata {
	title: string
	description: string
	image?: {
		url: string
		alt: string
		width: number
		height: number
	}
	canonicalURL?: string
}

export interface OpenGraph {
	basic: {
		title: string
		type: string
		image: string
		url: string
	}
	optional?: {
		audio?: string
		description?: string
		determiner?: string
		locale?: string
		localeAlternate?: string[]
		siteName?: string
		video?: string
	}
}

export interface Twitter {
	card: string
	site?: string
	creator?: string
	title?: string
	description?: string
	image?: string
	imageAlt?: string
}

export const defaultMetadata: Metadata = {
	title: "Afnizar Nur Ghifari",
	description:
		"Afnizar Nur Ghifari is an Indonesia-based product designer that specializing in user interfaces, design system, and strategy across multiple industries."
}

export const defaultOpenGraph: OpenGraph = {
	basic: {
		title: "Afnizar Nur Ghifari",
		type: "website",
		image: "/og-image.jpg",
		url: "https://afnizarnur.com"
	},
	optional: {
		siteName: "Afnizar Nur Ghifari",
		description:
			"Afnizar Nur Ghifari is an Indonesia-based product designer that specializing in user interfaces, design system, and strategy across multiple industries."
	}
}

export const defaultTwitter: Twitter = {
	card: "summary_large_image",
	site: "@afnizarnur",
	creator: "@afnizarnur",
	title: "Afnizar Nur Ghifari",
	description:
		"Afnizar Nur Ghifari is an Indonesia-based product designer that specializing in user interfaces, design system, and strategy across multiple industries.",
	image: "/og-image.jpg"
}

export const siteConfig = {
	name: "Afnizar Nur Ghifari",
	description:
		"Afnizar Nur Ghifari is an Indonesia-based product designer that specializing in user interfaces, design system, and strategy across multiple industries.",
	url: "https://afnizarnur.com",
	ogImage: "/og-image.jpg",
	links: {
		twitter: "https://twitter.com/afnizarnur",
		github: "https://github.com/afnizarnur"
	}
} as const
