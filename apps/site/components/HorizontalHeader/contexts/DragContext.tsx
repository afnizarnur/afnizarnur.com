"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

interface DragContextValue {
    dragDisabledWidgets: Set<string>
    setWidgetDragDisabled: (widgetId: string, disabled: boolean) => void
    isWidgetDragDisabled: (widgetId: string) => boolean
}

const DragContext = createContext<DragContextValue | undefined>(undefined)

export function DragProvider({ children }: { children: React.ReactNode }): React.ReactElement {
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

    return (
        <DragContext.Provider
            value={{ dragDisabledWidgets, setWidgetDragDisabled, isWidgetDragDisabled }}
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
