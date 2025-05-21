import { initPanelAnimation } from "./animation.js"
import { initThemeManager } from "./theme.js"
import { initFontSizeManager } from "./fontSize.js"

/**
 * Main initialization function for the settings panel
 * Coordinates all modules: animation, theme, and font size
 */
export function initSettingsPanel() {
	// Initialize all modules and store any returned APIs
	const themeManager = initThemeManager()
	const fontSizeManager = initFontSizeManager()
	initPanelAnimation()

	// Return a unified API if needed in the future
	return {
		theme: themeManager,
		fontSize: fontSizeManager
	}
}
