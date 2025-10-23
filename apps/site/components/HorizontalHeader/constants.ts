/**
 * Layout constants for the horizontal header
 */

/** Width of each segment in pixels */
export const SEGMENT_WIDTH = 800

/** Number of segments in the header */
export const TOTAL_SEGMENTS = 3

/** Total draggable content width */
export const TOTAL_CONTENT_WIDTH = SEGMENT_WIDTH * TOTAL_SEGMENTS

/** Grid template for the header layout - Mobile/Tablet (full width) */
export const GRID_TEMPLATE_MOBILE = "1fr 100% 1fr"

/** Grid template for the header layout - Desktop (max 1220px) */
export const GRID_TEMPLATE_DESKTOP = "1fr min(1220px, 100% - 48px) 1fr"

/** LocalStorage key for persisting widget positions */
export const STORAGE_KEY = "horizontal-header-widget-positions"

/** LocalStorage key prefix for widget-specific data */
export const WIDGET_DATA_KEY_PREFIX = "horizontal-header-widget-data"

/**
 * Auto-scroll configuration
 */

/** Distance from edge in pixels to trigger auto-scroll */
export const AUTO_SCROLL_THRESHOLD = 50

/** Scroll speed in pixels per frame */
export const AUTO_SCROLL_SPEED = 5

/**
 * Animation configuration
 */

/** Spring stiffness for widget animations */
export const SPRING_STIFFNESS = 350

/** Spring damping for widget animations */
export const SPRING_DAMPING = 35

/** Spring mass for widget animations */
export const SPRING_MASS = 1

/** Hover scale multiplier */
export const HOVER_SCALE = 1.02

/** Drag scale multiplier */
export const DRAG_SCALE = 1.05

/** Drag rotation in degrees */
export const DRAG_ROTATION = 0.8

/** Base z-index for widgets */
export const BASE_Z_INDEX = 10

/** Active (dragging) widget z-index */
export const ACTIVE_Z_INDEX = 100

/**
 * Default widget dimensions
 */

/** Default minimum height for widgets without specified height */
export const DEFAULT_MIN_HEIGHT = 200

/**
 * Debounce/Throttle timing
 */

/** Debounce delay for resize observer in milliseconds */
export const RESIZE_DEBOUNCE_DELAY = 150

/** Throttle delay for drag events in milliseconds */
export const DRAG_THROTTLE_DELAY = 16 // ~60fps
