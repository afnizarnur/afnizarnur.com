import React, { useRef, useEffect, useState } from "react"

export interface HeaderItem {
    id: string
    label: string
    distance?: number // in meters
}

const SEGMENT_WIDTH = 800 // pixels per segment

export interface HorizontalHeaderProps {
    items: HeaderItem[]
    currentItemId: string
    onItemChange?: (itemId: string) => void
    containerHeight?: number // in pixels
}

export function HorizontalHeader({
    items,
    currentItemId,
    onItemChange,
    containerHeight = 200,
}: HorizontalHeaderProps): React.ReactElement {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const currentItemIndex = items.findIndex((item) => item.id === currentItemId)

    const handleItemClick = (itemId: string) => {
        onItemChange?.(itemId)

        // Auto-scroll to center the selected item
        const index = items.findIndex((item) => item.id === itemId)
        if (scrollContainerRef.current) {
            const targetScroll = index * SEGMENT_WIDTH - containerWidth / 2 + SEGMENT_WIDTH / 2
            scrollContainerRef.current.scrollTo({
                left: Math.max(0, targetScroll),
                behavior: "smooth",
            })
        }
    }

    return (
        <div className="flex flex-col bg-background-primary">
            {/* Main scrollable header with footer */}
            <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide"
                style={{ height: `${containerHeight + 60}px` }}
            >
                <div
                    className="flex gap-0"
                    style={{
                        minWidth: `${items.length * SEGMENT_WIDTH}px`,
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex flex-col flex-shrink-0 border-r border-border-primary"
                            style={{
                                width: `${SEGMENT_WIDTH}px`,
                            }}
                            onClick={() => handleItemClick(item.id)}
                        >
                            {/* Main header content */}
                            <div
                                className="flex flex-col items-center justify-center"
                                style={{
                                    height: `${containerHeight}px`,
                                }}
                            >
                                <span className="text-sm font-medium text-text-primary truncate px-2">
                                    {item.label}
                                </span>
                            </div>

                            {/* Footer for each segment */}
                            <div className="bg-background-primary border-t border-b border-border-primary flex flex-col items-center justify-center relative px-4 py-3">
                                {/* Triangle pointer */}
                                {index === currentItemIndex && (
                                    <div
                                        className="absolute -top-4 transform -translate-x-1/2 transition-all duration-200"
                                        style={{
                                            left: `${SEGMENT_WIDTH / 2}px`,
                                        }}
                                    >
                                        <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-text-primary" />
                                    </div>
                                )}
                                <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wide">
                                    {index === 0 ? "Current Location" : `${item.distance}m`}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
