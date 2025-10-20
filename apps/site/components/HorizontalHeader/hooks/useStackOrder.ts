import { useState, useCallback, useEffect } from "react"
import type { WidgetConfig } from "../types"
import { BASE_Z_INDEX, ACTIVE_Z_INDEX } from "../constants"

interface UseStackOrderReturn {
    stackOrder: string[]
    draggingId: string | null
    getZIndex: (widgetId: string) => number
    bringToFront: (widgetId: string) => void
    setDragging: (widgetId: string | null) => void
}

/**
 * Manages z-index stack order for overlapping widgets
 */
export function useStackOrder(configs: WidgetConfig[]): UseStackOrderReturn {
    const [stackOrder, setStackOrder] = useState<string[]>([])
    const [draggingId, setDraggingId] = useState<string | null>(null)

    // Initialize stack order with all widget IDs
    useEffect(() => {
        setStackOrder(configs.map((config) => config.id))
    }, [configs])

    // Bring a widget to the front of the stack
    const bringToFront = useCallback((widgetId: string): void => {
        setStackOrder((prev) => {
            const filtered = prev.filter((id) => id !== widgetId)
            return [...filtered, widgetId]
        })
    }, [])

    // Calculate z-index for a widget
    const getZIndex = useCallback(
        (widgetId: string): number => {
            if (draggingId === widgetId) {
                return ACTIVE_Z_INDEX
            }
            const stackIndex = stackOrder.indexOf(widgetId)
            return stackIndex >= 0 ? stackIndex + BASE_Z_INDEX : BASE_Z_INDEX
        },
        [stackOrder, draggingId]
    )

    // Set the currently dragging widget
    const setDragging = useCallback((widgetId: string | null): void => {
        setDraggingId(widgetId)
    }, [])

    return {
        stackOrder,
        draggingId,
        getZIndex,
        bringToFront,
        setDragging,
    }
}
