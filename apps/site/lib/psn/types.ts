/**
 * PSN API Type Definitions
 *
 * Based on psn-api library types and responses
 */

/**
 * PSN Game from getRecentlyPlayedGames response
 */
export interface PSNGame {
    titleId: string
    name: string
    imageUrl: string
    localizedName?: string
    category: string
    lastPlayedDateTime: string
    playDuration?: string
    platform?: string[]
}

/**
 * Response from getRecentlyPlayedGames
 */
export interface PSNRecentlyPlayedResponse {
    data: {
        games: PSNGame[]
    }
    totalItemCount: number
}

/**
 * Normalized game data for CurrentActivity widget
 * Matches the existing GameData interface
 */
export interface RecentGameData {
    name: string
    playtime: string
    icon?: string
    platform?: string
}

/**
 * Cached PSN data with timestamp for expiry
 */
export interface CachedPSNData extends RecentGameData {
    timestamp: number
}

/**
 * PSN Authorization payload
 */
export interface PSNAuthorization {
    accessToken: string
    expiresIn: number
    tokenType: string
    scope: string
    idToken: string
    refreshToken: string
    refreshTokenExpiresIn: number
}
