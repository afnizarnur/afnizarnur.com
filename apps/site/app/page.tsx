"use client"

import { useEffect, useRef } from "react"
import { HorizontalHeader } from "@/components/HorizontalHeader"

interface PointerState {
    pointerId: number | null
    lastX: number
    lastY: number
    isActive: boolean
    pointerType: PointerEvent["pointerType"] | null
}

const HORIZONTAL_CONTAINER_SELECTOR = '[data-scroll-container="horizontal-header"]'
const EDGE_EPSILON = 1

export default function HomePage(): JSX.Element {
    const pageRef = useRef<HTMLDivElement>(null)

    useHorizontalScrollLock(pageRef)

    return (
        <div ref={pageRef} className="flex flex-col">
            <HorizontalHeader />
            <section className="min-h-[150vh]" aria-hidden="true" />
        </div>
    )
}

function useHorizontalScrollLock(pageRef: React.RefObject<HTMLDivElement>): void {
    const horizontalTargetRef = useRef<HTMLDivElement | null>(null)
    const isScrollReleasedRef = useRef(false)
    const pointerStateRef = useRef<PointerState>({
        pointerId: null,
        lastX: 0,
        lastY: 0,
        isActive: false,
        pointerType: null,
    })

    useEffect(() => {
        const pageElement = pageRef.current
        if (!pageElement) return

        const resolveHorizontalTarget = (): HTMLDivElement | null => {
            const current = horizontalTargetRef.current
            if (current && current.isConnected && pageElement.contains(current)) {
                return current
            }

            const target = pageElement.querySelector<HTMLDivElement>(HORIZONTAL_CONTAINER_SELECTOR)
            horizontalTargetRef.current = target ?? null
            return target ?? null
        }

        const getHorizontalTarget = (): HTMLDivElement | null => {
            return horizontalTargetRef.current ?? resolveHorizontalTarget()
        }

        const releaseScroll = (): void => {
            if (!isScrollReleasedRef.current) {
                isScrollReleasedRef.current = true
            }
        }

        const lockScroll = (): void => {
            if (isScrollReleasedRef.current) {
                isScrollReleasedRef.current = false
            }
        }

        const hasHorizontalOverflow = (target: HTMLDivElement): boolean => {
            return target.scrollWidth - target.clientWidth > EDGE_EPSILON
        }

        const isAtStart = (target: HTMLDivElement): boolean => {
            return target.scrollLeft <= EDGE_EPSILON
        }

        const isAtEnd = (target: HTMLDivElement): boolean => {
            return target.scrollLeft + target.clientWidth >= target.scrollWidth - EDGE_EPSILON
        }

        const applyHorizontalDelta = (target: HTMLDivElement, delta: number): boolean => {
            if (delta === 0) return false

            const maxScroll = Math.max(0, target.scrollWidth - target.clientWidth)
            const nextScroll = Math.min(maxScroll, Math.max(0, target.scrollLeft + delta))

            if (nextScroll === target.scrollLeft) return false

            target.scrollLeft = nextScroll
            return true
        }

        const applyVerticalDelta = (delta: number): void => {
            if (delta === 0) return
            window.scrollBy({ top: delta })
        }

        const handleWheel = (event: WheelEvent): void => {
            const horizontalTarget = getHorizontalTarget()
            if (!horizontalTarget) return

            if (!hasHorizontalOverflow(horizontalTarget)) {
                releaseScroll()
                return
            }

            const { deltaX, deltaY } = event
            const prefersVertical = Math.abs(deltaY) >= Math.abs(deltaX)
            const isReleased = isScrollReleasedRef.current

            if (isReleased) {
                if (!prefersVertical) return

                const atWindowTop = window.scrollY <= 0
                const scrollingUp = deltaY < 0

                if (scrollingUp && atWindowTop) {
                    if (!isAtStart(horizontalTarget)) {
                        event.preventDefault()
                        applyHorizontalDelta(horizontalTarget, deltaY)
                        return
                    }

                    event.preventDefault()
                    lockScroll()
                    return
                }

                event.preventDefault()
                applyVerticalDelta(deltaY)
                return
            }

            if (!prefersVertical) return

            const scrollingForward = deltaY > 0
            const scrollingBackward = deltaY < 0

            const shouldScrollHorizontally =
                (scrollingForward && !isAtEnd(horizontalTarget)) ||
                (scrollingBackward && !isAtStart(horizontalTarget))

            if (shouldScrollHorizontally) {
                event.preventDefault()
                applyHorizontalDelta(horizontalTarget, deltaY)
                return
            }

            releaseScroll()
        }

        const pointerState = pointerStateRef.current

        const handlePointerDown = (event: PointerEvent): void => {
            if (event.pointerType !== "touch" && event.pointerType !== "pen") return

            pointerState.pointerId = event.pointerId
            pointerState.pointerType = event.pointerType
            pointerState.lastX = event.clientX
            pointerState.lastY = event.clientY
            pointerState.isActive = true
        }

        const handlePointerMove = (event: PointerEvent): void => {
            if (!pointerState.isActive || event.pointerId !== pointerState.pointerId) return

            const horizontalTarget = getHorizontalTarget()
            if (!horizontalTarget) return

            if (!hasHorizontalOverflow(horizontalTarget)) {
                releaseScroll()
                return
            }

            const deltaX = event.clientX - pointerState.lastX
            const deltaY = event.clientY - pointerState.lastY

            pointerState.lastX = event.clientX
            pointerState.lastY = event.clientY

            const prefersVertical = Math.abs(deltaY) >= Math.abs(deltaX)
            if (!prefersVertical) return

            const verticalDelta = -deltaY

            if (!isScrollReleasedRef.current) {
                const scrollingForward = verticalDelta > 0
                const scrollingBackward = verticalDelta < 0

                const shouldScrollHorizontally =
                    (scrollingForward && !isAtEnd(horizontalTarget)) ||
                    (scrollingBackward && !isAtStart(horizontalTarget))

                if (shouldScrollHorizontally) {
                    event.preventDefault()
                    applyHorizontalDelta(horizontalTarget, verticalDelta)
                    return
                }

                releaseScroll()
                return
            }

            const atWindowTop = window.scrollY <= 0
            const scrollingUp = verticalDelta < 0

            if (scrollingUp && atWindowTop) {
                if (!isAtStart(horizontalTarget)) {
                    event.preventDefault()
                    applyHorizontalDelta(horizontalTarget, verticalDelta)
                    return
                }

                event.preventDefault()
                lockScroll()
                return
            }

            event.preventDefault()
            applyVerticalDelta(verticalDelta)
        }

        const handlePointerEnd = (): void => {
            pointerState.pointerId = null
            pointerState.pointerType = null
            pointerState.isActive = false
        }

        let detachPointerListeners: (() => void) | null = null

        const attachPointerListeners = (target: HTMLDivElement): void => {
            if (detachPointerListeners) return

            const previousTouchAction = target.style.touchAction
            target.style.touchAction = "pan-y"

            target.addEventListener("pointerdown", handlePointerDown)
            target.addEventListener("pointermove", handlePointerMove, { passive: false })
            target.addEventListener("pointerup", handlePointerEnd)
            target.addEventListener("pointercancel", handlePointerEnd)
            target.addEventListener("pointerleave", handlePointerEnd)

            detachPointerListeners = () => {
                handlePointerEnd()
                target.style.touchAction = previousTouchAction
                target.removeEventListener("pointerdown", handlePointerDown)
                target.removeEventListener("pointermove", handlePointerMove)
                target.removeEventListener("pointerup", handlePointerEnd)
                target.removeEventListener("pointercancel", handlePointerEnd)
                target.removeEventListener("pointerleave", handlePointerEnd)
                detachPointerListeners = null
            }
        }

        const ensurePointerListeners = (): void => {
            const target = resolveHorizontalTarget()
            if (!target) {
                if (detachPointerListeners) {
                    detachPointerListeners()
                }
                return
            }

            attachPointerListeners(target)
        }

        ensurePointerListeners()

        const observer = new MutationObserver(() => {
            ensurePointerListeners()
        })

        observer.observe(pageElement, { childList: true, subtree: true })

        window.addEventListener("wheel", handleWheel, { passive: false })

        return () => {
            window.removeEventListener("wheel", handleWheel)
            observer.disconnect()

            if (detachPointerListeners) {
                detachPointerListeners()
            }
        }
    }, [])
}
