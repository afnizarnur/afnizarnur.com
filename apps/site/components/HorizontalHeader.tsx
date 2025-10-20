/**
 * Re-export from the refactored HorizontalHeader module
 * This file maintains backward compatibility with existing imports
 */
export { HorizontalHeader } from "./HorizontalHeader/HorizontalHeaderMain"
export type { WidgetConfig, WidgetPosition } from "./HorizontalHeader/types"

/**
 * Legacy interface - kept for backward compatibility
 * @deprecated Use WidgetConfig instead
 */
export interface HeaderItem {
    id: string
    label: string
    distance?: number // in meters
}
