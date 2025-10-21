import React, { useCallback, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"
import { Widget } from "../../Widget"
import type { WidgetConfig, WidgetPosition, DragMouseEvent } from "../types"
import {
    SPRING_STIFFNESS,
    SPRING_DAMPING,
    SPRING_MASS,
    HOVER_SCALE,
    DRAG_SCALE,
    DRAG_ROTATION,
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
            ref={widgetRef}
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
                scale: 1,
                rotate: 0,
            }}
            animate={{
                x: position.x,
                y: position.y,
                scale: 1,
                rotate: 0,
            }}
            whileHover={{
                scale: HOVER_SCALE,
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                },
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
            >
                {config.content}
            </Widget>
        </motion.div>
    )
})
