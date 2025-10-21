"use client"

import { Moon, Sun } from "@phosphor-icons/react"

interface ThemeToggleProps {
    size?: number
    className?: string
}

export function ThemeToggle({ size = 24, className = "" }: ThemeToggleProps): JSX.Element {
    const toggleTheme = (): void => {
        // Read current theme from DOM
        const currentTheme = document.documentElement.getAttribute("data-theme")
        const newTheme = currentTheme === "light" ? "dark" : "light"

        // Apply theme to DOM
        document.documentElement.setAttribute("data-theme", newTheme)

        // Save to localStorage
        try {
            localStorage.setItem("theme-preference", newTheme)
        } catch {
            // Silently fail if localStorage is not available
        }
    }

    return (
        <button
            onClick={toggleTheme}
            className={`w-[40px] h-[40px] p-[8px] flex items-center justify-center text-icon-secondary hover:text-icon-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-icon-primary active:text-icon-primary transition-colors rounded-radius-8 ${className}`}
            aria-label="Toggle theme"
            type="button"
            suppressHydrationWarning
        >
            {/* Both icons rendered, CSS controls visibility based on data-theme */}
            <Moon
                size={size}
                color="currentColor"
                className="hidden [[data-theme=light]_&]:block"
                aria-hidden="true"
            />
            <Sun
                size={size}
                color="currentColor"
                className="hidden [[data-theme=dark]_&]:block"
                aria-hidden="true"
            />
        </button>
    )
}
