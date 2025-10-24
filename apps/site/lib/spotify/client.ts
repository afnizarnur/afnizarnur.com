import "server-only"
import type { SpotifyRecentlyPlayedResponse, SpotifyTokenResponse } from "./types"

/**
 * Spotify API Client
 *
 * Handles authentication and API requests to Spotify Web API
 */

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
const SPOTIFY_RECENTLY_PLAYED_URL = "https://api.spotify.com/v1/me/player/recently-played"

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

/**
 * Gets a fresh access token using the refresh token
 */
async function getAccessToken(): Promise<string> {
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
        throw new Error("Missing Spotify credentials in environment variables")
    }

    const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")

    const response = await fetch(SPOTIFY_TOKEN_URL, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: REFRESH_TOKEN,
        }),
    })

    if (!response.ok) {
        throw new Error(`Failed to refresh access token: ${response.statusText}`)
    }

    const data: SpotifyTokenResponse = await response.json()
    return data.access_token
}

/**
 * Fetches recently played tracks from Spotify
 * @param limit - Number of tracks to fetch (default: 1)
 */
export async function getRecentlyPlayed(limit = 1): Promise<SpotifyRecentlyPlayedResponse> {
    const accessToken = await getAccessToken()

    const url = new URL(SPOTIFY_RECENTLY_PLAYED_URL)
    url.searchParams.append("limit", limit.toString())

    const response = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        // Cache for 5 minutes to avoid rate limiting
        next: {
            revalidate: 300,
        },
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch recently played: ${response.statusText}`)
    }

    return response.json()
}
