import { useEffect, useState } from "react"

/**
 * Hook to detect user's reduced motion preference
 * Respects the prefers-reduced-motion media query
 * 
 * @deprecated Prefer using Framer Motion's built-in `useReducedMotion` hook instead:
 * ```typescript
 * import { useReducedMotion } from "framer-motion"
 * ```
 * 
 * This custom hook is kept for reference and non-Framer Motion use cases.
 */
export function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
        // Check if window is available (client-side only)
        if (typeof window === "undefined") {
            return
        }

        // Create media query
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

        // Set initial value
        setPrefersReducedMotion(mediaQuery.matches)

        // Create event listener for changes
        const handleChange = (event: MediaQueryListEvent): void => {
            setPrefersReducedMotion(event.matches)
        }

        // Add listener (use addEventListener for better browser support)
        mediaQuery.addEventListener("change", handleChange)

        // Cleanup
        return () => {
            mediaQuery.removeEventListener("change", handleChange)
        }
    }, [])

    return prefersReducedMotion
}
