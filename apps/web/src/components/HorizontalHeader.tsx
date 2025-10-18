import React from "react"

export interface HeaderItem {
    id: string
    label: string
    distance?: number // in meters
}

const SEGMENT_WIDTH = 800 // pixels per segment
const GRID_TEMPLATE = "1fr min(1220px, 100% - 48px) 1fr"

export interface HorizontalHeaderProps {
    items: HeaderItem[]
    containerHeight?: number // in pixels
}

export function HorizontalHeader({
    items,
    containerHeight = 200,
}: HorizontalHeaderProps): React.ReactElement {
    // Use only first 8 items
    const segments = items.slice(0, 8)

    return (
        <div className="flex flex-col bg-background-primary">
            <div className="overflow-x-auto scrollbar-hide w-full">
                {/* Header section */}
                <div className="bg-background-secondary">
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: GRID_TEMPLATE,
                        }}
                    >
                        <div className="flex" style={{ gridColumn: "2" }}>
                            {segments.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex-shrink-0 border-r border-border-primary"
                                    style={{ width: `${SEGMENT_WIDTH}px` }}
                                >
                                    <div
                                        className="flex flex-col items-center justify-center bg-background-secondary"
                                        style={{ height: `${containerHeight}px` }}
                                    >
                                        <span className="text-sm font-medium text-text-primary truncate px-2">
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer section */}
                <div className="bg-background-primary">
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: GRID_TEMPLATE,
                        }}
                    >
                        <div className="flex" style={{ gridColumn: "2" }}>
                            {segments.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex-shrink-0 border-r border-border-primary"
                                    style={{ width: `${SEGMENT_WIDTH}px` }}
                                >
                                    <div className="relative py-16 px-6">
                                        {/* Triangle pointer */}
                                        <div
                                            className="absolute -top-2.5 transition-all duration-200"
                                            style={{ left: "24px" }}
                                        >
                                            <div
                                                className="w-0 h-0"
                                                style={{
                                                    borderLeft: "12px solid transparent",
                                                    borderRight: "12px solid transparent",
                                                    borderBottom:
                                                        "12px solid var(--color-semantic-background-primary)",
                                                }}
                                            />
                                        </div>
                                        <span className="text-eyebrow-1 text-text-disabled">
                                            {index === 0 ? "Current Location" : `${item.distance}m`}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
