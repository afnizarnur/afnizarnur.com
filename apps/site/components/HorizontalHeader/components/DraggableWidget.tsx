import React, { useCallback, useRef, useState, useEffect } from "react"
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
    _widgetHeight: number
    contentRef: React.RefObject<HTMLDivElement | null>
    widgetRef: (el: HTMLDivElement | null) => void
    onDragStart: () => void
    onDrag: (clientX: number) => void
    onDragEnd: (finalX: number, finalY: number) => void
}

/**
 * A single draggable widget with motion animations
 */
export const DraggableWidget = React.memo(function DraggableWidget({
    config,
    position,
    zIndex,
    isActive,
    _widgetHeight,
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
        dragStartPosRef.current = { x: position.x, y: position.y }
        onDragStart()
    }, [position.x, position.y, onDragStart])

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
            initial={{
                x: position.x,
                y: position.y,
                scale: 1,
                rotate: 0,
            }}
            animate={{
                x: position.x,
                y: position.y,
                scale: 1,
                rotate: 0,
            }}
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
                imageProps={config.imageProps}
                noPadding={config.noPadding}
                triggerTitleAnimation={hoverTrigger}
            >
                {config.content}
            </Widget>
        </motion.div>
    )
})
