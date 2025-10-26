"use client"

import type React from "react"
import { createContext, useCallback, useContext, useState } from "react"
import { AvatarState } from "../components/widgets/Avatar"
import { SnakeGameStateManager } from "../components/widgets/SnakeGame"
import { WIDGET_CONFIGS } from "../config"
import type { ConstraintBounds, WidgetPosition } from "../types"
import { clearWidgetData } from "../utils"

interface DragContextValue {
    dragDisabledWidgets: Set<string>
    setWidgetDragDisabled: (widgetId: string, disabled: boolean) => void
    isWidgetDragDisabled: (widgetId: string) => boolean
    resetAll: () => void
    hasChanges: boolean
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

interface DragProviderProps {
    children: React.ReactNode
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
    hasPositionChanges: boolean
}

const DragContext = createContext<DragContextValue | undefined>(undefined)

export function DragProvider({
    children,
    positions,
    savePosition,
    updatePosition,
    resetPositions,
    hasPositionChanges,
}: DragProviderProps): React.ReactElement {
    const [dragDisabledWidgets, setDragDisabledWidgets] = useState<Set<string>>(new Set())

    const setWidgetDragDisabled = useCallback((widgetId: string, disabled: boolean) => {
        setDragDisabledWidgets((prev) => {
            const next = new Set(prev)
            if (disabled) {
                next.add(widgetId)
            } else {
                next.delete(widgetId)
            }
            return next
        })
    }, [])

    const isWidgetDragDisabled = useCallback(
        (widgetId: string) => {
            return dragDisabledWidgets.has(widgetId)
        },
        [dragDisabledWidgets]
    )

    // Reset all widget states and positions
    const resetAll = useCallback(() => {
        // Reset widget positions
        if (resetPositions) {
            resetPositions()
        }

        // Reset Snake game state
        try {
            SnakeGameStateManager.getInstance().performReset()
        } catch (error) {
            console.error("Failed to reset snake game:", error)
        }

        // Reset Avatar canvas
        try {
            const avatarInstance = AvatarState.getInstance("avatar")
            avatarInstance.clearCanvas()
            avatarInstance.resetLoadState()
        } catch (error) {
            console.error("Failed to reset avatar:", error)
        }

        // Clear all widget data from localStorage
        WIDGET_CONFIGS.forEach((config) => {
            clearWidgetData(config.id)
        })
    }, [resetPositions])

    return (
        <DragContext.Provider
            value={{
                dragDisabledWidgets,
                setWidgetDragDisabled,
                isWidgetDragDisabled,
                resetAll,
                hasChanges: hasPositionChanges,
                positions,
                savePosition,
                updatePosition,
            }}
        >
            {children}
        </DragContext.Provider>
    )
}

export function useDragContext(): DragContextValue {
    const context = useContext(DragContext)
    if (!context) {
        throw new Error("useDragContext must be used within a DragProvider")
    }
    return context
}

/**
 * Safe version of useDragContext that returns undefined if not within a DragProvider
 */
export function useDragContextSafe(): DragContextValue | undefined {
    return useContext(DragContext)
}
