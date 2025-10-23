"use client"

import React, { useCallback, useRef, useMemo, useSyncExternalStore, useEffect } from "react"
import { ReactSketchCanvas, type ReactSketchCanvasRef } from "react-sketch-canvas"
import { PencilSimpleIcon, ClockClockwiseIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr"
import { useDragContext } from "../../contexts/DragContext"
import { getWidgetStorageKey, parseStorageData, writeStorageData } from "../../utils"

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
    private hasLoadedData = false

    static getInstance(widgetId: string): AvatarState {
        if (!this.instances.has(widgetId)) {
            this.instances.set(widgetId, new AvatarState())
        }
        return this.instances.get(widgetId)!
    }

    static cleanup(widgetId: string): void {
        const instance = this.instances.get(widgetId)
        if (instance) {
            instance.resetLoadState()
        }
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

    async saveCanvasData(widgetId: string): Promise<void> {
        try {
            const canvas = this.canvasRefInternal?.current
            if (!canvas) return

            const paths = await canvas.exportPaths()
            const storageKey = getWidgetStorageKey(widgetId, "canvas")
            writeStorageData(storageKey, paths)
        } catch (error) {
            console.error("Failed to save canvas data:", error)
        }
    }

    async loadCanvasData(widgetId: string): Promise<void> {
        try {
            // Prevent multiple loads
            if (this.hasLoadedData) return

            const canvas = this.canvasRefInternal?.current
            if (!canvas) return

            const storageKey = getWidgetStorageKey(widgetId, "canvas")
            const savedData = parseStorageData<unknown>(storageKey, null)

            // exportPaths() returns an array directly, not wrapped in an object
            if (Array.isArray(savedData) && savedData.length > 0) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                canvas.loadPaths(savedData as any)
                this.hasLoadedData = true
            }
        } catch (error) {
            console.error("Failed to load canvas data:", error)
        }
    }

    resetLoadState(): void {
        this.hasLoadedData = false
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
    useEffect(() => {
        stateManager.setCanvasRef(canvasRef)
    }, [stateManager])

    // Cleanup on unmount
    useEffect(() => {
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
        stateManager.resetLoadState()
        const storageKey = getWidgetStorageKey(widgetId, "canvas")
        writeStorageData(storageKey, null)
    }, [stateManager, widgetId])

    const handleSave = useCallback(() => {
        stateManager.saveCanvasData(widgetId)
    }, [stateManager, widgetId])

    return {
        canvasRef,
        isDrawMode: state.isDrawMode,
        handleToggleDrawMode,
        handleClear,
        handleSave,
    }
}

// Content component (rendered in widget body)
export const AvatarContent = React.memo(
    function AvatarContent({ widgetId }: { widgetId: string }): React.ReactElement {
        const { canvasRef, isDrawMode, handleSave } = useAvatarState(widgetId)
        const stateManager = useMemo(() => AvatarState.getInstance(widgetId), [widgetId])
        const hasAttemptedLoad = useRef(false)

        const handlePointerDown = useCallback(
            (e: React.PointerEvent) => {
                if (isDrawMode) {
                    e.stopPropagation()
                }
            },
            [isDrawMode]
        )

        // Debounced auto-save to prevent blocking on every stroke
        const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
        const handleStrokeEnd = useCallback(() => {
            // Clear previous timeout
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current)
            }
            // Debounce save by 1000ms - Firefox needs longer delay to avoid blocking
            saveTimeoutRef.current = setTimeout(() => {
                handleSave()
            }, 1000)
        }, [handleSave])

        // Load canvas data when canvas is ready (single attempt, immediate load)
        useEffect(() => {
            if (canvasRef.current && !hasAttemptedLoad.current) {
                hasAttemptedLoad.current = true
                // Use requestAnimationFrame for optimal timing without blocking
                const frameId = requestAnimationFrame(() => {
                    void stateManager.loadCanvasData(widgetId)
                })
                return () => cancelAnimationFrame(frameId)
            }
        }, [stateManager, widgetId])

        // Cleanup save timeout on unmount
        useEffect(() => {
            return () => {
                if (saveTimeoutRef.current) {
                    clearTimeout(saveTimeoutRef.current)
                    // Save immediately on unmount to not lose data
                    handleSave()
                }
            }
        }, [handleSave])

        // Static styles - optimized for Firefox performance
        const containerStyle = useMemo(
            () => ({
                pointerEvents: isDrawMode ? ("auto" as const) : ("none" as const),
                touchAction: "none" as const, // Always none for better Firefox performance
                userSelect: "none" as const,
                WebkitUserSelect: "none" as const,
                cursor: isDrawMode ? ("crosshair" as const) : ("default" as const),
                // Firefox-specific: force GPU acceleration
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
            }),
            [isDrawMode]
        )

        // Canvas style - optimized for Firefox SVG rendering
        const canvasStyle = useMemo(
            () => ({
                border: "none",
                cursor: isDrawMode ? ("crosshair" as const) : ("default" as const),
                // Firefox optimization: reduce repaints
                backfaceVisibility: "hidden" as const,
                WebkitBackfaceVisibility: "hidden" as const,
            }),
            [isDrawMode]
        )

        // Memoize SVG style - critical for Firefox performance
        const svgStyle = useMemo(
            () => ({
                pointerEvents: isDrawMode ? ("auto" as const) : ("none" as const),
                // Firefox SVG optimization: trade quality for speed
                shapeRendering: "optimizeSpeed" as const,
                // Firefox: hint for faster path rendering
                vectorEffect: "non-scaling-stroke" as const,
            }),
            [isDrawMode]
        )

        return (
            <div
                className="relative w-full h-full z-10 select-none"
                onPointerDown={handlePointerDown}
                style={containerStyle}
            >
                <ReactSketchCanvas
                    ref={canvasRef}
                    strokeWidth={4}
                    strokeColor="#000000"
                    canvasColor="transparent"
                    exportWithBackgroundImage={false}
                    width="100%"
                    height="100%"
                    preserveBackgroundImageAspectRatio="none"
                    withTimestamp={false}
                    style={canvasStyle}
                    svgStyle={svgStyle}
                    onStroke={handleStrokeEnd}
                />
            </div>
        )
    },
    (prevProps, nextProps) => {
        // Custom comparison function for better memoization
        return prevProps.widgetId === nextProps.widgetId
    }
)

