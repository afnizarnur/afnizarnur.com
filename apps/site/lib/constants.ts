/**
 * Centralized constants for the application.
 * Using `as const` ensures these values are immutable and type-safe.
 */

/**
 * Layout-related constants for responsive design and UI measurements.
 */
export const LAYOUT = {
    /** Height of the navigation bar in pixels */
    NAVBAR_HEIGHT: 66,
    /** Breakpoint for mobile viewport (below this is mobile) */
    MOBILE_BREAKPOINT: 768,
    /** Breakpoint for tablet viewport */
    TABLET_BREAKPOINT: 1024,
    /** Maximum content width for centered layouts */
    MAX_CONTENT_WIDTH: 1280,
} as const

/**
 * Cache duration constants for ISR (Incremental Static Regeneration).
 * Values are in seconds.
 */
export const CACHE = {
    /** Spotify API cache duration (5 minutes) */
    SPOTIFY_REVALIDATE: 300,
    /** PlayStation Network API cache duration (5 minutes) */
    PSN_REVALIDATE: 300,
    /** Default Sanity CMS content cache duration (1 hour) */
    DEFAULT_REVALIDATE: 3600,
    /** Static content cache duration (24 hours) */
    STATIC_REVALIDATE: 86400,
} as const

/**
 * Animation timing constants for consistent motion design.
 * Duration values are in seconds for use with Framer Motion.
 */
export const ANIMATION = {
    /** Fast animations for micro-interactions */
    DURATION_FAST: 0.15,
    /** Normal animations for standard transitions */
    DURATION_NORMAL: 0.3,
    /** Slow animations for emphasis */
    DURATION_SLOW: 0.5,
    /** Spring stiffness for bouncy animations */
    SPRING_STIFFNESS: 400,
    /** Spring damping for controlled bounce */
    SPRING_DAMPING: 30,
} as const

/**
 * Time-related constants for intervals and polling.
 * Values are in milliseconds.
 */
export const TIME = {
    /** Interval for updating time displays (1 minute) */
    TIME_UPDATE_INTERVAL: 60000,
    /** Buffer time for token expiration checks (5 minutes) */
    TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000,
} as const
