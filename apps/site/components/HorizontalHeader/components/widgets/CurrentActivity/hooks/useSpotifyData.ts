import { useEffect, useLayoutEffect, useState } from "react"
import { STORAGE_KEYS } from "@/lib/storage"
import { parseStorageData, writeStorageData } from "../../../../utils"
import { CACHE_EXPIRY_MS } from "../constants"
import type { CachedSpotifyData, SpotifyData } from "../types"

/**
 * Fetches now playing data from the API
 */
async function fetchNowPlaying(): Promise<SpotifyData> {
    const response = await fetch("/api/spotify/now-playing")
    if (!response.ok) {
        throw new Error(
            `Spotify now playing request returned ${response.status} ${response.statusText}`.trim(),
        )
    }
    return response.json()
}

/**
 * Hook to manage Spotify data fetching and caching
 */
export function useSpotifyData(): {
    nowPlaying: SpotifyData | null
    isLoading: boolean
} {
    const [nowPlaying, setNowPlaying] = useState<SpotifyData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Load cached data immediately on mount (before first paint)
    useLayoutEffect(() => {
        const cached = parseStorageData<CachedSpotifyData | null>(STORAGE_KEYS.nowPlaying, null)
        if (cached) {
            const isCacheValid = Date.now() - cached.timestamp < CACHE_EXPIRY_MS
            if (isCacheValid) {
                setNowPlaying(cached)
                setIsLoading(false)
            }
        }
    }, [])

    useEffect(() => {
        let isMounted = true

        async function loadNowPlaying(): Promise<void> {
            try {
                const data = await fetchNowPlaying()
                if (isMounted) {
                    setNowPlaying(data)
                    setIsLoading(false)
                    // Cache the data with timestamp
                    const cachedData: CachedSpotifyData = {
                        ...data,
                        timestamp: Date.now(),
                    }
                    writeStorageData(STORAGE_KEYS.nowPlaying, cachedData)
                }
            } catch (error) {
                const isOffline = typeof navigator !== "undefined" && navigator.onLine === false
                if (isOffline) {
                    console.info("Skipping Spotify now playing fetch - offline mode detected")
                } else {
                    console.warn("Spotify now playing data unavailable; will retry automatically", error)
                }
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        loadNowPlaying()

        // Poll for updates every 5 minutes
        const interval = setInterval(loadNowPlaying, 5 * 60 * 1000)

        return () => {
            isMounted = false
            clearInterval(interval)
        }
    }, [])

    return {
        nowPlaying,
        isLoading,
    }
}
