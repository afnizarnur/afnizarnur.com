import React, { useCallback, useEffect, useState } from "react"
import { useReducedMotion } from "@/contexts/UserPreferencesContext"
import {
    BAR_COUNT,
    CHARS_PER_HEIGHT,
    LETTERS_AND_SYMBOLS,
    MAX_HEIGHT,
    MIN_HEIGHT,
    UPDATE_INTERVAL,
} from "../constants"
import type { Bar } from "../types"

interface MusicWaveVisualizerProps {
    isLoading?: boolean
}

export const MusicWaveVisualizer = React.memo(function MusicWaveVisualizer({
    isLoading = false,
}: MusicWaveVisualizerProps): React.ReactElement {
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
                        // biome-ignore lint/suspicious/noArrayIndexKey: Visualizer bars have stable order
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
                            // biome-ignore lint/suspicious/noArrayIndexKey: Characters have stable order within bar
                            <span key={`${i}-${j}`}>{char}</span>
                        ))}
                    </div>
                ))}
        </div>
    )
})
