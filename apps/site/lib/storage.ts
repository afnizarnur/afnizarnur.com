/**
 * Centralized localStorage key constants
 * All app storage uses the "afnizarnur-" prefix for namespace isolation
 */

/** App-wide localStorage prefix */
export const APP_PREFIX = "afnizarnur-"

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
    /** User preferences (theme, motion, etc.) */
    userPreferences: `${APP_PREFIX}user-preferences`,

    /** Horizontal header widget positions */
    widgetPositions: `${APP_PREFIX}horizontal-header-widget-positions`,

    /** Horizontal header widget z-index stack order */
    widgetStackOrder: `${APP_PREFIX}horizontal-header-widget-stack-order`,

    /** Horizontal header widget-specific data (e.g., canvas drawings) */
    widgetData: (widgetId: string, dataType: string): string =>
        `${APP_PREFIX}horizontal-header-widget-data-${widgetId}-${dataType}`,

    /** Now Playing widget cached data */
    nowPlaying: `${APP_PREFIX}now-playing`,
} as const
