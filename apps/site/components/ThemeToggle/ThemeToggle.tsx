"use client"

import { MoonIcon, SunIcon } from "@phosphor-icons/react"
import { useDarkMode, useThemePreference } from "@/contexts/UserPreferencesContext"

interface ThemeToggleProps {
    size?: number
    className?: string
}

export function ThemeToggle({ size = 24, className = "" }: ThemeToggleProps): JSX.Element {
    const isDarkMode = useDarkMode()
    const { theme, setTheme } = useThemePreference()

    const toggleTheme = (): void => {
        // Toggle between light and dark
        // If currently in system mode, switch to explicit theme
        if (theme === "system") {
            // Toggle from current system preference
            setTheme(isDarkMode ? "light" : "dark")
        } else {
            // Toggle explicit preference
            setTheme(theme === "light" ? "dark" : "light")
        }
    }

    return (
        <button
            onClick={toggleTheme}
            className={`w-[40px] h-[40px] p-[8px] flex items-center justify-center text-icon-secondary hover:text-icon-primary active:text-icon-primary transition-colors rounded-radius-8 cursor-pointer ${className}`}
            aria-label="Toggle theme"
            type="button"
            suppressHydrationWarning
        >
            {/* Show moon icon in light mode, sun icon in dark mode */}
            <MoonIcon
                size={size}
                color="currentColor"
                className="hidden [[data-theme=light]_&]:block"
                aria-hidden="true"
            />
            <SunIcon
                size={size}
                color="currentColor"
                className="hidden [[data-theme=dark]_&]:block"
                aria-hidden="true"
            />
        </button>
    )
}
