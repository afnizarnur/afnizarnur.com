/**
 * Initializes the theme management functionality for the settings panel
 * @returns {Object} Object with public methods for theme management
 */
export function initThemeManager() {
	const themeButtons = document.querySelectorAll("[data-theme]")
	const rootElement = document.documentElement

	// Media query for detecting system color scheme
	const systemThemeMedia = window.matchMedia("(prefers-color-scheme: dark)")

	// Set active theme based on current setting
	const setActiveTheme = () => {
		const currentTheme = localStorage.getItem("theme") || "system"
		themeButtons.forEach((button) => {
			const buttonTheme = button.getAttribute("data-theme")
			const buttonIcon = button.querySelector(".theme-icon")
			const isActive = buttonTheme === currentTheme

			// Only set aria-checked on elements with role="radio"
			if (button.getAttribute("role") === "radio") {
				button.setAttribute("aria-checked", isActive ? "true" : "false")
			}

			if (isActive) {
				if (buttonIcon) {
					buttonIcon.classList.add("opacity-50")
				}
			} else {
				if (buttonIcon) {
					buttonIcon.classList.remove("opacity-50")
				}
			}
		})
	}

	// Apply the appropriate theme
	const applyTheme = () => {
		const savedTheme = localStorage.getItem("theme")

		if (savedTheme) {
			// User has explicitly selected a theme
			rootElement.setAttribute("data-theme", savedTheme)
		} else {
			// Use system preference
			rootElement.setAttribute("data-theme", "system")
		}
	}

	// Listen for system preference changes
	systemThemeMedia.addEventListener("change", () => {
		// Only apply if user is using system theme
		if (!localStorage.getItem("theme")) {
			applyTheme()
		}
	})

	// Manage keyboard events for radiogroup
	const handleRadioKeydown = (event, currentButton) => {
		const buttons = Array.from(themeButtons)
		const currentIndex = buttons.indexOf(currentButton)
		let nextIndex = currentIndex

		switch (event.key) {
			case "ArrowRight":
			case "ArrowDown":
				event.preventDefault()
				nextIndex = (currentIndex + 1) % buttons.length
				break
			case "ArrowLeft":
			case "ArrowUp":
				event.preventDefault()
				nextIndex = (currentIndex - 1 + buttons.length) % buttons.length
				break
			case " ":
			case "Enter":
				event.preventDefault()
				currentButton.click()
				return
			default:
				return
		}

		const nextButton = buttons[nextIndex]
		if (nextButton) {
			nextButton.focus()
		}
	}

	// Update theme when buttons are clicked
	themeButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const theme = button.getAttribute("data-theme")

			if (theme === "system") {
				localStorage.removeItem("theme")
				applyTheme()
			} else if (theme) {
				localStorage.setItem("theme", theme)
				rootElement.setAttribute("data-theme", theme)
			}

			setActiveTheme()
		})

		// Add keyboard navigation for radio group
		button.addEventListener("keydown", (event) => {
			handleRadioKeydown(event, button)
		})
	})

	// Initialize
	setActiveTheme()
	applyTheme()

	// Return public methods
	return {
		setActiveTheme,
		applyTheme
	}
}
