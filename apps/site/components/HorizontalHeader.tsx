"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, type PanInfo } from "framer-motion"
import { Widget } from "./Widget"

export interface HeaderItem {
    id: string
    label: string
    distance?: number // in meters
}

const SEGMENT_WIDTH = 800 // pixels per segment
const TOTAL_SEGMENTS = 3 // number of segments in the header
const TOTAL_CONTENT_WIDTH = SEGMENT_WIDTH * TOTAL_SEGMENTS // total draggable width
const GRID_TEMPLATE = "1fr min(1220px, 100% - 48px) 1fr"
const STORAGE_KEY = "horizontal-header-widget-positions"
const AUTO_SCROLL_THRESHOLD = 50 // pixels from edge to trigger auto-scroll
const AUTO_SCROLL_SPEED = 5 // pixels per frame

interface SegmentProps {
    label?: string
    width: number
}

function Segment({ label, width }: SegmentProps): React.ReactElement {
    return (
        <div className="flex-shrink-0" style={{ width: `${width}px` }}>
            <div className="flex flex-col py-98 items-center justify-center bg-background-secondary relative h-full">
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
    minHeight?: number
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
        defaultY: 100,
        width: 598,
        minHeight: 200,
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
        defaultX: 24,
        defaultY: 450,
        width: 443,
        minHeight: 200,
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
        id: "avatar",
        defaultX: 658,
        defaultY: 100,
        width: 420,
        height: 420,
        backgroundImage: "/avatar.png",
        showClose: true,
        content: <div />,
    },
    {
        id: "work",
        defaultX: 1114,
        defaultY: 100,
        width: 641,
        minHeight: 200,
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
]

export function HorizontalHeader(): React.ReactElement {
    const [positions, setPositions] = useState<Record<string, WidgetPosition>>({})
    const [draggingId, setDraggingId] = useState<string | null>(null)
    const [stackOrder, setStackOrder] = useState<string[]>([])
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const widgetRefs = useRef<Record<string, HTMLDivElement | null>>({})
    const autoScrollIntervalRef = useRef<number | null>(null)
    const [widgetHeights, setWidgetHeights] = useState<Record<string, number>>({})

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

    // Measure widget heights dynamically
    useEffect(() => {
        const measureWidgetHeights = (): void => {
            const newHeights: Record<string, number> = {}
            WIDGET_CONFIGS.forEach((config) => {
                const widgetElement = widgetRefs.current[config.id]
                if (widgetElement) {
                    newHeights[config.id] = widgetElement.offsetHeight
                } else {
                    newHeights[config.id] = config.height || config.minHeight || 200
                }
            })
            setWidgetHeights(newHeights)
        }

        // Measure initially
        measureWidgetHeights()

        // Re-measure on window resize
        const resizeObserver = new ResizeObserver(measureWidgetHeights)
        Object.values(widgetRefs.current).forEach((el) => {
            if (el) resizeObserver.observe(el)
        })

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    // Get constraint bounds for a widget
    const getConstraintBounds = useCallback((widgetWidth: number, widgetHeight: number) => {
        if (!contentRef.current || !contentRef.current.parentElement) return null

        // Get the header section (parent of contentRef)
        const headerSection = contentRef.current.parentElement.parentElement
        if (!headerSection) return null

        const headerHeight = headerSection.offsetHeight

        return {
            minX: 0,
            minY: 0,
            maxX: Math.max(0, TOTAL_CONTENT_WIDTH - widgetWidth),
            maxY: Math.max(0, headerHeight - widgetHeight),
        }
    }, [])

    // Clamp position to valid bounds
    const clampPosition = useCallback(
        (x: number, y: number, widgetWidth: number, widgetHeight: number) => {
            const bounds = getConstraintBounds(widgetWidth, widgetHeight)
            if (!bounds) return { x, y }

            return {
                x: Math.max(bounds.minX, Math.min(x, bounds.maxX)),
                y: Math.max(bounds.minY, Math.min(y, bounds.maxY)),
            }
        },
        [getConstraintBounds]
    )

    // Save position to localStorage
    const savePosition = useCallback(
        (id: string, x: number, y: number, width: number, height: number): void => {
            const clamped = clampPosition(x, y, width, height)
            setPositions((prev) => {
                const newPositions = { ...prev, [id]: clamped }
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newPositions))
                return newPositions
            })
        },
        [clampPosition]
    )

    // Auto-scroll logic
    const startAutoScroll = useCallback((mouseX: number): void => {
        if (!scrollContainerRef.current) return

        const scrollContainer = scrollContainerRef.current
        const rect = scrollContainer.getBoundingClientRect()
        const mouseRelativeX = mouseX - rect.left

        // Stop any existing auto-scroll
        if (autoScrollIntervalRef.current) {
            cancelAnimationFrame(autoScrollIntervalRef.current)
            autoScrollIntervalRef.current = null
        }

        // Check if we should auto-scroll
        let shouldScroll = false
        let scrollDirection = 0

        if (mouseRelativeX < AUTO_SCROLL_THRESHOLD) {
            // Near left edge - scroll left
            shouldScroll = true
            scrollDirection = -1
        } else if (mouseRelativeX > rect.width - AUTO_SCROLL_THRESHOLD) {
            // Near right edge - scroll right
            shouldScroll = true
            scrollDirection = 1
        }

        if (shouldScroll) {
            const scroll = (): void => {
                if (!scrollContainerRef.current) return

                scrollContainerRef.current.scrollLeft += scrollDirection * AUTO_SCROLL_SPEED

                // Continue scrolling
                autoScrollIntervalRef.current = requestAnimationFrame(scroll)
            }
            autoScrollIntervalRef.current = requestAnimationFrame(scroll)
        }
    }, [])

    const stopAutoScroll = useCallback((): void => {
        if (autoScrollIntervalRef.current) {
            cancelAnimationFrame(autoScrollIntervalRef.current)
            autoScrollIntervalRef.current = null
        }
    }, [])

    // Clean up auto-scroll on unmount
    useEffect(() => {
        return () => {
            if (autoScrollIntervalRef.current) {
                cancelAnimationFrame(autoScrollIntervalRef.current)
            }
        }
    }, [])

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
                        <div
                            ref={contentRef}
                            className="relative pointer-events-auto h-full"
                            style={{ gridColumn: "2", width: `${TOTAL_CONTENT_WIDTH - 44}px` }}
                        >
                            {WIDGET_CONFIGS.map((config) => {
                                const position = positions[config.id] || {
                                    x: config.defaultX,
                                    y: config.defaultY,
                                }
                                const widgetHeight =
                                    widgetHeights[config.id] ||
                                    config.height ||
                                    config.minHeight ||
                                    200
                                const isActive = draggingId === config.id
                                // Calculate z-index based on stack order
                                const stackIndex = stackOrder.indexOf(config.id)
                                const baseZIndex = stackIndex >= 0 ? stackIndex + 10 : 10
                                const zIndex = isActive ? 100 : baseZIndex

                                return (
                                    <motion.div
                                        key={config.id}
                                        ref={(el) => {
                                            widgetRefs.current[config.id] = el
                                        }}
                                        drag
                                        dragConstraints={contentRef}
                                        dragElastic={0}
                                        dragMomentum={false}
                                        dragTransition={{
                                            power: 0.1,
                                            timeConstant: 200,
                                        }}
                                        initial={{
                                            x: position.x,
                                            y: position.y,
                                        }}
                                        animate={{
                                            x: position.x,
                                            y: position.y,
                                            scale: 1,
                                            rotate: 0,
                                        }}
                                        whileHover={{
                                            scale: 1.02,
                                            transition: {
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 25,
                                            },
                                        }}
                                        whileDrag={{
                                            scale: 1.05,
                                            rotate: 0.8,
                                            transition: {
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 25,
                                            },
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 35,
                                            mass: 1,
                                        }}
                                        onDragStart={() => {
                                            setDraggingId(config.id)
                                            // Bring to front by moving to end of stack order
                                            setStackOrder((prev) => {
                                                const filtered = prev.filter(
                                                    (id) => id !== config.id
                                                )
                                                return [...filtered, config.id]
                                            })
                                        }}
                                        onDrag={(event, _info: PanInfo) => {
                                            // Get mouse position for auto-scroll
                                            const mouseEvent = event as unknown as
                                                | React.MouseEvent
                                                | TouchEvent
                                            let clientX = 0

                                            if ("clientX" in mouseEvent) {
                                                clientX = mouseEvent.clientX
                                            } else if (
                                                "touches" in mouseEvent &&
                                                mouseEvent.touches.length > 0
                                            ) {
                                                clientX = mouseEvent.touches[0].clientX
                                            }

                                            if (clientX > 0) {
                                                startAutoScroll(clientX)
                                            }
                                        }}
                                        onDragEnd={(_event, info: PanInfo) => {
                                            stopAutoScroll()

                                            const finalX = position.x + info.offset.x
                                            const finalY = position.y + info.offset.y

                                            savePosition(
                                                config.id,
                                                finalX,
                                                finalY,
                                                config.width,
                                                widgetHeight
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
