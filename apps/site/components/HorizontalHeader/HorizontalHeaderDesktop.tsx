"use client"

import React, { useRef, useCallback, useState } from "react"
import { Segment, FooterSegment, WidgetContainer } from "./components"
import { useWidgetDimensions, useAutoScroll, useStackOrder } from "./hooks"
import { WIDGET_CONFIGS } from "./config"
import { SEGMENT_WIDTH, GRID_TEMPLATE_MOBILE, GRID_TEMPLATE_DESKTOP } from "./constants"
import type { ConstraintBounds } from "./types"
import { useDragContext } from "./contexts/DragContext"

/**
 * Desktop implementation keeps the draggable behavior with horizontal scrolling.
 */
export function HorizontalHeaderDesktop(): React.ReactElement {
    const [announcement, setAnnouncement] = useState("")
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    // Get positions from context (shared state)
    const { positions, savePosition } = useDragContext()
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

            // Announce position change for screen readers
            const widgetTitle = config.title || config.id
            setAnnouncement(`${widgetTitle} widget repositioned`)
            setTimeout(() => setAnnouncement(""), 1000)
        },
        [stopAutoScroll, getWidgetHeight, savePosition, setDragging]
    )

    return (
        <div className="flex flex-col">
            {/* Screen reader announcements */}
            <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                {announcement}
            </div>

            {/* Instructions for screen readers */}
            <div id="widget-instructions" className="sr-only">
                Interactive widgets. Use Tab to navigate between widgets. Use arrow keys to
                reposition widgets when focused. Press Enter or Space to grab a widget, then use
                arrow keys to move it, and press Enter or Space again to release.
            </div>

            <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide w-full overscroll-x-none"
                data-scroll-container="horizontal-header"
                role="region"
                aria-label="Interactive header with draggable widgets"
                style={
                    {
                        "--grid-template-mobile": GRID_TEMPLATE_MOBILE,
                        "--grid-template-desktop": GRID_TEMPLATE_DESKTOP,
                    } as React.CSSProperties
                }
            >
                {/* Header section with segments as background */}
                <div className="bg-background-secondary relative grid [grid-template-columns:var(--grid-template-mobile)] lg:[grid-template-columns:var(--grid-template-desktop)]">
                    {/* Draggable widgets container */}
                    <div className="absolute inset-0 z-20 pointer-events-none grid [grid-template-columns:var(--grid-template-mobile)] lg:[grid-template-columns:var(--grid-template-desktop)]">
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
                    className="bg-background-primary grid [grid-template-columns:var(--grid-template-mobile)] lg:[grid-template-columns:var(--grid-template-desktop)]"
                    aria-hidden="true"
                >
                    <div className="flex" style={{ gridColumn: "2" }}>
                        <FooterSegment label="Current Location" width={SEGMENT_WIDTH} />
                        <FooterSegment label="50m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="100m" width={SEGMENT_WIDTH} />
                    </div>
                </div>
            </div>
        </div>
    )
}
