/**
 * Normalizes a href string to ensure it starts with "/" for internal links.
 * External links (starting with "http") are returned unchanged.
 *
 * @param href - The href to normalize
 * @returns Normalized href string
 *
 * @example
 * normalizeHref("about") // Returns: "/about"
 * normalizeHref("/about") // Returns: "/about"
 * normalizeHref("https://example.com") // Returns: "https://example.com"
 */
export function normalizeHref(href: string): string {
    if (href.startsWith("http")) {
        return href
    }
    return href.startsWith("/") ? href : `/${href}`
}

/**
 * Checks if a navigation item is active based on the current path.
 *
 * @param itemHref - The href of the navigation item
 * @param currentPath - The current pathname
 * @returns True if the item is active
 */
export function isNavItemActive(itemHref: string, currentPath: string): boolean {
    const normalizedHref = normalizeHref(itemHref)
    return currentPath === normalizedHref
}
