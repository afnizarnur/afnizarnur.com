/**
 * Theme management utilities
 * Handles theme initialization, switching, and persistence
 */

export type Theme = "light" | "dark"

const THEME_KEY = "theme-preference"
const THEME_ATTRIBUTE = "data-theme"

/**
 * Get the saved theme preference from localStorage
 */
function getSavedTheme(): Theme | null {
    if (typeof localStorage === "undefined") return null
    try {
        const saved = localStorage.getItem(THEME_KEY)
        return saved === "light" || saved === "dark" ? saved : null
    } catch {
        return null
    }
}

/**
 * Get the system theme preference
 */
function getSystemTheme(): Theme {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
        return "light"
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

/**
 * Initialize theme on page load
 * This runs as early as possible to prevent flash of unstyled content (FOUC)
 */
export function initializeTheme(): void {
    // Get theme preference in order: saved > system > default to light
    const savedTheme = getSavedTheme()
    const systemTheme = getSystemTheme()
    const theme = savedTheme || systemTheme

    // Apply theme immediately
    applyTheme(theme)
}

/**
 * Apply theme to the document
 */
export function applyTheme(theme: Theme): void {
    if (typeof document !== "undefined") {
        document.documentElement.setAttribute(THEME_ATTRIBUTE, theme)
        // Set color-scheme for browser UI hints (scrollbars, form controls, etc.)
        document.documentElement.style.colorScheme = theme
    }
}

/**
 * Get current theme
 */
export function getCurrentTheme(): Theme {
    if (typeof document === "undefined") return "light"
    const theme = document.documentElement.getAttribute(THEME_ATTRIBUTE)
    return theme === "dark" ? "dark" : "light"
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(): Theme {
    const current = getCurrentTheme()
    const next: Theme = current === "light" ? "dark" : "light"

    // Apply theme
    applyTheme(next)

    // Save preference
    if (typeof localStorage !== "undefined") {
        try {
            localStorage.setItem(THEME_KEY, next)
        } catch {
            // Silently fail if localStorage is not available
        }
    }

    return next
}

/**
 * Set specific theme
 */
export function setTheme(theme: Theme): void {
    applyTheme(theme)

    if (typeof localStorage !== "undefined") {
        try {
            localStorage.setItem(THEME_KEY, theme)
        } catch {
            // Silently fail if localStorage is not available
        }
    }
}

/**
 * Inline script for theme initialization
 * This should be added to the document <head> before any content renders
 * to prevent FOUC (Flash of Unstyled Content)
 *
 * NOTE: This reads from the unified "user-preferences" localStorage key
 * which is managed by UserPreferencesContext
 */
export const themeInitScript = `
;(function () {
    const STORAGE_KEY = "user-preferences"
    const THEME_ATTRIBUTE = "data-theme"

    function getSavedThemePreference() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (!stored) return null

            const preferences = JSON.parse(stored)
            const theme = preferences.theme
            return theme === "light" || theme === "dark" || theme === "system" ? theme : null
        } catch {
            // Fallback: check old theme-preference key for migration
            try {
                const oldSaved = localStorage.getItem("theme-preference")
                return oldSaved === "light" || oldSaved === "dark" ? oldSaved : null
            } catch {
                return null
            }
        }
    }

    function getSystemTheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute(THEME_ATTRIBUTE, theme)
        // Set color-scheme for browser UI hints (scrollbars, form controls, etc.)
        document.documentElement.style.colorScheme = theme
    }

    function initializeTheme() {
        const savedThemePreference = getSavedThemePreference()
        const systemTheme = getSystemTheme()

        // Resolve actual theme from preference
        let theme
        if (savedThemePreference === "light" || savedThemePreference === "dark") {
            theme = savedThemePreference
        } else {
            // "system" or no preference - use system theme
            theme = systemTheme
        }

        applyTheme(theme)
    }

    // Initialize on page load
    initializeTheme()

    // Listen for system theme changes (when user changes OS theme)
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
            const savedThemePreference = getSavedThemePreference()
            // Only apply system theme if user preference is "system" or not set
            if (!savedThemePreference || savedThemePreference === "system") {
                applyTheme(e.matches ? "dark" : "light")
            }
        })
})()
`
