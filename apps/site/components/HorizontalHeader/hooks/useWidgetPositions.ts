import { useState, useCallback, useEffect } from "react"
import type { WidgetConfig, WidgetPosition, ConstraintBounds } from "../types"
import { STORAGE_KEY } from "../constants"
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
}

/**
 * Manages widget positions with localStorage persistence
 */
export function useWidgetPositions(configs: WidgetConfig[]): UseWidgetPositionsReturn {
    const [positions, setPositions] = useState<Record<string, WidgetPosition>>(() => {
        // Initialize with default positions
        const defaultPositions: Record<string, WidgetPosition> = {}
        configs.forEach((config) => {
            defaultPositions[config.id] = {
                x: config.defaultX,
                y: config.defaultY,
            }
        })
        return defaultPositions
    })

    // Load positions from localStorage on mount
    useEffect(() => {
        const savedPositions = parseStorageData<Record<string, WidgetPosition>>(STORAGE_KEY, {})
        if (Object.keys(savedPositions).length > 0) {
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
                writeStorageData(STORAGE_KEY, newPositions)
                return newPositions
            })
        },
        []
    )

    // Update position without saving to localStorage (for optimistic updates)
    const updatePosition = useCallback((id: string, position: WidgetPosition): void => {
        setPositions((prev) => ({ ...prev, [id]: position }))
    }, [])

    return {
        positions,
        savePosition,
        updatePosition,
    }
}
