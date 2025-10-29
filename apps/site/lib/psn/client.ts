import "server-only"

import {
    exchangeAccessCodeForAuthTokens,
    exchangeNpssoForAccessCode,
    exchangeRefreshTokenForAuthTokens,
    getRecentlyPlayedGames,
} from "psn-api"
import type { PSNAuthorization } from "./types"

/**
 * PSN API Client
 *
 * Handles authentication and API requests to PlayStation Network API
 * Uses the psn-api library for OAuth flow and data fetching
 */

const NPSSO_TOKEN = process.env.PSN_NPSSO_TOKEN
const REFRESH_TOKEN = process.env.PSN_REFRESH_TOKEN

// Cache for access token to avoid unnecessary token exchanges
let cachedAuthorization: PSNAuthorization | null = null
let tokenExpiresAt = 0

/**
 * Gets a valid authorization token, refreshing if necessary
 */
async function getAuthorization(): Promise<PSNAuthorization> {
    // Return cached token if still valid (with 5-minute buffer)
    const now = Date.now()
    if (cachedAuthorization && now < tokenExpiresAt - 5 * 60 * 1000) {
        return cachedAuthorization
    }

    // Try refresh token first if available
    if (REFRESH_TOKEN) {
        try {
            const authorization = await exchangeRefreshTokenForAuthTokens(REFRESH_TOKEN)
            cachedAuthorization = authorization as PSNAuthorization
            tokenExpiresAt = now + authorization.expiresIn * 1000
            return cachedAuthorization
        } catch (error) {
            console.error("Failed to refresh PSN token, falling back to NPSSO:", error)
        }
    }

    // Fall back to NPSSO token exchange
    if (!NPSSO_TOKEN) {
        throw new Error(
            "Missing PSN credentials: Either PSN_NPSSO_TOKEN or PSN_REFRESH_TOKEN must be set in environment variables"
        )
    }

    try {
        const accessCode = await exchangeNpssoForAccessCode(NPSSO_TOKEN)
        const authorization = await exchangeAccessCodeForAuthTokens(accessCode)
        cachedAuthorization = authorization as PSNAuthorization
        tokenExpiresAt = now + authorization.expiresIn * 1000
        return cachedAuthorization
    } catch (error) {
        throw new Error(`Failed to authenticate with PSN: ${error}`)
    }
}

/**
 * Fetches recently played games from PSN
 * @param limit - Number of games to fetch (default: 10)
 * @param categories - Game categories to include (default: PS4 and PS5 games)
 */
export async function getRecentGames(
    limit = 10,
    categories: ("ps4_game" | "ps5_native_game")[] = ["ps4_game", "ps5_native_game"]
) {
    try {
        const authorization = await getAuthorization()

        const response = await getRecentlyPlayedGames(authorization, {
            limit,
            categories,
        })

        return response
    } catch (error) {
        console.error("Error fetching recently played games:", error)
        throw error
    }
}
