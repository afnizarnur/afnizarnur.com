"use client"

import type React from "react"
import { WIDGET_CONFIGS } from "./HorizontalHeader/config"
import { DragProvider } from "./HorizontalHeader/contexts/DragContext"
import { useWidgetPositions } from "./HorizontalHeader/hooks/useWidgetPositions"

interface LayoutProviderProps {
    children: React.ReactNode
}

/**
 * Client-side provider wrapper for the layout
 * Provides drag context for widget reset functionality
 */
export function LayoutProvider({ children }: LayoutProviderProps): React.ReactElement {
    const { positions, savePosition, updatePosition, resetPositions, hasChanges } =
        useWidgetPositions(WIDGET_CONFIGS)

    return (
        <DragProvider
            positions={positions}
            savePosition={savePosition}
            updatePosition={updatePosition}
            resetPositions={resetPositions}
            hasPositionChanges={hasChanges}
        >
            {children}
        </DragProvider>
    )
}
