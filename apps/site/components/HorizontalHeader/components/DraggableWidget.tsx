import { motion, type PanInfo } from "framer-motion"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useReducedMotion } from "@/contexts/UserPreferencesContext"
import { Widget } from "../../Widget"
import {
    DRAG_ROTATION,
    DRAG_SCALE,
    SPRING_DAMPING,
    SPRING_MASS,
    SPRING_STIFFNESS,
    TOTAL_CONTENT_WIDTH,
} from "../constants"
import { useDragContext } from "../contexts/DragContext"
import type { DragMouseEvent, WidgetConfig, WidgetPosition } from "../types"
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
function arePropsEqual(prevProps: DraggableWidgetProps, nextProps: DraggableWidgetProps): boolean {
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
    const internalWidgetRef = useRef<HTMLDivElement | null>(null)
    const constraintsInitialized = useRef(false)
    const [isKeyboardGrabbed, setIsKeyboardGrabbed] = useState(false)
    const KEYBOARD_MOVE_STEP = 10 // pixels to move per arrow key press
    const { isWidgetDragDisabled } = useDragContext()
    const isDragDisabled = isWidgetDragDisabled(config.id)
    const prefersReducedMotion = useReducedMotion()

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

    // Keyboard navigation handler
    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent): void => {
            // Enter or Space to grab/release widget
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                setIsKeyboardGrabbed((prev) => !prev)
                // Defer the onDragStart call to avoid setState during render
                if (!isKeyboardGrabbed) {
                    setTimeout(() => onDragStart(), 0)
                }
                return
            }

            // Arrow keys to move widget (only when grabbed)
            if (
                isKeyboardGrabbed &&
                ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
            ) {
                event.preventDefault()

                let newX = position.x
                let newY = position.y

                switch (event.key) {
                    case "ArrowLeft":
                        newX = Math.max(
                            dragConstraintsRef.current.left,
                            position.x - KEYBOARD_MOVE_STEP
                        )
                        break
                    case "ArrowRight":
                        newX = Math.min(
                            dragConstraintsRef.current.right,
                            position.x + KEYBOARD_MOVE_STEP
                        )
                        break
                    case "ArrowUp":
                        newY = Math.max(
                            dragConstraintsRef.current.top,
                            position.y - KEYBOARD_MOVE_STEP
                        )
                        break
                    case "ArrowDown":
                        newY = Math.min(
                            dragConstraintsRef.current.bottom,
                            position.y + KEYBOARD_MOVE_STEP
                        )
                        break
                }

                // Only trigger drag end if position actually changed
                if (newX !== position.x || newY !== position.y) {
                    onDragEnd(newX, newY)
                }
            }

            // Escape to release widget
            if (event.key === "Escape" && isKeyboardGrabbed) {
                event.preventDefault()
                setIsKeyboardGrabbed(false)
            }
        },
        [isKeyboardGrabbed, position.x, position.y, onDragStart, onDragEnd]
    )

    // Memoize motion style object to prevent re-creation on every render
    const motionStyle = useMemo(
        () => ({
            position: "absolute" as const,
            cursor: isDragDisabled ? "default" : isActive ? "grabbing" : "grab",
            touchAction: isDragDisabled ? "auto" : ("none" as const),
            zIndex,
        }),
        [isActive, zIndex, isDragDisabled]
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

    // Set initial position from config defaults
    // This ensures widgets start at their configured position, not (0,0)
    // The useEffect in useWidgetPositions will then animate to saved positions
    const initialValues = useMemo(
        () => ({
            x: config.defaultX,
            y: config.defaultY,
            scale: 1,
            rotate: 0,
        }),
        [config.defaultX, config.defaultY]
    )

    return (
        <motion.div
            ref={(el) => {
                internalWidgetRef.current = el
                widgetRef(el)
            }}
            drag={!isDragDisabled}
            dragConstraints={dragConstraintsRef.current}
            dragElastic={0}
            dragMomentum={false}
            suppressHydrationWarning
            dragTransition={
                prefersReducedMotion
                    ? {
                          power: 0,
                          timeConstant: 0,
                      }
                    : {
                          power: 0.1,
                          timeConstant: 200,
                      }
            }
            initial={initialValues}
            animate={animateValues}
            whileDrag={
                prefersReducedMotion
                    ? {
                          scale: 1,
                          rotate: 0,
                      }
                    : {
                          scale: DRAG_SCALE,
                          rotate: DRAG_ROTATION,
                          transition: {
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                          },
                      }
            }
            transition={
                prefersReducedMotion
                    ? {
                          duration: 0,
                      }
                    : {
                          type: "spring",
                          stiffness: SPRING_STIFFNESS,
                          damping: SPRING_DAMPING,
                          mass: SPRING_MASS,
                      }
            }
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="application"
            aria-label={`${config.title || config.id} widget. ${isKeyboardGrabbed ? "Grabbed. Use arrow keys to move, Enter or Escape to release." : "Press Enter or Space to grab and reposition."}`}
            aria-describedby="widget-instructions"
            aria-grabbed={isKeyboardGrabbed}
            style={motionStyle}
            className={isKeyboardGrabbed ? "focus-ring rounded-2xl" : "rounded-2xl"}
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
                customActions={config.customActions}
            >
                {config.content}
            </Widget>
        </motion.div>
    )
}, arePropsEqual)
