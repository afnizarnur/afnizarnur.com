import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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

// Helper to generate default stack order from configs
function getDefaultStackOrder(configs: WidgetConfig[]): string[] {
    return configs.map((config) => config.id)
}

// Load and validate saved stack order from localStorage
function loadSavedStackOrder(defaultOrder: string[]): string[] {
    try {
        const savedStackOrder = parseStorageData<string[]>(STORAGE_KEYS.widgetStackOrder, [])

        if (savedStackOrder.length === 0) {
            return defaultOrder
        }

        // Filter to only include widgets that exist in current configs
        const validIds = new Set(defaultOrder)
        const filteredStackOrder = savedStackOrder.filter((id) => validIds.has(id))

        // Add any new widgets not in saved order
        const newIds = defaultOrder.filter((id) => !filteredStackOrder.includes(id))

        return [...filteredStackOrder, ...newIds]
    } catch (error) {
        console.error("Failed to load widget stack order from localStorage:", error)
        return defaultOrder
    }
}

/**
 * Manages z-index stack order for overlapping widgets with localStorage persistence
 */
export function useStackOrder(configs: WidgetConfig[]): UseStackOrderReturn {
    // Memoize default stack order to prevent unnecessary recalculations
    const defaultStackOrder = useMemo(() => getDefaultStackOrder(configs), [configs])

    // Track if component is mounted to prevent hydration issues
    const isMountedRef = useRef(false)

    // Initialize state with lazy initialization to prevent double renders
    const [stackOrder, setStackOrder] = useState<string[]>(() => defaultStackOrder)
    const [draggingId, setDraggingId] = useState<string | null>(null)

    // Load saved stack order from localStorage after mount
    useEffect(() => {
        isMountedRef.current = true

        const initialStackOrder = loadSavedStackOrder(defaultStackOrder)
        setStackOrder(initialStackOrder)

        return () => {
            isMountedRef.current = false
        }
    }, [defaultStackOrder])

    // Bring widget to front and persist to localStorage
    const bringToFront = useCallback(
        (widgetId: string): void => {
            // Validate widget ID exists
            if (!defaultStackOrder.includes(widgetId)) {
                console.warn(`Attempted to bring non-existent widget to front: ${widgetId}`)
                return
            }

            setStackOrder((prev) => {
                const filtered = prev.filter((id) => id !== widgetId)
                const newStackOrder = [...filtered, widgetId]

                // Persist to localStorage after mount
                if (isMountedRef.current) {
                    try {
                        writeStorageData(STORAGE_KEYS.widgetStackOrder, newStackOrder)
                    } catch (error) {
                        console.error(
                            "Failed to persist widget stack order to localStorage:",
                            error
                        )
                    }
                }

                return newStackOrder
            })
        },
        [defaultStackOrder]
    )

    // Calculate z-index based on stack position
    // Dragging widget gets ACTIVE_Z_INDEX (100), others get stackPosition + BASE_Z_INDEX (10+)
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

    // Set currently dragging widget
    const setDragging = useCallback((widgetId: string | null): void => {
        setDraggingId(widgetId)
    }, [])

    // Reset stack order to defaults
    const resetStackOrder = useCallback((): void => {
        setStackOrder(defaultStackOrder)

        try {
            localStorage.removeItem(STORAGE_KEYS.widgetStackOrder)
        } catch (error) {
            console.error("Failed to clear widget stack order from localStorage:", error)
        }
    }, [defaultStackOrder])

    return {
        stackOrder,
        draggingId,
        getZIndex,
        bringToFront,
        setDragging,
        resetStackOrder,
    }
}
