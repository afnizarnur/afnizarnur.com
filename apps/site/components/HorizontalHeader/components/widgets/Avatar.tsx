"use client"

import React, { useCallback, useRef, useMemo, useSyncExternalStore } from "react"
import { ReactSketchCanvas, type ReactSketchCanvasRef } from "react-sketch-canvas"
import { PencilSimpleIcon, ClockClockwiseIcon } from "@phosphor-icons/react/dist/ssr"
import { useDragContext } from "../../contexts/DragContext"

// Types
interface AvatarStateData {
    isDrawMode: boolean
}

// Global state manager for avatar widget (singleton pattern with optimized subscription)
class AvatarState {
    private static instances = new Map<string, AvatarState>()
    
    private canvasRefInternal: React.RefObject<ReactSketchCanvasRef | null> | null = null
    private state: AvatarStateData = { isDrawMode: false }
    private listeners = new Set<() => void>()

    static getInstance(widgetId: string): AvatarState {
        if (!this.instances.has(widgetId)) {
            this.instances.set(widgetId, new AvatarState())
        }
        return this.instances.get(widgetId)!
    }

    static cleanup(widgetId: string): void {
        this.instances.delete(widgetId)
    }

    setCanvasRef(ref: React.RefObject<ReactSketchCanvasRef | null>): void {
        this.canvasRefInternal = ref
    }

    getCanvasRef(): React.RefObject<ReactSketchCanvasRef | null> | null {
        return this.canvasRefInternal
    }

    subscribe = (listener: () => void): (() => void) => {
        this.listeners.add(listener)
        return () => this.listeners.delete(listener)
    }

    getSnapshot = (): AvatarStateData => {
        return this.state
    }

    private notify(): void {
        this.listeners.forEach((listener) => listener())
    }

    setDrawMode(value: boolean): void {
        if (this.state.isDrawMode !== value) {
            this.state = { ...this.state, isDrawMode: value }
            this.notify()
        }
    }

    clearCanvas(): void {
        this.canvasRefInternal?.current?.clearCanvas()
    }
}

// Hook to use avatar state with useSyncExternalStore for better performance
function useAvatarState(widgetId: string) {
    const stateManager = useMemo(() => AvatarState.getInstance(widgetId), [widgetId])
    const canvasRef = useRef<ReactSketchCanvasRef>(null)
    const { setWidgetDragDisabled } = useDragContext()

    // Use useSyncExternalStore for optimal re-renders
    const state = useSyncExternalStore(
        stateManager.subscribe,
        stateManager.getSnapshot,
        stateManager.getSnapshot
    )

    // Set canvas ref on mount
    React.useEffect(() => {
        stateManager.setCanvasRef(canvasRef)
    }, [stateManager])

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            // Only cleanup if this is the last instance
            if (stateManager.getSnapshot().isDrawMode) {
                setWidgetDragDisabled(widgetId, false)
            }
        }
    }, [stateManager, widgetId, setWidgetDragDisabled])

    const handleToggleDrawMode = useCallback(() => {
        const newDrawMode = !state.isDrawMode
        stateManager.setDrawMode(newDrawMode)
        setWidgetDragDisabled(widgetId, newDrawMode)
    }, [state.isDrawMode, stateManager, widgetId, setWidgetDragDisabled])

    const handleClear = useCallback(() => {
        stateManager.clearCanvas()
    }, [stateManager])

    return {
        canvasRef,
        isDrawMode: state.isDrawMode,
        handleToggleDrawMode,
        handleClear,
    }
}

// Content component (rendered in widget body)
export const AvatarContent = React.memo(function AvatarContent({ 
    widgetId 
}: { 
    widgetId: string 
}): React.ReactElement {
    const { canvasRef, isDrawMode } = useAvatarState(widgetId)

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        if (isDrawMode) {
            e.stopPropagation()
        }
    }, [isDrawMode])

    // Memoize container styles to prevent unnecessary recalculations
    const containerStyle = useMemo(() => ({
        pointerEvents: isDrawMode ? ("auto" as const) : ("none" as const),
        touchAction: isDrawMode ? ("none" as const) : ("auto" as const),
        userSelect: "none" as const,
        WebkitUserSelect: "none" as const,
        cursor: isDrawMode ? ("crosshair" as const) : ("default" as const),
    }), [isDrawMode])

    // Memoize canvas styles
    const canvasStyle = useMemo(() => ({
        border: "none",
        cursor: isDrawMode ? ("crosshair" as const) : ("default" as const),
    }), [isDrawMode])

    return (
        <div
            className="relative w-full h-full z-10 select-none"
            onPointerDown={handlePointerDown}
            style={containerStyle}
        >
            <ReactSketchCanvas
                ref={canvasRef}
                strokeWidth={2}
                strokeColor="#000000"
                canvasColor="transparent"
                exportWithBackgroundImage={false}
                width="100%"
                height="100%"
                preserveBackgroundImageAspectRatio="none"
                withTimestamp={false}
                allowOnlyPointerType="all"
                style={canvasStyle}
            />
        </div>
    )
}, (prevProps, nextProps) => {
    // Custom comparison function for better memoization
    return prevProps.widgetId === nextProps.widgetId
})

// Actions component (rendered in widget header)
export const AvatarActions = React.memo(function AvatarActions({ 
    widgetId 
}: { 
    widgetId: string 
}): React.ReactElement {
    const { isDrawMode, handleToggleDrawMode, handleClear } = useAvatarState(widgetId)

    // Memoize aria labels
    const drawModeLabel = useMemo(
        () => isDrawMode ? "Disable draw mode" : "Enable draw mode",
        [isDrawMode]
    )

    const pencilWeight = useMemo(
        () => isDrawMode ? "fill" : "regular",
        [isDrawMode]
    ) as "fill" | "regular"

    return (
        <>
            <button
                type="button"
                onClick={handleToggleDrawMode}
                className="relative overflow-hidden flex items-center justify-center transition-colors rounded text-white hover:text-gray-200"
                aria-label={drawModeLabel}
                title={drawModeLabel}
            >
                <PencilSimpleIcon size={24} weight={pencilWeight} />
            </button>

            <button
                type="button"
                onClick={handleClear}
                className="relative overflow-hidden flex items-center justify-center transition-colors rounded text-white hover:text-gray-200"
                aria-label="Clear drawing"
                title="Clear drawing"
            >
                <ClockClockwiseIcon size={24} />
            </button>
        </>
    )
}, (prevProps, nextProps) => {
    return prevProps.widgetId === nextProps.widgetId
})
