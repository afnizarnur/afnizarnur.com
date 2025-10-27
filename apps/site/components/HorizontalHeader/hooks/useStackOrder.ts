import { useCallback, useEffect, useState } from "react"
import { STORAGE_KEYS } from "@/lib/storage"
import { ACTIVE_Z_INDEX, BASE_Z_INDEX } from "../constants"
import type { WidgetConfig } from "../types"
import { parseStorageData, writeStorageData } from "../utils"

interface UseStackOrderReturn {
    stackOrder: string[]
    draggingId: string | null
    getZIndex: (widgetId: string) => number
    bringToFront: (widgetId: string) => void
    setDragging: (widgetId: string | null) => void
    resetStackOrder: () => void
}

/**
 * Manages z-index stack order for overlapping widgets with localStorage persistence
 */
export function useStackOrder(configs: WidgetConfig[]): UseStackOrderReturn {
    const [stackOrder, setStackOrder] = useState<string[]>([])
    const [draggingId, setDraggingId] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)

    // Initialize with default stack order, then load from localStorage
    useEffect(() => {
        const defaultStackOrder = configs.map((config) => config.id)
        setStackOrder(defaultStackOrder)
        setMounted(true)

        // Load saved stack order from localStorage
        const savedStackOrder = parseStorageData<string[]>(STORAGE_KEYS.widgetStackOrder, [])
        if (savedStackOrder.length > 0) {
            // Filter to only include widgets that exist in current configs
            const validIds = new Set(defaultStackOrder)
            const filteredStackOrder = savedStackOrder.filter((id) => validIds.has(id))

            // Add any new widgets not in saved order
            const newIds = defaultStackOrder.filter((id) => !filteredStackOrder.includes(id))
            setStackOrder([...filteredStackOrder, ...newIds])
        }
    }, [configs])

    // Bring a widget to the front of the stack
    const bringToFront = useCallback(
        (widgetId: string): void => {
            setStackOrder((prev) => {
                const filtered = prev.filter((id) => id !== widgetId)
                const newStackOrder = [...filtered, widgetId]
                // Persist to localStorage
                if (mounted) {
                    writeStorageData(STORAGE_KEYS.widgetStackOrder, newStackOrder)
                }
                return newStackOrder
            })
        },
        [mounted]
    )

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

    // Reset stack order to defaults
    const resetStackOrder = useCallback((): void => {
        const defaultStackOrder = configs.map((config) => config.id)
        setStackOrder(defaultStackOrder)
        try {
            localStorage.removeItem(STORAGE_KEYS.widgetStackOrder)
        } catch (error) {
            console.error("Failed to clear widget stack order from localStorage:", error)
        }
    }, [configs])

    return {
        stackOrder,
        draggingId,
        getZIndex,
        bringToFront,
        setDragging,
        resetStackOrder,
    }
}
