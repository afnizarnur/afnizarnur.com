import type { WidgetPosition, ConstraintBounds, DragMouseEvent } from "./types"
import { TOTAL_CONTENT_WIDTH } from "./constants"

/**
 * Clamps a position to valid bounds
 */
export function clampPosition(
    x: number,
    y: number,
    widgetWidth: number,
    widgetHeight: number,
    bounds: ConstraintBounds
): WidgetPosition {
    return {
        x: Math.max(bounds.minX, Math.min(x, bounds.maxX)),
        y: Math.max(bounds.minY, Math.min(y, bounds.maxY)),
    }
}

/**
 * Calculates constraint bounds for a widget
 */
export function calculateConstraintBounds(
    widgetWidth: number,
    widgetHeight: number,
    headerHeight: number
): ConstraintBounds {
    return {
        minX: 0,
        minY: 0,
        maxX: Math.max(0, TOTAL_CONTENT_WIDTH - widgetWidth),
        maxY: Math.max(0, headerHeight - widgetHeight),
    }
}

/**
 * Extracts clientX from mouse or touch event
 */
export function getClientX(event: DragMouseEvent): number {
    if ("clientX" in event) {
        return event.clientX
    }
    if ("touches" in event && event.touches.length > 0) {
        return event.touches[0].clientX
    }
    return 0
}

/**
 * Safely parses JSON from localStorage
 * Returns fallback if not in browser environment
 */
export function parseStorageData<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") {
        return fallback
    }
    try {
        const stored = localStorage.getItem(key)
        if (!stored) return fallback
        return JSON.parse(stored) as T
    } catch (error) {
        console.error(`Failed to parse localStorage data for key "${key}":`, error)
        return fallback
    }
}

/**
 * Safely writes JSON to localStorage
 * Does nothing if not in browser environment
 */
export function writeStorageData<T>(key: string, data: T): void {
    if (typeof window === "undefined") {
        return
    }
    try {
        localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
        console.error(`Failed to write to localStorage for key "${key}":`, error)
    }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null

    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: unknown[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let lastCall = 0

    return (...args: Parameters<T>) => {
        const now = Date.now()
        if (now - lastCall >= delay) {
            lastCall = now
            fn(...args)
        }
    }
}

/**
 * Gets a namespaced storage key for widget-specific data
 * Uses centralized storage keys from lib/storage
 */
export function getWidgetStorageKey(widgetId: string, dataType: string): string {
    // Import dynamically to avoid circular dependencies
    // This matches STORAGE_KEYS.widgetData(widgetId, dataType)
    return `afnizarnur-horizontal-header-widget-data-${widgetId}-${dataType}`
}

/**
 * Clears all widget data for a specific widget
 * Does nothing if not in browser environment
 */
export function clearWidgetData(widgetId: string): void {
    if (typeof window === "undefined") {
        return
    }
    try {
        const keysToRemove: string[] = []
        const prefix = `afnizarnur-horizontal-header-widget-data-${widgetId}-`
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key?.startsWith(prefix)) {
                keysToRemove.push(key)
            }
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key))
    } catch (error) {
        console.error(`Failed to clear widget data for "${widgetId}":`, error)
    }
}
