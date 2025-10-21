import React, { useCallback, useRef, useState, useEffect, useMemo } from "react"
import { motion, type PanInfo } from "framer-motion"
import { Widget } from "../../Widget"
import type { WidgetConfig, WidgetPosition, DragMouseEvent } from "../types"
import {
    SPRING_STIFFNESS,
    SPRING_DAMPING,
    SPRING_MASS,
    DRAG_SCALE,
    DRAG_ROTATION,
    TOTAL_CONTENT_WIDTH,
} from "../constants"
import { getClientX } from "../utils"

interface DraggableWidgetProps {
    config: WidgetConfig
    position: WidgetPosition
    zIndex: number
    isActive: boolean
    contentRef: React.RefObject<HTMLDivElement | null>
    widgetRef: (el: HTMLDivElement | null) => void
    onDragStart: () => void
    onDrag: (clientX: number) => void
    onDragEnd: (finalX: number, finalY: number) => void
}

/**
 * Custom comparison function for React.memo to prevent unnecessary re-renders
 * Only re-render if position, zIndex, or isActive changes
 */
function arePropsEqual(
    prevProps: DraggableWidgetProps,
    nextProps: DraggableWidgetProps
): boolean {
    return (
        prevProps.position.x === nextProps.position.x &&
        prevProps.position.y === nextProps.position.y &&
        prevProps.zIndex === nextProps.zIndex &&
        prevProps.isActive === nextProps.isActive &&
        prevProps.config.id === nextProps.config.id
    )
}

/**
 * A single draggable widget with motion animations
 */
export const DraggableWidget = React.memo(function DraggableWidget({
    config,
    position,
    zIndex,
    isActive,
    contentRef,
    widgetRef,
    onDragStart,
    onDrag,
    onDragEnd,
}: DraggableWidgetProps): React.ReactElement {
    // Track the position at drag start to calculate absolute position
    const dragStartPosRef = useRef<WidgetPosition>({ x: 0, y: 0 })
    const [hoverTrigger, setHoverTrigger] = useState(0)
    const internalWidgetRef = useRef<HTMLDivElement | null>(null)
    const constraintsInitialized = useRef(false)
    const isMountedRef = useRef(false)

    // Use a ref for constraints to keep object reference stable
    // This prevents Framer Motion from auto-repositioning widgets when constraints change
    // Match the calculation from calculateConstraintBounds utility
    const dragConstraintsRef = useRef({
        left: 0,
        right: Math.max(0, TOTAL_CONTENT_WIDTH - config.width - 48),
        top: 0,
        bottom: 800, // Will be updated with actual header height
    })

    // Initialize constraints once when widget is first measured
    // We only do this ONCE to prevent any constraint updates that could trigger repositioning
    useEffect(() => {
        if (constraintsInitialized.current) return

        const initializeConstraints = (): void => {
            if (!contentRef.current?.parentElement?.parentElement || !internalWidgetRef.current) {
                return
            }

            const headerHeight = contentRef.current.parentElement.parentElement.offsetHeight
            const actualWidgetHeight = internalWidgetRef.current.offsetHeight

            // Add 48px padding before the right edge to match container padding
            // maxX = TOTAL_CONTENT_WIDTH - widgetWidth - 48
            // maxY = headerHeight - widgetHeight
            dragConstraintsRef.current.right = Math.max(0, TOTAL_CONTENT_WIDTH - config.width - 48)
            dragConstraintsRef.current.bottom = Math.max(0, headerHeight - actualWidgetHeight)

            constraintsInitialized.current = true
        }

        // Try to initialize immediately
        initializeConstraints()

        // If not ready, wait a tick for render to complete
        if (!constraintsInitialized.current) {
            const timer = setTimeout(initializeConstraints, 100)
            return () => clearTimeout(timer)
        }
    }, [config.width, contentRef])

    const handleDragStart = useCallback((): void => {
        // Capture current position when drag starts
        // Read directly from animateValues to avoid position.x/y dependency
        dragStartPosRef.current = { x: position.x, y: position.y }
        onDragStart()
    }, [onDragStart, position.x, position.y])

    const handleDrag = useCallback(
        (event: MouseEvent | TouchEvent | PointerEvent): void => {
            const clientX = getClientX(event as DragMouseEvent)
            if (clientX > 0) {
                onDrag(clientX)
            }
        },
        [onDrag]
    )

    const handleDragEnd = useCallback(
        (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
            // Calculate final position based on start position + offset
            const finalX = dragStartPosRef.current.x + info.offset.x
            const finalY = dragStartPosRef.current.y + info.offset.y
            onDragEnd(finalX, finalY)
        },
        [onDragEnd]
    )

    // Memoize motion style object to prevent re-creation on every render
    const motionStyle = useMemo(
        () => ({
            position: "absolute" as const,
            cursor: isActive ? "grabbing" : "grab",
            touchAction: "none" as const,
            zIndex,
        }),
        [isActive, zIndex]
    )

    // Memoize animation values to prevent re-creation
    const animateValues = useMemo(
        () => ({
            x: position.x,
            y: position.y,
            scale: 1,
            rotate: 0,
        }),
        [position.x, position.y]
    )

    // Set initial position only on first mount, then use animate values
    // This prevents animation from (0,0) on mount while avoiding re-animations on updates
    const initialValues = useMemo(() => {
        if (!isMountedRef.current) {
            isMountedRef.current = true
            return {
                x: position.x,
                y: position.y,
                scale: 1,
                rotate: 0,
            }
        }
        return undefined
    }, [position.x, position.y])

    return (
        <motion.div
            ref={(el) => {
                internalWidgetRef.current = el
                widgetRef(el)
            }}
            drag
            dragConstraints={dragConstraintsRef.current}
            dragElastic={0}
            dragMomentum={false}
            dragTransition={{
                power: 0.1,
                timeConstant: 200,
            }}
            initial={initialValues}
            animate={animateValues}
            whileDrag={{
                scale: DRAG_SCALE,
                rotate: DRAG_ROTATION,
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                },
            }}
            transition={{
                type: "spring",
                stiffness: SPRING_STIFFNESS,
                damping: SPRING_DAMPING,
                mass: SPRING_MASS,
            }}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onMouseEnter={() => setHoverTrigger((prev) => prev + 1)}
            style={motionStyle}
        >
            <Widget
                title={config.title}
                showClose={config.showClose}
                onClose={() => console.log(`${config.id} closed`)}
                width={config.width}
                height={config.height}
                backgroundColor={config.backgroundColor}
                backgroundImage={config.backgroundImage}
                imageProps={config.imageProps}
                noPadding={config.noPadding}
                triggerTitleAnimation={hoverTrigger}
            >
                {config.content}
            </Widget>
        </motion.div>
    )
}, arePropsEqual)