// Actions component (rendered in widget header)
export const AvatarActions = React.memo(
    function AvatarActions({ widgetId }: { widgetId: string }): React.ReactElement {
        const { isDrawMode, handleToggleDrawMode, handleClear } = useAvatarState(widgetId)

        // Memoize aria labels
        const drawModeLabel = useMemo(
            () => (isDrawMode ? "Disable draw mode" : "Enable draw mode"),
            [isDrawMode]
        )

        const pencilWeight = useMemo(() => (isDrawMode ? "fill" : "regular"), [isDrawMode]) as
            | "fill"
            | "regular"

        return (
            <>
                <button
                    type="button"
                    onClick={handleToggleDrawMode}
                    className="relative overflow-hidden flex items-center justify-center transition-colors rounded text-icon-inverse hover:opacity-50 cursor-pointer"
                    aria-label={drawModeLabel}
                    title={drawModeLabel}
                >
                    {isDrawMode ? (
                        <CheckIcon size={24} />
                    ) : (
                        <PencilSimpleIcon size={24} weight={pencilWeight} />
                    )}
                </button>

                <button
                    type="button"
                    onClick={handleClear}
                    className="relative overflow-hidden flex items-center justify-center transition-colors rounded text-icon-inverse hover:opacity-50 cursor-pointer"
                    aria-label="Clear drawing"
                    title="Clear drawing"
                >
                    <ClockClockwiseIcon size={24} />
                </button>
            </>
        )
    },
    (prevProps, nextProps) => {
        return prevProps.widgetId === nextProps.widgetId
    }
)
