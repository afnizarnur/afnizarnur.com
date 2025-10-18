import React, { useRef } from "react"

export interface HeaderItem {
    id: string
    label: string
    distance?: number // in meters
}

const SEGMENT_WIDTH = 800 // pixels per segment

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
                <div className="flex flex-col bg-background-secondary">
                    {/* Main scrollable header with footer */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr min(1220px, 100% - 48px) 1fr",
                        }}
                    >
                        <div
                            className="flex gap-0"
                            style={{
                                gridColumn: "2",
                            }}
                        >
                            {segments.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col flex-shrink-0 border-r border-border-primary"
                                    style={{
                                        width: `${SEGMENT_WIDTH}px`,
                                    }}
                                >
                                    {/* Main header content */}
                                    <div
                                        className="flex flex-col items-center justify-center bg-background-secondary"
                                        style={{
                                            height: `${containerHeight}px`,
                                        }}
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
                <div className="flex flex-col bg-background-primary">
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr min(1220px, 100% - 48px) 1fr",
                        }}
                    >
                        <div
                            className="flex gap-0"
                            style={{
                                gridColumn: "2",
                            }}
                        >
                            {segments.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col flex-shrink-0 border-r border-border-primary"
                                    style={{
                                        width: `${SEGMENT_WIDTH}px`,
                                    }}
                                >
                                    {/* Footer for each segment */}
                                    <div className="bg-background-primary flex flex-col items-start justify-start relative py-16">
                                        {/* Triangle pointer */}
                                        <div
                                            className="absolute -top-2.5 transition-all duration-200"
                                            style={{
                                                left: "12px",
                                            }}
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
                                        <span
                                            className="text-eyebrow-1"
                                            style={{
                                                fontFamily:
                                                    "var(--typography-font-family-fonetika-mono)",
                                                fontSize: "var(--typography-font-size-eyebrow-1)",
                                                fontWeight: "var(--typography-font-weight-medium)",
                                                letterSpacing:
                                                    "var(--typography-letter-spacing-wide)",
                                                lineHeight: "var(--typography-line-height-solid)",
                                                color: "var(--color-semantic-text-disabled)",
                                            }}
                                        >
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
