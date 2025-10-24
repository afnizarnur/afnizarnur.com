"use client"

import React, { useEffect, useState, useCallback, useMemo, useLayoutEffect } from "react"
import Image from "next/image"
import { useReducedMotion } from "@/contexts/UserPreferencesContext"
import { STORAGE_KEYS } from "@/lib/storage"
import { parseStorageData, writeStorageData } from "../../utils"

interface NowPlayingData {
    isPlaying: boolean
    title: string
    artist: string
    albumArt?: string
    songUrl?: string
}

interface CachedNowPlayingData extends NowPlayingData {
    timestamp: number
}

interface NowPlayingProps {
    title?: string
    artist?: string
    albumArt?: string
    isPlaying?: boolean
}

interface Bar {
    chars: string[]
    height: number
}

const LETTERS_AND_SYMBOLS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "-",
    "_",
    "+",
    "=",
    ";",
    ":",
    "<",
    ">",
    ",",
] as const

const BAR_COUNT = 12
const UPDATE_INTERVAL = 150
const MIN_HEIGHT = 20
const MAX_HEIGHT = 80
const CHARS_PER_HEIGHT = 6
const CACHE_EXPIRY_MS = 10 * 60 * 1000 // 10 minutes

const MusicWaveVisualizer = React.memo(function MusicWaveVisualizer({
    isLoading = false,
}: {
    isLoading?: boolean
}): React.ReactElement {
    const [isMounted, setIsMounted] = useState(false)
    const prefersReducedMotion = useReducedMotion()

    const generateBars = useCallback((): Bar[] => {
        return Array.from({ length: BAR_COUNT }, () => {
            const height = Math.random() * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT
            const charCount = Math.ceil((height / 100) * CHARS_PER_HEIGHT)
            return {
                chars: Array.from(
                    { length: charCount },
                    () =>
                        LETTERS_AND_SYMBOLS[Math.floor(Math.random() * LETTERS_AND_SYMBOLS.length)]
                ),
                height,
            }
        })
    }, [])

    const [bars, setBars] = useState<Bar[]>(generateBars())

    useEffect(() => {
        setIsMounted(true)
        setBars(generateBars())
    }, [generateBars])

    useEffect(() => {
        // Only set interval if motion is not reduced
        if (prefersReducedMotion) return

        const interval = setInterval(() => {
            setBars(generateBars())
        }, UPDATE_INTERVAL)

        return () => clearInterval(interval)
    }, [generateBars, prefersReducedMotion])

    return (
        <div
            className="flex items-end gap-2 h-64 min-w-[160px]"
            role="img"
            aria-label="Music visualizer animation"
        >
            {isMounted &&
                bars.map((bar, i) => (
                    <div
                        key={i}
                        className={`w-24 md:w-12 flex flex-col items-center justify-end font-mono text-text-primary text-[12px] overflow-hidden${
                            prefersReducedMotion ? "" : " transition-all duration-150"
                        }`}
                        style={{
                            height: `${bar.height}%`,
                            opacity: isLoading ? 0.3 : 1,
                        }}
                        aria-hidden="true"
                    >
                        {bar.chars.map((char, j) => (
                            <span key={`${i}-${j}`}>{char}</span>
                        ))}
                    </div>
                ))}
        </div>
    )
})

/**
 * Fetches now playing data from the API
 */
async function fetchNowPlaying(): Promise<NowPlayingData> {
    const response = await fetch("/api/spotify/now-playing")
    if (!response.ok) {
        throw new Error("Failed to fetch now playing")
    }
    return response.json()
}

export function NowPlaying({
    title: defaultTitle,
    artist: defaultArtist,
    albumArt: defaultAlbumArt,
    isPlaying: defaultIsPlaying,
}: NowPlayingProps = {}): React.ReactElement {
    const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Load cached data immediately on mount (before first paint)
    useLayoutEffect(() => {
        const cached = parseStorageData<CachedNowPlayingData | null>(STORAGE_KEYS.nowPlaying, null)
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
                    const cachedData: CachedNowPlayingData = {
                        ...data,
                        timestamp: Date.now(),
                    }
                    writeStorageData(STORAGE_KEYS.nowPlaying, cachedData)
                }
            } catch (error) {
                console.error("Failed to fetch now playing:", error)
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

    // Use fetched data or fallback to props/defaults
    const title = nowPlaying?.title ?? defaultTitle ?? "On a Cherry Blossom Night"
    const artist = nowPlaying?.artist ?? defaultArtist ?? "Aimyon"
    const albumArt = nowPlaying?.albumArt ?? defaultAlbumArt
    const isPlaying = nowPlaying?.isPlaying ?? defaultIsPlaying ?? true

    const albumArtAlt = useMemo(() => `${title} by ${artist} album art`, [title, artist])

    return (
        <article className="w-full px-24 md:px-24 pb-24 pt-0" aria-label="Now playing">
            <div className="flex flex-col gap-16">
                {/* Content container - album art + track info */}
                <div className="grid grid-cols-[44px_minmax(0,1fr)] md:grid-cols-[44px_minmax(0,1fr)_auto] gap-16 items-center min-h-[68px]">
                    {/* Album Art */}
                    <div
                        className="w-44 h-44 rounded-lg overflow-hidden bg-background-secondary flex-shrink-0 relative"
                        role="img"
                        aria-label={albumArt ? albumArtAlt : "No album art"}
                    >
                        {albumArt ? (
                            <Image
                                src={albumArt}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="44px"
                                unoptimized
                            />
                        ) : (
                            <div
                                className="w-full h-full grid place-items-center text-text-disabled text-xs"
                                aria-hidden="true"
                            ></div>
                        )}
                    </div>

                    {/* Track Info */}
                    <div className="grid gap-8 min-w-0">
                        <h3
                            className="text-text-primary text-base font-normal leading-tight truncate"
                            title={title}
                            style={{ opacity: isLoading ? 0.5 : 1 }}
                        >
                            {title}
                        </h3>
                        <p
                            className="text-text-secondary text-eyebrow-2 truncate"
                            title={artist}
                            style={{ opacity: isLoading ? 0.5 : 1 }}
                        >
                            {artist}
                        </p>
                    </div>

                    {/* Visualizer - only on desktop */}
                    <div
                        className="hidden md:flex flex-shrink-0"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {isPlaying ? (
                            <MusicWaveVisualizer isLoading={isLoading} />
                        ) : (
                            <div className="h-64 min-w-[160px]" aria-label="Music paused" />
                        )}
                    </div>
                </div>

                {/* Visualizer - only on mobile */}
                <div
                    className="flex md:hidden justify-center flex-shrink-0"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {isPlaying ? (
                        <MusicWaveVisualizer isLoading={isLoading} />
                    ) : (
                        <div className="h-64 min-w-[160px]" aria-label="Music paused" />
                    )}
                </div>
            </div>
        </article>
    )
}
