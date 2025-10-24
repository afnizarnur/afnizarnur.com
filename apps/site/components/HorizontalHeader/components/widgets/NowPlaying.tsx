"use client"

import React, { useEffect, useState, useCallback, useMemo } from "react"

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

const MusicWaveVisualizer = React.memo(function MusicWaveVisualizer(): React.ReactElement {
    const [isMounted, setIsMounted] = useState(false)

    const generateBars = useCallback((): Bar[] => {
        return Array.from({ length: BAR_COUNT }, () => {
            const height = Math.random() * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT
            const charCount = Math.ceil((height / 100) * CHARS_PER_HEIGHT)
            return {
                chars: Array.from(
                    { length: charCount },
                    () => LETTERS_AND_SYMBOLS[Math.floor(Math.random() * LETTERS_AND_SYMBOLS.length)]
                ),
                height,
            }
        })
    }, [])

    const [bars, setBars] = useState<Bar[]>([])

    useEffect(() => {
        setIsMounted(true)
        setBars(generateBars())

        const interval = setInterval(() => {
            setBars(generateBars())
        }, UPDATE_INTERVAL)

        return () => clearInterval(interval)
    }, [generateBars])

    if (!isMounted) {
        return (
            <div className="flex items-end gap-2 h-64" role="img" aria-label="Music visualizer animation">
                <div className="w-full h-full" />
            </div>
        )
    }

    return (
        <div
            className="flex items-end gap-2 h-64"
            role="img"
            aria-label="Music visualizer animation"
        >
            {bars.map((bar, i) => (
                <div
                    key={i}
                    className="w-8 flex flex-col items-center justify-end font-mono text-text-primary text-[12px] transition-all duration-150 overflow-hidden"
                    style={{ height: `${bar.height}%` }}
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

export function NowPlaying({
    title = "On a Cherry Blossom Night",
    artist = "Aimyon",
    albumArt,
    isPlaying = true,
}: NowPlayingProps): React.ReactElement {
    const albumArtAlt = useMemo(() => `${title} by ${artist} album art`, [title, artist])

    return (
        <article className="w-full px-24 pb-24 pt-0" aria-label="Now playing">
            <div className="grid grid-cols-[44px_minmax(0,1fr)_auto] gap-16 items-center">
                {/* Album Art */}
                <div
                    className="w-44 h-44 rounded-lg overflow-hidden bg-background-secondary"
                    role="img"
                    aria-label={albumArt ? albumArtAlt : "No album art"}
                >
                    {albumArt ? (
                        <img
                            src={albumArt}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    ) : (
                        <div
                            className="w-full h-full grid place-items-center text-text-disabled text-xs"
                            aria-hidden="true"
                        >
                            ♪
                        </div>
                    )}
                </div>

                {/* Track Info */}
                <div className="grid gap-8 min-w-0">
                    <h3 className="text-text-primary text-base font-normal leading-tight truncate" title={title}>
                        {title}
                    </h3>
                    <p className="text-text-secondary text-eyebrow-2 truncate" title={artist}>
                        {artist}
                    </p>
                </div>

                {/* Visualizer */}
                <div className="grid place-items-center" aria-live="polite" aria-atomic="true">
                    {isPlaying ? (
                        <MusicWaveVisualizer />
                    ) : (
                        <div className="sr-only">Music paused</div>
                    )}
                </div>
            </div>
        </article>
    )
}
