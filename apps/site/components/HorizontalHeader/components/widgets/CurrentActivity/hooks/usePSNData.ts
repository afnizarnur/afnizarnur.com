import { useEffect, useLayoutEffect, useState } from "react"
import type { CachedPSNData, RecentGameData } from "@/lib/psn/types"
import { STORAGE_KEYS } from "@/lib/storage"
import { parseStorageData, writeStorageData } from "../../../../utils"
import { CACHE_EXPIRY_MS } from "../constants"

/**
 * Fetches recent game data from the API
 */
async function fetchRecentGame(): Promise<RecentGameData> {
    const response = await fetch("/api/psn/recent-games")
    if (!response.ok) {
        throw new Error("Failed to fetch recent game")
    }
    return response.json()
}

/**
 * Hook to manage PSN data fetching and caching
 */
export function usePSNData(): {
    recentGame: RecentGameData | null
    isLoading: boolean
} {
    const [recentGame, setRecentGame] = useState<RecentGameData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Load cached data immediately on mount (before first paint)
    useLayoutEffect(() => {
        const cached = parseStorageData<CachedPSNData | null>(STORAGE_KEYS.recentGames, null)
        if (cached) {
            const isCacheValid = Date.now() - cached.timestamp < CACHE_EXPIRY_MS
            if (isCacheValid) {
                setRecentGame(cached)
                setIsLoading(false)
            }
        }
    }, [])

    useEffect(() => {
        let isMounted = true

        async function loadRecentGame(): Promise<void> {
            try {
                const data = await fetchRecentGame()
                if (isMounted) {
                    setRecentGame(data)
                    setIsLoading(false)
                    // Cache the data with timestamp
                    const cachedData: CachedPSNData = {
                        ...data,
                        timestamp: Date.now(),
                    }
                    writeStorageData(STORAGE_KEYS.recentGames, cachedData)
                }
            } catch (error) {
                console.error("Failed to fetch recent game:", error)
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        loadRecentGame()

        // Poll for updates every 5 minutes
        const interval = setInterval(loadRecentGame, 5 * 60 * 1000)

        return () => {
            isMounted = false
            clearInterval(interval)
        }
    }, [])

    return {
        recentGame,
        isLoading,
    }
}
