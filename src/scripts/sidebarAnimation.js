import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function initSidebarAnimation() {
	// Consider both mobile and tablet as small screens (anything below 1024px)
	const isSmallScreen = window.innerWidth < 1024

	// Small screen setup - show primary content without animation
	if (isSmallScreen) {
		const stacks = document.querySelectorAll(".text-stack")

		stacks.forEach((stack) => {
			const container = stack.querySelector(".stack-container")
			const primaryContent = stack.querySelector(
				".stack-item.primary-content"
			)
			const toolsContent = stack.querySelector(
				".stack-item.tools-content"
			)
			const versionsContent = stack.querySelector(
				".stack-item.versions-content"
			)

			if (
				container instanceof HTMLElement &&
				primaryContent instanceof HTMLElement
			) {
				// Reset container height
				container.style.height = "auto"

				// Show only primary content
				primaryContent.style.position = "relative"
				primaryContent.style.height = "auto"

				// Hide other content
				if (toolsContent instanceof HTMLElement) {
					toolsContent.style.display = "none"
				}
				if (versionsContent instanceof HTMLElement) {
					versionsContent.style.display = "none"
				}
			}
		})
	}
	// Desktop setup with animations
	else {
		gsap.registerPlugin(ScrollTrigger)

		const stacks = document.querySelectorAll(".text-stack")

		// Function to set stack heights and positions
		function setupStacks() {
			stacks.forEach((stack) => {
				const container = stack.querySelector(".stack-container")
				const items = stack.querySelectorAll(".stack-item")

				if (container instanceof HTMLElement && items.length > 0) {
					// Reset container height first
					container.style.height = "auto"

					// Calculate the maximum height among items
					let maxHeight = 0
					items.forEach((item) => {
						if (item instanceof HTMLElement) {
							const height = item.offsetHeight
							maxHeight = Math.max(maxHeight, height)
						}
					})

					// Set heights and positions
					container.style.height = `${maxHeight}px`
					items.forEach((item, index) => {
						if (item instanceof HTMLElement) {
							item.style.height = `${maxHeight}px`
							gsap.set(item, {
								position: "absolute",
								top: 0,
								y: `${index * 100}%`
							})
						}
					})
				}
			})
		}

		// Initial setup
		setupStacks()

		// Update on window resize
		window.addEventListener("resize", () => {
			if (window.innerWidth >= 1024) {
				setupStacks()

				// Refresh ScrollTrigger on resize for large screens
				ScrollTrigger.refresh()
			}
		})

		// Animation for Design Tools section
		ScrollTrigger.create({
			trigger: "#tools-section",
			start: "top 80%", // Trigger earlier when scrolling down
			end: "bottom 20%", // End trigger point later
			onEnter: () => {
				stacks.forEach((stack) => {
					const primaryContent = stack.querySelector(
						".stack-item.primary-content"
					)
					const toolsContent = stack.querySelector(
						".stack-item.tools-content"
					)
					const versionsContent = stack.querySelector(
						".stack-item.versions-content"
					)

					if (primaryContent && toolsContent) {
						gsap.to(primaryContent, {
							y: "-100%",
							duration: 0.4,
							ease: "circ.out"
						})
						gsap.to(toolsContent, {
							y: "0%",
							duration: 0.4,
							ease: "circ.out"
						})
						if (versionsContent) {
							gsap.to(versionsContent, {
								y: "100%",
								duration: 0.4,
								ease: "circ.out"
							})
						}
					}
				})
			},
			onLeaveBack: () => {
				stacks.forEach((stack) => {
					const primaryContent = stack.querySelector(
						".stack-item.primary-content"
					)
					const toolsContent = stack.querySelector(
						".stack-item.tools-content"
					)
					const versionsContent = stack.querySelector(
						".stack-item.versions-content"
					)

					if (primaryContent && toolsContent) {
						gsap.to(primaryContent, {
							y: "0%",
							duration: 0.4,
							ease: "circ.out"
						})
						gsap.to(toolsContent, {
							y: "100%",
							duration: 0.4,
							ease: "circ.out"
						})
						if (versionsContent) {
							gsap.to(versionsContent, {
								y: "200%",
								duration: 0.4,
								ease: "circ.out"
							})
						}
					}
				})
			}
		})

		// Animation for Site Versions section
		ScrollTrigger.create({
			trigger: "#versions-section",
			start: "top 80%",
			end: "bottom 20%",
			onEnter: () => {
				stacks.forEach((stack) => {
					const primaryContent = stack.querySelector(
						".stack-item.primary-content"
					)
					const toolsContent = stack.querySelector(
						".stack-item.tools-content"
					)
					const versionsContent = stack.querySelector(
						".stack-item.versions-content"
					)

					if (primaryContent && versionsContent) {
						gsap.to(primaryContent, {
							y: "-200%",
							duration: 0.4,
							ease: "circ.out"
						})
						if (toolsContent) {
							gsap.to(toolsContent, {
								y: "-100%",
								duration: 0.4,
								ease: "circ.out"
							})
						}
						gsap.to(versionsContent, {
							y: "0%",
							duration: 0.4,
							ease: "circ.out"
						})
					}
				})
			},
			onLeaveBack: () => {
				stacks.forEach((stack) => {
					const primaryContent = stack.querySelector(
						".stack-item.primary-content"
					)
					const toolsContent = stack.querySelector(
						".stack-item.tools-content"
					)
					const versionsContent = stack.querySelector(
						".stack-item.versions-content"
					)

					if (primaryContent && toolsContent && versionsContent) {
						gsap.to(primaryContent, {
							y: "-100%",
							duration: 0.4,
							ease: "circ.out"
						})
						gsap.to(toolsContent, {
							y: "0%",
							duration: 0.4,
							ease: "circ.out"
						})
						gsap.to(versionsContent, {
							y: "100%",
							duration: 0.4,
							ease: "circ.out"
						})
					}
				})
			}
		})
	}

	// Handle resize to switch between small screen and desktop layouts
	window.addEventListener("resize", () => {
		const wasSmallScreen = isSmallScreen
		const isNowSmallScreen = window.innerWidth < 1024

		// Only reload if there's a change between small screen and desktop
		if (wasSmallScreen !== isNowSmallScreen && window.location.reload) {
			window.location.reload()
		}
	})
}
