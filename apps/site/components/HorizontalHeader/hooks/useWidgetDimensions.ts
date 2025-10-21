import { useState, useEffect, useRef, useCallback } from "react"
import type { WidgetConfig } from "../types"
import { DEFAULT_MIN_HEIGHT, RESIZE_DEBOUNCE_DELAY } from "../constants"
import { debounce } from "../utils"

interface UseWidgetDimensionsReturn {
    widgetHeights: Record<string, number>
    widgetRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>
    getWidgetHeight: (config: WidgetConfig) => number
}

/**
 * Manages widget dimensions with ResizeObserver
 */
export function useWidgetDimensions(configs: WidgetConfig[]): UseWidgetDimensionsReturn {
    const [widgetHeights, setWidgetHeights] = useState<Record<string, number>>({})
    const widgetRefs = useRef<Record<string, HTMLDivElement | null>>({})
    const configsRef = useRef(configs)

    // Update configs ref when configs change (but don't recreate observer)
    useEffect(() => {
        configsRef.current = configs
    }, [configs])

    // Get widget height with fallbacks
    const getWidgetHeight = useCallback(
        (config: WidgetConfig): number => {
            return (
                widgetHeights[config.id] || config.height || config.minHeight || DEFAULT_MIN_HEIGHT
            )
        },
        [widgetHeights]
    )

    // Measure widget heights dynamically
    useEffect(() => {
        const measureWidgetHeights = (): void => {
            const newHeights: Record<string, number> = {}
            configsRef.current.forEach((config) => {
                const widgetElement = widgetRefs.current[config.id]
                if (widgetElement) {
                    newHeights[config.id] = widgetElement.offsetHeight
                } else {
                    newHeights[config.id] =
                        config.height || config.minHeight || DEFAULT_MIN_HEIGHT
                }
            })
            setWidgetHeights(newHeights)
        }

        // Debounce measurements for performance
        const debouncedMeasure = debounce(measureWidgetHeights, RESIZE_DEBOUNCE_DELAY)

        // Measure initially
        measureWidgetHeights()

        // Re-measure on resize
        const resizeObserver = new ResizeObserver(debouncedMeasure)
        Object.values(widgetRefs.current).forEach((el) => {
            if (el) resizeObserver.observe(el)
        })

        return () => {
            resizeObserver.disconnect()
        }
        // Empty deps - only create observer once on mount
    }, [])

    return {
        widgetHeights,
        widgetRefs,
        getWidgetHeight,
    }
}
