"use client"

import React, { useRef, useCallback } from "react"
import { Segment, FooterSegment, WidgetContainer } from "./components"
import { useWidgetPositions, useWidgetDimensions, useAutoScroll, useStackOrder } from "./hooks"
import { WIDGET_CONFIGS } from "./config"
import { SEGMENT_WIDTH, GRID_TEMPLATE_MOBILE, GRID_TEMPLATE_DESKTOP } from "./constants"
import type { ConstraintBounds } from "./types"

/**
 * Desktop implementation keeps the draggable behavior with horizontal scrolling.
 */
export function HorizontalHeaderDesktop(): React.ReactElement {
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
        <div className="flex flex-col">
            <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide w-full overscroll-none"
                data-scroll-container="horizontal-header"
                style={
                    {
                        "--grid-template-mobile": GRID_TEMPLATE_MOBILE,
                        "--grid-template-desktop": GRID_TEMPLATE_DESKTOP,
                    } as React.CSSProperties
                }
            >
                {/* Header section with segments as background */}
                <div className="bg-background-secondary relative grid [grid-template-columns:var(--grid-template-mobile)] lg:[grid-template-columns:var(--grid-template-desktop)] [--widget-offset-y:-4rem] md:[--widget-offset-y:-4.2rem] lg:[--widget-offset-y:-2rem]">
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
                <div className="bg-background-primary grid [grid-template-columns:var(--grid-template-mobile)] lg:[grid-template-columns:var(--grid-template-desktop)]">
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
