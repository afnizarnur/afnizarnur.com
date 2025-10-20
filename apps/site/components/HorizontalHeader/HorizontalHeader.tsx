"use client"

import React, { useRef, useCallback } from "react"
import { Segment, FooterSegment, WidgetContainer } from "./components"
import { useWidgetPositions, useWidgetDimensions, useAutoScroll, useStackOrder } from "./hooks"
import { WIDGET_CONFIGS } from "./config"
import { SEGMENT_WIDTH, GRID_TEMPLATE } from "./constants"
import type { ConstraintBounds } from "./types"

/**
 * Horizontal header with draggable widgets
 * Features:
 * - Draggable widgets with smooth animations
 * - Auto-scroll when dragging near edges
 * - Persistent positions via localStorage
 * - Dynamic z-index management
 * - Responsive to window resize
 */
export function HorizontalHeader(): React.ReactElement {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    // Custom hooks for state management
    const { positions, savePosition } = useWidgetPositions(WIDGET_CONFIGS)
    const { widgetHeights, widgetRefs, getWidgetHeight } = useWidgetDimensions(WIDGET_CONFIGS)
    const { startAutoScroll, stopAutoScroll } = useAutoScroll(scrollContainerRef)
    const { draggingId, getZIndex, bringToFront, setDragging } = useStackOrder(WIDGET_CONFIGS)

    // Handle drag start
    const handleDragStart = useCallback(
        (widgetId: string): void => {
            setDragging(widgetId)
            bringToFront(widgetId)
        },
        [setDragging, bringToFront]
    )

    // Handle drag (for auto-scroll)
    const handleDrag = useCallback(
        (clientX: number): void => {
            startAutoScroll(clientX)
        },
        [startAutoScroll]
    )

    // Handle drag end
    const handleDragEnd = useCallback(
        (widgetId: string, finalX: number, finalY: number, bounds: ConstraintBounds): void => {
            stopAutoScroll()

            // Find widget config to get dimensions
            const config = WIDGET_CONFIGS.find((c) => c.id === widgetId)
            if (!config) return

            const widgetHeight = getWidgetHeight(config)

            savePosition(widgetId, finalX, finalY, config.width, widgetHeight, bounds)
            setDragging(null)
        },
        [stopAutoScroll, getWidgetHeight, savePosition, setDragging]
    )

    return (
        <div className="flex flex-col bg-background-primary">
            <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide w-full overscroll-none"
            >
                {/* Header section with segments as background */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: GRID_TEMPLATE,
                    }}
                    className="bg-background-secondary relative"
                >
                    {/* Draggable widgets container */}
                    <div
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{
                            display: "grid",
                            gridTemplateColumns: GRID_TEMPLATE,
                        }}
                    >
                        <WidgetContainer
                            configs={WIDGET_CONFIGS}
                            positions={positions}
                            widgetHeights={widgetHeights}
                            draggingId={draggingId}
                            contentRef={contentRef}
                            widgetRefs={widgetRefs}
                            getWidgetHeight={getWidgetHeight}
                            getZIndex={getZIndex}
                            onDragStart={handleDragStart}
                            onDrag={handleDrag}
                            onDragEnd={handleDragEnd}
                        />
                    </div>

                    {/* Segments as background */}
                    <div className="flex h-full" style={{ gridColumn: "2" }}>
                        <Segment width={SEGMENT_WIDTH} />
                        <Segment width={SEGMENT_WIDTH} />
                        <Segment width={SEGMENT_WIDTH} />
                    </div>
                </div>

                {/* Footer section */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: GRID_TEMPLATE,
                    }}
                    className="bg-background-primary"
                >
                    <div className="flex" style={{ gridColumn: "2" }}>
                        <FooterSegment label="Current Location" width={SEGMENT_WIDTH} />
                        <FooterSegment label="50m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="100m" width={SEGMENT_WIDTH} />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                /* Hide scrollbar but keep scrolling functionality */
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}
