import type { AstroComponentFactory } from "astro/runtime/server/index.js"
import GithubIcon from "../components/icons/GithubIcon.astro"
import LinkedinIcon from "../components/icons/LinkedinIcon.astro"
import InstagramIcon from "../components/icons/InstagramIcon.astro"
import XIcon from "../components/icons/XIcon.astro"
import ThreadsIcon from "../components/icons/ThreadsIcon.astro"
import FigmaIcon from "../components/icons/FigmaIcon.astro"

export interface SocialLink {
	name: string
	url: string
	icon: AstroComponentFactory
	ariaLabel: string
}

export const socialLinks: SocialLink[] = [
	{
		name: "Figma",
		url: "https://figma.com/@afnizarnur",
		icon: FigmaIcon,
		ariaLabel: "Figma Profile"
	},
	{
		name: "LinkedIn",
		url: "https://linkedin.com/in/afnizarnur",
		icon: LinkedinIcon,
		ariaLabel: "LinkedIn Profile"
	},
	{
		name: "GitHub",
		url: "https://github.com/afnizarnur",
		icon: GithubIcon,
		ariaLabel: "GitHub Profile"
	},
	{
		name: "Instagram",
		url: "https://instagram.com/afnizar_nur",
		icon: InstagramIcon,
		ariaLabel: "Instagram Profile"
	},
	{
		name: "Threads",
		url: "https://threads.net/@afnizar_nur",
		icon: ThreadsIcon,
		ariaLabel: "Threads Profile"
	},
	{
		name: "X",
		url: "https://x.com/afnizarnur",
		icon: XIcon,
		ariaLabel: "X (Twitter) Profile"
	}
]
