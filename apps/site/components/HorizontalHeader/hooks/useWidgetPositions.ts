import { useState, useCallback, useMemo, useEffect } from "react"
import type { WidgetConfig, WidgetPosition, ConstraintBounds } from "../types"
import { STORAGE_KEYS } from "@/lib/storage"
import { clampPosition, parseStorageData, writeStorageData } from "../utils"

interface UseWidgetPositionsReturn {
    positions: Record<string, WidgetPosition>
    savePosition: (
        id: string,
        x: number,
        y: number,
        width: number,
        height: number,
        bounds: ConstraintBounds
    ) => void
    updatePosition: (id: string, position: WidgetPosition) => void
    resetPositions: () => void
    hasChanges: boolean
}

/**
 * Manages widget positions with localStorage persistence
 */
export function useWidgetPositions(configs: WidgetConfig[]): UseWidgetPositionsReturn {
    // Compute default positions from configs
    const defaultPositions = useMemo<Record<string, WidgetPosition>>(() => {
        const defaults: Record<string, WidgetPosition> = {}
        configs.forEach((config) => {
            defaults[config.id] = {
                x: config.defaultX,
                y: config.defaultY,
            }
        })
        return defaults
    }, [configs])

    // Initialize with default positions first
    const [positions, setPositions] = useState<Record<string, WidgetPosition>>(defaultPositions)

    // Track client-side mount to prevent hydration mismatch with hasChanges
    const [mounted, setMounted] = useState(false)

    // Load saved positions from localStorage after mount to enable smooth animation
    useEffect(() => {
        setMounted(true)
        const savedPositions = parseStorageData<Record<string, WidgetPosition>>(
            STORAGE_KEYS.widgetPositions,
            {}
        )
        if (Object.keys(savedPositions).length > 0) {
            // Merge saved positions with defaults (saved positions take precedence)
            setPositions((prev) => ({ ...prev, ...savedPositions }))
        }
    }, [])

    // Save position to localStorage with clamping
    const savePosition = useCallback(
        (
            id: string,
            x: number,
            y: number,
            width: number,
            height: number,
            bounds: ConstraintBounds
        ): void => {
            const clamped = clampPosition(x, y, width, height, bounds)
            setPositions((prev) => {
                const newPositions = { ...prev, [id]: clamped }
                writeStorageData(STORAGE_KEYS.widgetPositions, newPositions)
                return newPositions
            })
        },
        []
    )

    // Update position without saving to localStorage (for optimistic updates)
    const updatePosition = useCallback((id: string, position: WidgetPosition): void => {
        setPositions((prev) => ({ ...prev, [id]: position }))
    }, [])

    // Reset all positions to defaults
    const resetPositions = useCallback((): void => {
        setPositions(defaultPositions)
        try {
            localStorage.removeItem(STORAGE_KEYS.widgetPositions)
        } catch (error) {
            console.error("Failed to clear widget positions from localStorage:", error)
        }
    }, [defaultPositions])

    // Check if current positions differ from defaults
    // Only calculate after mount to prevent hydration mismatch
    const hasChanges =
        mounted &&
        Object.keys(positions).some((id) => {
            const current = positions[id]
            const defaultPos = defaultPositions[id]
            return current?.x !== defaultPos?.x || current?.y !== defaultPos?.y
        })

    return {
        positions,
        savePosition,
        updatePosition,
        resetPositions,
        hasChanges,
    }
}
