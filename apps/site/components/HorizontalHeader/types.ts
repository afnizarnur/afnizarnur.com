import type React from "react"

/**
 * Represents the 2D position of a widget in pixels
 */
export interface WidgetPosition {
    x: number
    y: number
}

/**
 * Constraint bounds for widget dragging
 */
export interface ConstraintBounds {
    minX: number
    minY: number
    maxX: number
    maxY: number
}

/**
 * Configuration for a single draggable widget
 */
export interface WidgetConfig {
    /** Unique identifier for the widget */
    id: string
    /** Default X position in pixels */
    defaultX: number
    /** Default Y position in pixels */
    defaultY: number
    /** Width in pixels */
    width: number
    /** Fixed height in pixels (optional) */
    height?: number
    /** Minimum height in pixels (optional) */
    minHeight?: number
    /** Background color CSS value */
    backgroundColor?: string
    /** Background image URL (deprecated, use imageProps instead) */
    backgroundImage?: string
    /** Next.js Image props for optimized image rendering */
    imageProps?: {
        src: string
        alt: string
    }
    /** Widget title */
    title?: string | React.ReactNode
    /** Whether to show close button */
    showClose?: boolean
    /** Whether to disable padding on content (for full-fill content like games) */
    noPadding?: boolean
    /** Callback to control drag state */
    onDragDisabledChange?: (disabled: boolean) => void
    /** Custom actions to render in widget header */
    customActions?: React.ReactNode
    /** Widget content */
    content: React.ReactNode
}

/**
 * Dimensions of a widget
 */
export interface WidgetDimensions {
    width: number
    height: number
}

/**
 * Direction for auto-scrolling
 */
export type ScrollDirection = -1 | 0 | 1

/**
 * Drag event info from Framer Motion
 */
export interface DragInfo {
    offset: {
        x: number
        y: number
    }
    point: {
        x: number
        y: number
    }
    velocity: {
        x: number
        y: number
    }
}

/**
 * Mouse or touch event for drag handling
 */
export type DragMouseEvent = React.MouseEvent | TouchEvent
