import { NextResponse } from "next/server"
import { getRecentlyPlayed } from "@/lib/spotify/client"
import type { NowPlayingData } from "@/lib/spotify/types"

/**
 * Now Playing API Endpoint
 *
 * Returns the most recently played track from Spotify (non-explicit).
 * Automatically skips explicit tracks.
 * Cached for 5 minutes to minimize API calls.
 */
export async function GET(): Promise<NextResponse<NowPlayingData | { error: string }>> {
    try {
        // Fetch more tracks to account for explicit songs that we'll filter out
        // Spotify limits to max 50 items, so we fetch 50 and filter
        const data = await getRecentlyPlayed(50)

        if (!data.items || data.items.length === 0) {
            return NextResponse.json({
                isPlaying: false,
                title: "No recent tracks",
                artist: "Spotify",
            })
        }

        // Find the first non-explicit track
        const nonExplicitTrack = data.items.find((item) => !item.track.explicit)

        if (!nonExplicitTrack) {
            return NextResponse.json({
                isPlaying: false,
                title: "No clean tracks in recent history",
                artist: "Spotify",
            })
        }

        const track = nonExplicitTrack.track

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
