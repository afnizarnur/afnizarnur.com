"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "@phosphor-icons/react"

interface ThemeToggleProps {
    size?: number
    className?: string
}

export function ThemeToggle({ size = 24, className = "" }: ThemeToggleProps): JSX.Element {
    // Initialize with the current theme from DOM (set by blocking script)
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        // On client, read the theme that was set by the blocking script
        if (typeof document !== "undefined") {
            const currentTheme = document.documentElement.getAttribute("data-theme")
            return currentTheme === "dark" ? "dark" : "light"
        }
        // On server, default to light (will be overridden immediately on client)
        return "light"
    })
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Sync theme state with DOM on mount (in case blocking script set a different theme)
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

    // Don't render icon until mounted to prevent hydration mismatch
    // Server doesn't know user's theme preference (stored in localStorage)
    if (!mounted) {
        return (
            <button
                className={`w-[40px] h-[40px] p-[8px] flex items-center justify-center text-icon-secondary transition-colors rounded-radius-8 ${className}`}
                aria-label="Toggle theme"
                type="button"
                disabled
            >
                {/* Invisible placeholder to prevent layout shift */}
                <div className="w-6 h-6" aria-hidden="true" />
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
