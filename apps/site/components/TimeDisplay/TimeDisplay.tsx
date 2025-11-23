"use client"

import { useEffect, useState } from "react"
import { getFormattedTime, type TimezoneConfig } from "@/lib/utils/time"

interface TimeDisplayProps {
    timezone?: TimezoneConfig
    className?: string
}

export function TimeDisplay({ timezone, className }: TimeDisplayProps): JSX.Element {
    const [timeString, setTimeString] = useState<string>(() => {
        return getFormattedTime(timezone)
    })

    useEffect(() => {
        setTimeString(getFormattedTime(timezone))

        const interval = setInterval(() => {
            setTimeString(getFormattedTime(timezone))
        }, 60000)

        return () => clearInterval(interval)
    }, [timezone])

    return (
        <time
            className={className ?? "text-eyebrow-1 text-text-secondary"}
            dateTime={new Date().toISOString()}
            suppressHydrationWarning
        >
            {timeString}
        </time>
    )
}
