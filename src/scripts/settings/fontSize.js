/**
 * Initializes the font size management functionality for the settings panel
 * @returns {Object} Object with public methods for font size management
 */
export function initFontSizeManager() {
	const rootElement = document.documentElement
	let currentFontSize = 100 // Default 100%

	// Font size functionality
	const fontDecreaseButton = document.getElementById("font-decrease")
	const fontDefaultButton = document.getElementById("font-default")
	const fontIncreaseButton = document.getElementById("font-increase")

	// Load saved font size or use default
	const loadFontSize = () => {
		const savedFontSize = localStorage.getItem("fontSize")
		if (savedFontSize) {
			currentFontSize = parseInt(savedFontSize)
			applyFontSize()
		}
	}

	// Apply font size to html element
	const applyFontSize = () => {
		rootElement.style.fontSize = `${currentFontSize}%`
		localStorage.setItem("fontSize", currentFontSize.toString())
	}

	// Add event listeners for font size buttons
	fontDecreaseButton?.addEventListener("click", () => {
		if (currentFontSize > 80) {
			currentFontSize -= 10
			applyFontSize()
		}
	})

	fontDefaultButton?.addEventListener("click", () => {
		currentFontSize = 100
		applyFontSize()
	})

	fontIncreaseButton?.addEventListener("click", () => {
		if (currentFontSize < 120) {
			currentFontSize += 10
			applyFontSize()
		}
	})

	// Initialize
	loadFontSize()

	// Return public methods
	return {
		getCurrentSize: () => currentFontSize,
		setFontSize: (size) => {
			currentFontSize = size
			applyFontSize()
		}
	}
}
