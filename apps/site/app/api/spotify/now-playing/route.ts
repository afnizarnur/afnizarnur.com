import { NextResponse } from "next/server"
import { getRecentlyPlayed } from "@/lib/spotify/client"
import type { NowPlayingData } from "@/lib/spotify/types"

/**
 * Now Playing API Endpoint
 *
 * Returns the most recently played track from Spotify.
 * Cached for 5 minutes to minimize API calls.
 */
export async function GET(): Promise<NextResponse<NowPlayingData | { error: string }>> {
    try {
        const data = await getRecentlyPlayed(1)

        if (!data.items || data.items.length === 0) {
            return NextResponse.json({
                isPlaying: false,
                title: "No recent tracks",
                artist: "Spotify",
            })
        }

        const mostRecent = data.items[0]
        const track = mostRecent.track

        // Get the smallest album art (usually 64x64)
        const albumArt = track.album.images[track.album.images.length - 1]?.url

        const nowPlaying: NowPlayingData = {
            isPlaying: true,
            title: track.name,
            artist: track.artists.map((artist) => artist.name).join(", "),
            albumArt,
            songUrl: track.external_urls.spotify,
        }

        return NextResponse.json(nowPlaying, {
            headers: {
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
            },
        })
    } catch (error) {
        console.error("Spotify API error:", error)

        // Return error response but don't expose internal details
        return NextResponse.json(
            {
                error: "Failed to fetch now playing data",
            },
            { status: 500 }
        )
    }
}

// Enable ISR with 5-minute revalidation
export const revalidate = 300
