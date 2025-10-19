/**
 * Sanitize text from Sanity CMS
 *
 * Removes invisible Unicode characters and normalizes whitespace that can
 * occur when content is copy-pasted from rich text editors like Word or Google Docs.
 *
 * @param text - The text to sanitize
 * @returns Sanitized text with normalized whitespace
 */
export function sanitizeText(text: string | null | undefined): string {
    if (!text) return ""

    return (
        text
            // Remove zero-width characters (invisible characters)
            .replace(/[\u200B-\u200D\uFEFF]/g, "")
            // Collapse multiple whitespace characters into single space
            .replace(/\s+/g, " ")
            // Remove leading and trailing whitespace
            .trim()
    )
}

/**
 * Sanitize navigation items from Sanity
 */
export function sanitizeNavigationItems<T extends { title: string; href: string }>(
    items: T[] | null | undefined
): T[] {
    if (!items) return []

    return items.map((item) => ({
        ...item,
        title: sanitizeText(item.title),
        href: sanitizeText(item.href),
    }))
}

/**
 * Sanitize site settings from Sanity
 */
export function sanitizeSiteSettings<
    T extends {
        title?: string
        description?: string
        logo?: { text?: string }
        timezone?: { displayLabel?: string; timeZone?: string }
    },
>(settings: T | null): T | null {
    if (!settings) return null

    return {
        ...settings,
        title: settings.title ? sanitizeText(settings.title) : settings.title,
        description: settings.description
            ? sanitizeText(settings.description)
            : settings.description,
        logo: settings.logo
            ? {
                  ...settings.logo,
                  text: settings.logo.text ? sanitizeText(settings.logo.text) : settings.logo.text,
              }
            : settings.logo,
        timezone: settings.timezone
            ? {
                  ...settings.timezone,
                  displayLabel: settings.timezone.displayLabel
                      ? sanitizeText(settings.timezone.displayLabel)
                      : settings.timezone.displayLabel,
                  timeZone: settings.timezone.timeZone
                      ? sanitizeText(settings.timezone.timeZone)
                      : settings.timezone.timeZone,
              }
            : settings.timezone,
    }
}
