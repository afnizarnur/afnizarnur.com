import { useCallback, useEffect, useRef } from "react"
import { AUTO_SCROLL_SPEED, AUTO_SCROLL_THRESHOLD } from "../constants"
import type { ScrollDirection } from "../types"

interface UseAutoScrollReturn {
    startAutoScroll: (mouseX: number) => void
    stopAutoScroll: () => void
}

/**
 * Manages auto-scroll functionality when dragging near edges
 */
export function useAutoScroll(
    scrollContainerRef: React.RefObject<HTMLDivElement | null>
): UseAutoScrollReturn {
    const autoScrollIntervalRef = useRef<number | null>(null)

    const stopAutoScroll = useCallback((): void => {
        if (autoScrollIntervalRef.current) {
            cancelAnimationFrame(autoScrollIntervalRef.current)
            autoScrollIntervalRef.current = null
        }
    }, [])

    const startAutoScroll = useCallback(
        (mouseX: number): void => {
            if (!scrollContainerRef.current) return

            const scrollContainer = scrollContainerRef.current
            const rect = scrollContainer.getBoundingClientRect()
            const mouseRelativeX = mouseX - rect.left

            // Stop any existing auto-scroll
            stopAutoScroll()

            // Determine scroll direction
            let scrollDirection: ScrollDirection = 0

            if (mouseRelativeX < AUTO_SCROLL_THRESHOLD) {
                // Near left edge - scroll left
                scrollDirection = -1
            } else if (mouseRelativeX > rect.width - AUTO_SCROLL_THRESHOLD) {
                // Near right edge - scroll right
                scrollDirection = 1
            }

            // Start scrolling if needed
            if (scrollDirection !== 0) {
                const scroll = (): void => {
                    if (!scrollContainerRef.current) return

                    scrollContainerRef.current.scrollLeft += scrollDirection * AUTO_SCROLL_SPEED

                    // Continue scrolling
                    autoScrollIntervalRef.current = requestAnimationFrame(scroll)
                }
                autoScrollIntervalRef.current = requestAnimationFrame(scroll)
            }
        },
        [scrollContainerRef, stopAutoScroll]
    )

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (autoScrollIntervalRef.current) {
                cancelAnimationFrame(autoScrollIntervalRef.current)
            }
        }
    }, [])

    return {
        startAutoScroll,
        stopAutoScroll,
    }
}
