import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Fade in animation
export const fadeIn = (
	element: Element,
	delay: number = 0,
	duration: number = 0.6
) => {
	return gsap.from(element, {
		opacity: 0,
		y: 15,
		duration,
		delay,
		ease: "power3.out"
	})
}

// Fade in up animation with scroll trigger
export const fadeInUp = (element: Element, delay: number = 0) => {
	return gsap.from(element, {
		scrollTrigger: {
			trigger: element,
			start: "top bottom-=50",
			toggleActions: "play none none reverse"
		},
		opacity: 0,
		y: 30,
		duration: 0.6,
		delay,
		ease: "power3.out"
	})
}

// Stagger fade in animation for multiple elements
export const staggerFadeIn = (
	elements: Element[],
	stagger: number = 0.1,
	delay: number = 0
) => {
	return gsap.from(elements, {
		opacity: 0,
		y: 15,
		duration: 0.5,
		delay,
		stagger,
		ease: "power3.out"
	})
}

// Scale in animation
export const scaleIn = (element: Element, delay: number = 0) => {
	return gsap.from(element, {
		scale: 0.9,
		opacity: 0,
		duration: 0.5,
		delay,
		ease: "back.out(1.7)"
	})
}

// Text reveal animation
export const textReveal = (element: Element, delay: number = 0) => {
	// Wrap each word in a span
	const text = element.textContent?.split(" ") || []
	element.innerHTML = text
		.map(
			(word) =>
				`<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`
		)
		.join(" ")

	// Animate each word
	const words = element.querySelectorAll("span > span")
	return gsap.from(words, {
		yPercent: 100,
		duration: 0.6,
		delay,
		stagger: 0.03,
		ease: "power3.out"
	})
}

// Page transition animation
export const pageTransition = {
	enter: (element: Element) => {
		const tl = gsap.timeline()
		tl.from(element, {
			opacity: 0,
			y: 15,
			duration: 0.5,
			ease: "power3.out"
		})
		return tl
	},
	exit: (element: Element) => {
		const tl = gsap.timeline()
		tl.to(element, {
			opacity: 0,
			y: -15,
			duration: 0.4,
			ease: "power3.in"
		})
		return tl
	}
}
