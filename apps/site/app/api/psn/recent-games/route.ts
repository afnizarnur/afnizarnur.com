import { NextResponse } from "next/server"
import { getRecentGames } from "@/lib/psn/client"
import type { RecentGameData } from "@/lib/psn/types"

/**
 * Recent Games API Endpoint
 *
 * Returns the most recently played game from PlayStation Network.
 * Cached for 5 minutes to minimize API calls.
 */
export async function GET(): Promise<NextResponse<RecentGameData | { error: string }>> {
    try {
        const data = await getRecentGames(10)

        if (
            !data ||
            !data.data ||
            !data.data.gameLibraryTitlesRetrieve ||
            !data.data.gameLibraryTitlesRetrieve.games ||
            data.data.gameLibraryTitlesRetrieve.games.length === 0
        ) {
            return NextResponse.json({
                name: "No recent games",
                playtime: "Not playing",
            })
        }

        // Get the most recently played game
        const game = data.data.gameLibraryTitlesRetrieve.games[0]

        // Calculate playtime from lastPlayedDateTime
        const lastPlayed = new Date(game.lastPlayedDateTime)
        const now = new Date()
        const diffMs = now.getTime() - lastPlayed.getTime()
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
        const diffDays = Math.floor(diffHours / 24)

        let playtime: string
        if (diffHours < 1) {
            const diffMinutes = Math.floor(diffMs / (1000 * 60))
            playtime = diffMinutes < 1 ? "just now" : `${diffMinutes} min ago`
        } else if (diffHours < 24) {
            playtime = `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`
        } else if (diffDays === 1) {
            playtime = "yesterday"
        } else if (diffDays < 7) {
            playtime = `${diffDays} days ago`
        } else {
            playtime = "last week"
        }

        const recentGame: RecentGameData = {
            name: game.name,
            playtime,
            icon: game.image?.url,
            platform: game.platform === "PS5" ? "PS5" : game.platform === "PS4" ? "PS4" : undefined,
        }

        return NextResponse.json(recentGame, {
            headers: {
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
            },
        })
    } catch (error) {
        console.error("PSN API error:", error)

        // Return error response but don't expose internal details
        return NextResponse.json(
            {
                error: "Failed to fetch recent games data",
            },
            { status: 500 }
        )
    }
}

// Enable ISR with 5-minute revalidation
export const revalidate = 300
