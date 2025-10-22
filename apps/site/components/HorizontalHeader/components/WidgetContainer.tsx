import React, { useCallback } from "react"
import { DraggableWidget } from "./DraggableWidget"
import type { WidgetConfig, WidgetPosition, ConstraintBounds } from "../types"
import { TOTAL_CONTENT_WIDTH } from "../constants"
import { calculateConstraintBounds } from "../utils"

interface WidgetContainerProps {
    configs: WidgetConfig[]
    positions: Record<string, WidgetPosition>
    widgetHeights: Record<string, number>
    draggingId: string | null
    contentRef: React.RefObject<HTMLDivElement | null>
    widgetRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>
    getWidgetHeight: (config: WidgetConfig) => number
    getZIndex: (widgetId: string) => number
    onDragStart: (widgetId: string) => void
    onDrag: (clientX: number) => void
    onDragEnd: (widgetId: string, finalX: number, finalY: number, bounds: ConstraintBounds) => void
}

/**
 * Container for all draggable widgets
 */
export const WidgetContainer = React.memo(function WidgetContainer({
    configs,
    positions,
    widgetHeights,
    draggingId,
    contentRef,
    widgetRefs,
    getWidgetHeight,
    getZIndex,
    onDragStart,
    onDrag,
    onDragEnd,
}: WidgetContainerProps): React.ReactElement {
    // Calculate header height on each render (not memoized)
    // We need fresh values on each render since constraint bounds depend on it
    const getHeaderHeight = (): number => {
        if (!contentRef.current?.parentElement?.parentElement) return 0
        return contentRef.current.parentElement.parentElement.offsetHeight
    }
    const headerHeight = getHeaderHeight()

    // Create widget renderer
    const renderWidget = useCallback(
        (config: WidgetConfig) => {
            const position = positions[config.id]
            const widgetHeight = getWidgetHeight(config)
            const isActive = draggingId === config.id
            const zIndex = getZIndex(config.id)

            // Calculate bounds for this widget
            const bounds = calculateConstraintBounds(config.width, widgetHeight, headerHeight)

            return (
                <DraggableWidget
                    key={config.id}
                    config={config}
                    position={position}
                    zIndex={zIndex}
                    isActive={isActive}
                    contentRef={contentRef}
                    widgetRef={(el) => {
                        widgetRefs.current[config.id] = el
                    }}
                    onDragStart={() => onDragStart(config.id)}
                    onDrag={onDrag}
                    onDragEnd={(finalX, finalY) => {
                        onDragEnd(config.id, finalX, finalY, bounds)
                    }}
                />
            )
        },
        [
            positions,
            widgetHeights,
            draggingId,
            contentRef,
            widgetRefs,
            getWidgetHeight,
            getZIndex,
            onDragStart,
            onDrag,
            onDragEnd,
            headerHeight,
        ]
    )

    return (
        <div
            ref={contentRef}
            className="relative pointer-events-auto h-full px-6 flex"
            style={{
                gridColumn: "2",
                width: `${TOTAL_CONTENT_WIDTH - 44}px`,
            }}
        >
            {configs.map(renderWidget)}
        </div>
    )
})
