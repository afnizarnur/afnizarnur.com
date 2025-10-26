import { defineLive } from "next-sanity/live"
import { client } from "./client"

/**
 * Live Content API Setup
 *
 * This configures the Sanity Live Content API for real-time content updates
 * and draft mode support.
 *
 * IMPORTANT: Requires SANITY_API_READ_TOKEN environment variable to be set.
 * Without it, draft mode and live preview features will not work.
 *
 * @see https://www.sanity.io/docs/live-content-api
 */

// Get the read token for accessing draft content
const token = process.env.SANITY_API_READ_TOKEN

// Only throw error in development to help developers set up the token
// In production, the token should always be set if draft mode is needed
if (!token && process.env.NODE_ENV === "development") {
    console.warn(
        "⚠️  SANITY_API_READ_TOKEN is not set. Draft mode and live preview features will not work.\n" +
            "   To enable these features, add SANITY_API_READ_TOKEN to your .env.local file.\n" +
            "   See .env.example for more information."
    )
}

/**
 * Configure Live Content API with defineLive
 *
 * This exports:
 * - sanityFetch: Enhanced fetch function with draft mode support
 * - SanityLive: React component for live updates in the browser
 *
 * The token is required for draft mode features. If not set, the functions
 * will still work but draft mode will not be available.
 */
export const { sanityFetch, SanityLive } = defineLive({
    client,
    // biome-ignore lint/style/noNonNullAssertion: Token is required for live preview functionality
    serverToken: token!,
    // biome-ignore lint/style/noNonNullAssertion: Token is required for live preview functionality
    browserToken: token!,
    // Optional: Configure polling interval for live updates (default: 1000ms)
    // fetchOptions: {
    //   revalidate: false, // Disable Next.js caching for draft content
    // },
})
