"use client"

import { useEffect, useRef, useState } from "react"
import { HorizontalHeader } from "@/components/HorizontalHeader"

interface PointerState {
    pointerId: number | null
    lastX: number
    lastY: number
    pointerType: PointerEvent["pointerType"] | null
    isActive: boolean
}

export default function HomePage(): JSX.Element {
    const pageRef = useRef<HTMLDivElement>(null)
    const horizontalTargetRef = useRef<HTMLDivElement | null>(null)
    const [isScrollReleased, setIsScrollReleased] = useState(false)
    const isScrollReleasedRef = useRef(isScrollReleased)
    const pointerStateRef = useRef<PointerState>({
        pointerId: null,
        lastX: 0,
        lastY: 0,
        pointerType: null,
        isActive: false,
    })

    useEffect(() => {
        isScrollReleasedRef.current = isScrollReleased
    }, [isScrollReleased])

    useEffect(() => {
        const pageElement = pageRef.current
        if (!pageElement) return

        const resolveHorizontalTarget = (): HTMLDivElement | null => {
            const current = horizontalTargetRef.current
            if (current && pageElement.contains(current)) {
                return current
            }

            const target = pageElement.querySelector<HTMLDivElement>(".scrollbar-hide")
            if (target) {
                horizontalTargetRef.current = target
            }
            return horizontalTargetRef.current
        }

        const releaseScroll = (): void => {
            if (!isScrollReleasedRef.current) {
                isScrollReleasedRef.current = true
                setIsScrollReleased(true)
            }
        }

        const lockScroll = (): void => {
            if (isScrollReleasedRef.current) {
                isScrollReleasedRef.current = false
                setIsScrollReleased(false)
            }
        }

        const getHorizontalTarget = (): HTMLDivElement | null => {
            return horizontalTargetRef.current ?? resolveHorizontalTarget()
        }

        resolveHorizontalTarget()

        const handleWheel = (event: WheelEvent): void => {
            const horizontalTarget = getHorizontalTarget()
            if (!horizontalTarget) return

            const hasHorizontalOverflow =
                horizontalTarget.scrollWidth > horizontalTarget.clientWidth
            if (!hasHorizontalOverflow) {
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
                    const atStart = horizontalTarget.scrollLeft <= 0
                    if (!atStart) {
                        event.preventDefault()
                        horizontalTarget.scrollLeft += deltaY
                        return
                    }
                    lockScroll()
                    return
                }

                event.preventDefault()
                window.scrollBy({ top: deltaY })
                return
            }

            if (!prefersVertical) return

            const atStart = horizontalTarget.scrollLeft <= 0
            const atEnd =
                Math.ceil(horizontalTarget.scrollLeft + horizontalTarget.clientWidth) >=
                horizontalTarget.scrollWidth - 1

            const scrollingForward = deltaY > 0
            const scrollingBackward = deltaY < 0

            if ((scrollingForward && !atEnd) || (scrollingBackward && !atStart)) {
                event.preventDefault()
                horizontalTarget.scrollLeft += deltaY
                return
            }

            if ((scrollingForward && atEnd) || (scrollingBackward && atStart)) {
                releaseScroll()
            }
        }

        const pointerState = pointerStateRef.current

        const handlePointerDown = (event: PointerEvent): void => {
            if (event.pointerType !== "touch" && event.pointerType !== "pen") return

            pointerState.pointerId = event.pointerId
            pointerState.lastX = event.clientX
            pointerState.lastY = event.clientY
            pointerState.pointerType = event.pointerType
            pointerState.isActive = true
        }

        const handlePointerMove = (event: PointerEvent): void => {
            if (!pointerState.isActive || event.pointerId !== pointerState.pointerId) return

            const horizontalTarget = getHorizontalTarget()
            if (!horizontalTarget) return

            const hasHorizontalOverflow =
                horizontalTarget.scrollWidth > horizontalTarget.clientWidth
            if (!hasHorizontalOverflow) {
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
            if (verticalDelta === 0) return

            const atStart = horizontalTarget.scrollLeft <= 0
            const atEnd =
                Math.ceil(horizontalTarget.scrollLeft + horizontalTarget.clientWidth) >=
                horizontalTarget.scrollWidth - 1

            if (!isScrollReleasedRef.current) {
                const scrollingForward = verticalDelta > 0
                const scrollingBackward = verticalDelta < 0

                if ((scrollingForward && !atEnd) || (scrollingBackward && !atStart)) {
                    event.preventDefault()
                    horizontalTarget.scrollLeft += verticalDelta
                    return
                }

                if ((scrollingForward && atEnd) || (scrollingBackward && atStart)) {
                    releaseScroll()
                }
                return
            }

            const atWindowTop = window.scrollY <= 0
            const scrollingUp = verticalDelta < 0

            if (scrollingUp && atWindowTop) {
                if (!atStart) {
                    event.preventDefault()
                    horizontalTarget.scrollLeft += verticalDelta
                    return
                }
                lockScroll()
                return
            }

            event.preventDefault()
            window.scrollBy({ top: verticalDelta })
        }

        const handlePointerEnd = (): void => {
            pointerState.pointerId = null
            pointerState.pointerType = null
            pointerState.isActive = false
        }

        const horizontalTarget = getHorizontalTarget()
        if (horizontalTarget) {
            const previousTouchAction = horizontalTarget.style.touchAction
            horizontalTarget.style.touchAction = "pan-y"
            horizontalTarget.addEventListener("pointerdown", handlePointerDown)
            horizontalTarget.addEventListener("pointermove", handlePointerMove, { passive: false })
            horizontalTarget.addEventListener("pointerup", handlePointerEnd)
            horizontalTarget.addEventListener("pointercancel", handlePointerEnd)

            window.addEventListener("wheel", handleWheel, { passive: false })

            return () => {
                window.removeEventListener("wheel", handleWheel)
                horizontalTarget.style.touchAction = previousTouchAction
                horizontalTarget.removeEventListener("pointerdown", handlePointerDown)
                horizontalTarget.removeEventListener("pointermove", handlePointerMove)
                horizontalTarget.removeEventListener("pointerup", handlePointerEnd)
                horizontalTarget.removeEventListener("pointercancel", handlePointerEnd)
            }
        }

        window.addEventListener("wheel", handleWheel, { passive: false })

        return () => {
            window.removeEventListener("wheel", handleWheel)
        }
    }, [])

    return (
        <div ref={pageRef} className="flex flex-col">
            <HorizontalHeader />
            <section className="min-h-[150vh]" aria-hidden="true" />
        </div>
    )
}
