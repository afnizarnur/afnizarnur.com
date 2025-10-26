"use client"

import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { STORAGE_KEYS } from "@/lib/storage"

/**
 * User preference types
 */
type MotionPreference = "system" | "always" | "never"
type ThemePreference = "system" | "light" | "dark"

/**
 * All user preferences stored in a single object
 */
interface UserPreferences {
    motion: MotionPreference
    theme: ThemePreference
}

/**
 * Context value with preferences and computed states
 */
interface UserPreferencesContextValue {
    // Raw preferences
    preferences: UserPreferences

    // Computed values (system preference + user override)
    prefersReducedMotion: boolean
    isDarkMode: boolean

    // Setters
    setMotionPreference: (value: MotionPreference) => void
    setThemePreference: (value: ThemePreference) => void

    // Utility
    resetToDefaults: () => void
}

const DEFAULT_PREFERENCES: UserPreferences = {
    motion: "system",
    theme: "system",
}

const UserPreferencesContext = createContext<UserPreferencesContextValue | null>(null)

/**
 * Provider component that manages all user preferences
 * Handles both motion and theme preferences with system detection and localStorage persistence
 */
export function UserPreferencesProvider({
    children,
}: {
    children: React.ReactNode
}): React.ReactElement {
    const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES)

    // System preferences detection
    const [systemPrefersReducedMotion, setSystemPrefersReducedMotion] = useState(false)
    const [systemPrefersDark, setSystemPrefersDark] = useState(false)

    // Listen to system motion preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
        setSystemPrefersReducedMotion(mediaQuery.matches)

        const handleChange = (e: MediaQueryListEvent): void => {
            setSystemPrefersReducedMotion(e.matches)
        }

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    // Listen to system theme preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        setSystemPrefersDark(mediaQuery.matches)

        const handleChange = (e: MediaQueryListEvent): void => {
            setSystemPrefersDark(e.matches)
        }

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEYS.userPreferences)
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as Partial<UserPreferences>
                setPreferences({ ...DEFAULT_PREFERENCES, ...parsed })
            } catch (error) {
                console.error("Failed to parse user preferences:", error)
            }
        }
    }, [])

    // Track if this is the initial mount to avoid FOUC
    const isInitialMount = React.useRef(true)

    // Save to localStorage whenever preferences change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.userPreferences, JSON.stringify(preferences))
    }, [preferences])

    // Apply theme when it changes (skip initial mount to prevent FOUC)
    useEffect(() => {
        // Skip on initial mount - inline script already handled it
        if (isInitialMount.current) {
            isInitialMount.current = false
            return
        }

        // Apply theme when user changes preference or system preference changes
        const theme =
            preferences.theme === "dark"
                ? "dark"
                : preferences.theme === "light"
                  ? "light"
                  : systemPrefersDark
                    ? "dark"
                    : "light"

        document.documentElement.setAttribute("data-theme", theme)
        document.documentElement.style.colorScheme = theme
    }, [preferences.theme, systemPrefersDark])

    // Computed values
    const prefersReducedMotion =
        preferences.motion === "always"
            ? true
            : preferences.motion === "never"
              ? false
              : systemPrefersReducedMotion

    const isDarkMode =
        preferences.theme === "dark"
            ? true
            : preferences.theme === "light"
              ? false
              : systemPrefersDark

    // Setters
    const setMotionPreference = useCallback((value: MotionPreference): void => {
        setPreferences((prev) => ({ ...prev, motion: value }))
    }, [])

    const setThemePreference = useCallback((value: ThemePreference): void => {
        setPreferences((prev) => ({ ...prev, theme: value }))
    }, [])

    const resetToDefaults = useCallback((): void => {
        setPreferences(DEFAULT_PREFERENCES)
    }, [])

    return (
        <UserPreferencesContext.Provider
            value={{
                preferences,
                prefersReducedMotion,
                isDarkMode,
                setMotionPreference,
                setThemePreference,
                resetToDefaults,
            }}
        >
            {children}
        </UserPreferencesContext.Provider>
    )
}

/**
 * Main hook to access all user preferences
 */
export function useUserPreferences(): UserPreferencesContextValue {
    const context = useContext(UserPreferencesContext)
    if (!context) {
        throw new Error("useUserPreferences must be used within UserPreferencesProvider")
    }
    return context
}

/**
 * Convenience hook for reduced motion preference
 * Returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
    const { prefersReducedMotion } = useUserPreferences()
    return prefersReducedMotion
}

/**
 * Convenience hook for dark mode state
 * Returns true if dark mode is active
 */
export function useDarkMode(): boolean {
    const { isDarkMode } = useUserPreferences()
    return isDarkMode
}

/**
 * Convenience hook for theme preference
 * Returns theme preference and setter
 */
export function useThemePreference(): {
    theme: ThemePreference
    setTheme: (value: ThemePreference) => void
} {
    const { preferences, setThemePreference } = useUserPreferences()
    return { theme: preferences.theme, setTheme: setThemePreference }
}

/**
 * Convenience hook for motion preference
 * Returns motion preference and setter
 */
export function useMotionPreference(): {
    motion: MotionPreference
    setMotion: (value: MotionPreference) => void
} {
    const { preferences, setMotionPreference } = useUserPreferences()
    return { motion: preferences.motion, setMotion: setMotionPreference }
}
