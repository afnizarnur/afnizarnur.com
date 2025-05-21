import { gsap } from "gsap"

/**
 * Initializes the animation functionality for the settings panel
 */
export function initPanelAnimation() {
	const settingsPanel = document.getElementById("settings-panel")
	const settingsPanelContent = document.getElementById(
		"settings-panel-content"
	)
	const themeButtonElements = document.querySelectorAll(".settings-theme-btn")
	const fontButtonElements = document.querySelectorAll(".settings-font-btn")
	const menuToggle = document.getElementById("menu-toggle")

	// Focus trap variables
	let focusableElements = []
	let firstFocusableElement = null
	let lastFocusableElement = null

	// Set up focus trap when panel is opened
	const setupFocusTrap = () => {
		if (!settingsPanel) return

		// Get all focusable elements within the panel
		const elements = settingsPanel.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		)

		focusableElements = Array.from(elements)

		if (focusableElements.length) {
			firstFocusableElement = focusableElements[0]
			lastFocusableElement =
				focusableElements[focusableElements.length - 1]

			// Focus the first element when panel opens
			firstFocusableElement.focus()
		}
	}

	// Animation for panel open - improved for smoothness
	const animateSettingsPanel = () => {
		if (!settingsPanelContent) return

		// Create a timeline with smoother easing and better defaults
		const tl = gsap.timeline({
			defaults: {
				duration: 0.3,
				ease: "power2.out", // Changed from power3.out for smoother motion
				overwrite: "auto" // Prevent animation conflicts
			}
		})

		// Reset initial state with improved starting position
		gsap.set(settingsPanelContent, {
			opacity: 0,
			y: -10, // Reduced from -15 for less dramatic movement
			scale: 0.98, // Increased from 0.97 for subtler scale
			transformOrigin: "top center", // Added center for balanced scaling
			force3D: true // Force 3D acceleration for smoother rendering
		})

		// Main panel animation with smoother values
		tl.to(settingsPanelContent, {
			opacity: 1,
			y: 0,
			scale: 1,
			duration: 0.25, // Slightly reduced for snappier appearance
			clearProps: "transform"
		})

		// Smoother stagger for theme buttons
		tl.fromTo(
			themeButtonElements,
			{
				opacity: 0,
				y: -5 // Reduced from -8 for subtler animation
			},
			{
				opacity: 1,
				y: 0,
				stagger: 0.03, // Slightly increased for clearer visual cascade
				duration: 0.2, // Slightly increased for smoother animation
				clearProps: "transform",
				ease: "power1.out" // Even smoother easing for children
			},
			"-=0.1" // Better overlap timing
		)

		// Smoother stagger for font buttons
		tl.fromTo(
			fontButtonElements,
			{
				opacity: 0,
				y: -5 // Reduced from -8 for subtler animation
			},
			{
				opacity: 1,
				y: 0,
				stagger: 0.03, // Consistent with theme buttons
				duration: 0.2, // Slightly increased for smoother animation
				clearProps: "transform",
				ease: "power1.out" // Even smoother easing for children
			},
			"-=0.15" // Better overlap with theme buttons
		)
	}

	// Handle tab key for focus trap
	document.addEventListener("keydown", (e) => {
		if (settingsPanel && !settingsPanel.classList.contains("hidden")) {
			if (e.key === "Escape") {
				// Close panel and return focus to toggle button
				settingsPanel.classList.add("hidden")
				menuToggle?.classList.remove("opened")
				menuToggle?.setAttribute("aria-expanded", "false")
				menuToggle?.focus()
				return
			}

			// Focus trap logic
			if (
				e.key === "Tab" &&
				firstFocusableElement &&
				lastFocusableElement
			) {
				// If shift key pressed for reverse tabbing
				if (e.shiftKey) {
					if (document.activeElement === firstFocusableElement) {
						e.preventDefault()
						lastFocusableElement.focus()
					}
				} else {
					if (document.activeElement === lastFocusableElement) {
						e.preventDefault()
						firstFocusableElement.focus()
					}
				}
			}
		}
	})

	// Listen for panel opening
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.attributeName === "class" && settingsPanel) {
				if (!settingsPanel.classList.contains("hidden")) {
					// Panel was just opened
					setupFocusTrap()

					// Ensure clean animation state before animating
					gsap.killTweensOf([
						settingsPanelContent,
						themeButtonElements,
						fontButtonElements
					])
					animateSettingsPanel() // Run animation when panel opens
				}
			}
		})
	})

	if (settingsPanel) {
		observer.observe(settingsPanel, { attributes: true })
	}
}
