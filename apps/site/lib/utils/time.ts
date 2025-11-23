export interface TimezoneConfig {
    timeZone?: string
    displayLabel?: string
}

/**
 * Formats the current time with optional timezone support.
 * Returns a string in the format: "LABEL HH:MM_AM/PM"
 *
 * @param tzConfig - Optional timezone configuration
 * @param tzConfig.timeZone - IANA timezone string (e.g., "Asia/Jakarta")
 * @param tzConfig.displayLabel - Label to display before the time (default: "ID")
 * @returns Formatted time string
 *
 * @example
 * getFormattedTime({ timeZone: "Asia/Jakarta", displayLabel: "ID" })
 * // Returns: "ID 02:30_PM"
 */
export function getFormattedTime(tzConfig?: TimezoneConfig): string {
    const now = new Date()

    const baseOptions = {
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        hour12: true,
    }

    let formatter: Intl.DateTimeFormat

    if (tzConfig?.timeZone) {
        try {
            formatter = new Intl.DateTimeFormat("en-US", {
                ...baseOptions,
                timeZone: tzConfig.timeZone,
            })
        } catch {
            console.warn(
                `Invalid timezone "${tzConfig.timeZone}", falling back to browser timezone`
            )
            formatter = new Intl.DateTimeFormat("en-US", baseOptions)
        }
    } else {
        formatter = new Intl.DateTimeFormat("en-US", baseOptions)
    }

    const parts = formatter.formatToParts(now)

    const hourPart = parts.find((p) => p.type === "hour")?.value || "00"
    const minutePart = parts.find((p) => p.type === "minute")?.value || "00"
    const periodPart = parts.find((p) => p.type === "dayPeriod")?.value || "AM"

    const displayLabel = tzConfig?.displayLabel || "ID"

    return `${displayLabel} ${hourPart}:${minutePart}_${periodPart}`
}
