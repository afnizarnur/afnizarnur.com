"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "@phosphor-icons/react"

interface ThemeToggleProps {
    size?: number
    className?: string
}

export function ThemeToggle({ size = 24, className = "" }: ThemeToggleProps): JSX.Element {
    const [theme, setTheme] = useState<"light" | "dark">("light")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Get current theme from document
        const currentTheme = document.documentElement.getAttribute("data-theme")
        if (currentTheme === "dark" || currentTheme === "light") {
            setTheme(currentTheme)
        }
    }, [])

    const toggleTheme = (): void => {
        const newTheme = theme === "light" ? "dark" : "light"

        // Apply theme to DOM
        document.documentElement.setAttribute("data-theme", newTheme)

        // Save to localStorage
        try {
            localStorage.setItem("theme-preference", newTheme)
        } catch {
            // Silently fail if localStorage is not available
        }

        setTheme(newTheme)
    }

    // Don't render until mounted to avoid hydration mismatch
    if (!mounted) {
        return (
            <button
                className={`w-[40px] h-[40px] p-[8px] flex items-center justify-center text-icon-secondary transition-colors ${className}`}
                aria-label="Toggle theme"
                type="button"
                disabled
            >
                <div className="w-6 h-6" />
            </button>
        )
    }

    return (
        <button
            onClick={toggleTheme}
            className={`w-[40px] h-[40px] p-[8px] flex items-center justify-center text-icon-secondary hover:text-icon-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-icon-primary active:text-icon-primary transition-colors rounded-radius-8 ${className}`}
            aria-label={`Toggle theme (currently ${theme})`}
            aria-pressed={theme === "dark"}
            type="button"
        >
            {theme === "light" ? (
                <Moon size={size} color="currentColor" />
            ) : (
                <Sun size={size} color="currentColor" />
            )}
        </button>
    )
}
