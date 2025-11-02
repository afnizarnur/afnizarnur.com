import { useCallback, useEffect, useState } from "react"
import type { ContentType, CurrentActivityState } from "../types"

// Shared state for CurrentActivity widget
const currentActivityState = {
    contentType: "spotify" as ContentType,
    animationTrigger: 0,
    listeners: new Set<(state: CurrentActivityState) => void>(),

    getState(): CurrentActivityState {
        return {
            contentType: this.contentType,
            animationTrigger: this.animationTrigger,
        }
    },

    setContentType(type: ContentType): void {
        if (type !== this.contentType) {
            this.contentType = type
            this.animationTrigger++
            this.notify()
        }
    },

    subscribe(listener: (state: CurrentActivityState) => void): () => void {
        this.listeners.add(listener)
        return () => {
            this.listeners.delete(listener)
        }
    },

    notify(): void {
        this.listeners.forEach((listener) => listener(this.getState()))
    },
}

/**
 * Hook to use shared CurrentActivity state
 */
export function useCurrentActivityState(): {
    contentType: ContentType
    animationTrigger: number
    handleSwitch: (type: ContentType) => void
} {
    const [state, setState] = useState(currentActivityState.getState())

    useEffect(() => {
        return currentActivityState.subscribe(setState)
    }, [])

    const handleSwitch = useCallback((type: ContentType) => {
        currentActivityState.setContentType(type)
    }, [])

    return {
        contentType: state.contentType,
        animationTrigger: state.animationTrigger,
        handleSwitch,
    }
}
