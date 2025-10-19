"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Widget } from "./Widget"

export interface HeaderItem {
    id: string
    label: string
    distance?: number // in meters
}

const SEGMENT_WIDTH = 800 // pixels per segment
const GRID_TEMPLATE = "1fr min(1220px, 100% - 48px) 1fr"
const SNAP_THRESHOLD = 20 // pixels
const STORAGE_KEY = "horizontal-header-widget-positions"

interface SegmentProps {
    label?: string
    width: number
    height: number
}

function Segment({ label, width, height }: SegmentProps): React.ReactElement {
    return (
        <div className="flex-shrink-0" style={{ width: `${width}px` }}>
            <div
                className="flex flex-col py-100 items-center justify-center bg-background-secondary relative"
                style={{ height: `${height}px` }}
            >
                <div
                    className="absolute inset-y-0 left-24 overflow-hidden"
                    style={{
                        width: "24px",
                        backgroundImage:
                            "repeating-linear-gradient(-40deg, rgba(0,0,0,0.06) 0 8px, transparent 0px 20px)",
                        backgroundRepeat: "repeat-y",
                    }}
                />

                {/* Content on top, fill the whole segment */}
                {label && (
                    <div className="relative z-10 flex flex-col items-center justify-center bg-background-secondary h-full">
                        <span className="text-sm font-medium text-text-primary truncate px-2">
                            {label}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

interface FooterSegmentProps {
    label: string
    width: number
}

function FooterSegment({ label, width }: FooterSegmentProps): React.ReactElement {
    return (
        <div className="flex-shrink-0" style={{ width: `${width}px` }}>
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
                            borderBottom: "12px solid var(--color-background-primary)",
                        }}
                    />
                </div>
                <span className="text-eyebrow-1 text-text-disabled">{label}</span>
            </div>
        </div>
    )
}

export interface HorizontalHeaderProps {
    containerHeight?: number // in pixels
}

interface WidgetPosition {
    x: number
    y: number
}

interface WidgetConfig {
    id: string
    defaultX: number
    defaultY: number
    width: number
    height?: number
    backgroundColor?: string
    backgroundImage?: string
    title?: string
    showClose?: boolean
    content: React.ReactNode
}

// Widget configurations with default positions
const WIDGET_CONFIGS: WidgetConfig[] = [
    {
        id: "intro",
        defaultX: 24,
        defaultY: 24,
        width: 598,
        title: "Intro",
        showClose: true,
        content: (
            <h1 className="flex-1 justify-start text-text-primary text-heading-1">
                Afnizar works at the intersection of design, code, and strategy. Building things
                that last.
            </h1>
        ),
    },
    {
        id: "bio",
        defaultX: 650,
        defaultY: 24,
        width: 443,
        title: "Short bio",
        showClose: true,
        content: (
            <div className="flex-1 justify-start text-text-primary text-subhead-1">
                Designer. Engineer. Cat dad of two. Works where design meets infrastructure.
                Collects diecasts, photographs light, builds minimal tools for complex systems.
            </div>
        ),
    },
    {
        id: "work",
        defaultX: 1120,
        defaultY: 24,
        width: 641,
        title: "Current Work",
        backgroundColor: "var(--color-background-warning-primary)",
        showClose: true,
        content: (
            <h2 className="flex-1 text-text-primary text-heading-2">
                Currently part of <span className="font-semibold">INA Digital Edu</span>, designing
                and developing digital learning platforms for{" "}
                <span className="font-semibold">Kementerian Pendidikan Dasar dan Menengah</span>.
            </h2>
        ),
    },
    {
        id: "avatar",
        defaultX: 1790,
        defaultY: 24,
        width: 420,
        height: 420,
        backgroundImage: "/avatar.png",
        showClose: true,
        content: <div />,
    },
]

export function HorizontalHeader({
    containerHeight = 200,
}: HorizontalHeaderProps): React.ReactElement {
    const [positions, setPositions] = useState<Record<string, WidgetPosition>>({})
    const [draggingId, setDraggingId] = useState<string | null>(null)
    const [stackOrder, setStackOrder] = useState<string[]>([])
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerBounds, setContainerBounds] = useState({ width: 0, height: 0 })

    // Load positions from localStorage on mount
    useEffect(() => {
        const savedPositions = localStorage.getItem(STORAGE_KEY)
        if (savedPositions) {
            try {
                setPositions(JSON.parse(savedPositions))
            } catch (error) {
                console.error("Failed to parse saved positions:", error)
            }
        }
        // Initialize stack order with all widget IDs
        setStackOrder(WIDGET_CONFIGS.map((config) => config.id))
    }, [])

    // Calculate container bounds
    useEffect(() => {
        const updateBounds = (): void => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setContainerBounds({ width: rect.width, height: rect.height })
            }
        }

        updateBounds()
        window.addEventListener("resize", updateBounds)
        return () => window.removeEventListener("resize", updateBounds)
    }, [])

    // Save position to localStorage
    const savePosition = useCallback((id: string, x: number, y: number): void => {
        setPositions((prev) => {
            const newPositions = { ...prev, [id]: { x, y } }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newPositions))
            return newPositions
        })
    }, [])

    // Calculate snap offset based on proximity to other widgets and edges
    const calculateSnapOffset = useCallback(
        (
            widgetId: string,
            currentX: number,
            currentY: number,
            widgetWidth: number,
            widgetHeight: number
        ): { x: number; y: number } => {
            let snapX = 0
            let snapY = 0

            // Check snap to container edges
            if (Math.abs(currentX) < SNAP_THRESHOLD) snapX = -currentX
            if (Math.abs(currentY) < SNAP_THRESHOLD) snapY = -currentY
            if (
                Math.abs(currentX + widgetWidth - containerBounds.width) < SNAP_THRESHOLD &&
                containerBounds.width > 0
            ) {
                snapX = containerBounds.width - widgetWidth - currentX
            }
            if (
                Math.abs(currentY + widgetHeight - containerBounds.height) < SNAP_THRESHOLD &&
                containerBounds.height > 0
            ) {
                snapY = containerBounds.height - widgetHeight - currentY
            }

            // Check snap to container center
            const centerX = containerBounds.width / 2 - widgetWidth / 2
            const centerY = containerBounds.height / 2 - widgetHeight / 2
            if (Math.abs(currentX - centerX) < SNAP_THRESHOLD && containerBounds.width > 0) {
                snapX = centerX - currentX
            }
            if (Math.abs(currentY - centerY) < SNAP_THRESHOLD && containerBounds.height > 0) {
                snapY = centerY - currentY
            }

            // Check snap to other widgets
            WIDGET_CONFIGS.forEach((config) => {
                if (config.id === widgetId) return

                const otherPos = positions[config.id] || {
                    x: config.defaultX,
                    y: config.defaultY,
                }
                const otherWidth = config.width
                const otherHeight = config.height || 200

                // Horizontal alignment
                if (Math.abs(otherPos.x - currentX) < SNAP_THRESHOLD) {
                    snapX = otherPos.x - currentX
                }
                if (Math.abs(otherPos.x + otherWidth - (currentX + widgetWidth)) < SNAP_THRESHOLD) {
                    snapX = otherPos.x + otherWidth - widgetWidth - currentX
                }

                // Vertical alignment
                if (Math.abs(otherPos.y - currentY) < SNAP_THRESHOLD) {
                    snapY = otherPos.y - currentY
                }
                if (
                    Math.abs(otherPos.y + otherHeight - (currentY + widgetHeight)) < SNAP_THRESHOLD
                ) {
                    snapY = otherPos.y + otherHeight - widgetHeight - currentY
                }

                // Center alignment with other widgets
                const otherCenterX = otherPos.x + otherWidth / 2
                const thisCenterX = currentX + widgetWidth / 2
                if (Math.abs(otherCenterX - thisCenterX) < SNAP_THRESHOLD) {
                    snapX = otherCenterX - widgetWidth / 2 - currentX
                }

                const otherCenterY = otherPos.y + otherHeight / 2
                const thisCenterY = currentY + widgetHeight / 2
                if (Math.abs(otherCenterY - thisCenterY) < SNAP_THRESHOLD) {
                    snapY = otherCenterY - widgetHeight / 2 - currentY
                }
            })

            return { x: snapX, y: snapY }
        },
        [positions, containerBounds]
    )

    return (
        <div className="flex flex-col bg-background-primary">
            <div className="overflow-x-auto scrollbar-hide w-full overscroll-none">
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
                        ref={containerRef}
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{
                            display: "grid",
                            gridTemplateColumns: GRID_TEMPLATE,
                        }}
                    >
                        <div
                            className="relative pointer-events-auto"
                            style={{ gridColumn: "2", height: `${containerHeight}px` }}
                        >
                            {WIDGET_CONFIGS.map((config) => {
                                const position = positions[config.id] || {
                                    x: config.defaultX,
                                    y: config.defaultY,
                                }
                                const isActive = draggingId === config.id
                                const widgetHeight = config.height || 200
                                // Calculate z-index based on stack order
                                const stackIndex = stackOrder.indexOf(config.id)
                                const baseZIndex = stackIndex >= 0 ? stackIndex + 10 : 10
                                const zIndex = isActive ? 100 : baseZIndex

                                return (
                                    <motion.div
                                        key={config.id}
                                        drag
                                        dragConstraints={containerRef}
                                        dragElastic={0}
                                        dragMomentum={false}
                                        initial={false}
                                        animate={{
                                            x: position.x,
                                            y: position.y,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                        onDragStart={() => {
                                            setDraggingId(config.id)
                                            // Bring to front by moving to end of stack order
                                            setStackOrder((prev) => {
                                                const filtered = prev.filter((id) => id !== config.id)
                                                return [...filtered, config.id]
                                            })
                                        }}
                                        onDragEnd={(_event, info) => {
                                            const finalX = position.x + info.offset.x
                                            const finalY = position.y + info.offset.y

                                            const snap = calculateSnapOffset(
                                                config.id,
                                                finalX,
                                                finalY,
                                                config.width,
                                                widgetHeight
                                            )

                                            savePosition(
                                                config.id,
                                                finalX + snap.x,
                                                finalY + snap.y
                                            )
                                            setDraggingId(null)
                                        }}
                                        style={{
                                            position: "absolute",
                                            cursor: isActive ? "grabbing" : "grab",
                                            touchAction: "none",
                                            zIndex,
                                        }}
                                    >
                                        <Widget
                                            title={config.title}
                                            showClose={config.showClose}
                                            onClose={() => console.log(`${config.id} closed`)}
                                            width={config.width}
                                            height={config.height}
                                            backgroundColor={config.backgroundColor}
                                            backgroundImage={config.backgroundImage}
                                        >
                                            {config.content}
                                        </Widget>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Segments as background */}
                    <div className="flex" style={{ gridColumn: "2" }}>
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
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
                        <FooterSegment label="150m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="200m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="250m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="300m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="350m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="400m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="450m" width={SEGMENT_WIDTH} />
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
