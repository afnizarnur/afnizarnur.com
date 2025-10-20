"use client"

import { useEffect, useRef, useState } from "react"
import { HorizontalHeader } from "@/components/HorizontalHeader"

export default function HomePage(): JSX.Element {
    const pageRef = useRef<HTMLDivElement>(null)
    const horizontalTargetRef = useRef<HTMLDivElement | null>(null)
    const [isScrollReleased, setIsScrollReleased] = useState(false)

    useEffect(() => {
        const pageElement = pageRef.current
        if (!pageElement) return

        const resolveHorizontalTarget = (): HTMLDivElement | null => {
            const target = pageElement.querySelector<HTMLDivElement>(".scrollbar-hide")
            if (target) {
                horizontalTargetRef.current = target
            }
            return horizontalTargetRef.current
        }

        resolveHorizontalTarget()

        // Intercept wheel input so the page scrolls horizontally before yielding vertical scroll.
        const handleWheel = (event: WheelEvent): void => {
            const horizontalTarget = horizontalTargetRef.current ?? resolveHorizontalTarget()
            if (!horizontalTarget) return

            const hasHorizontalOverflow =
                horizontalTarget.scrollWidth > horizontalTarget.clientWidth
            if (!hasHorizontalOverflow) {
                if (!isScrollReleased) {
                    setIsScrollReleased(true)
                }
                return
            }

            const { deltaX, deltaY } = event
            const prefersVertical = Math.abs(deltaY) >= Math.abs(deltaX)

            if (isScrollReleased) {
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

                    setIsScrollReleased(false)
                    return
                }

                event.preventDefault()
                window.scrollBy({ top: deltaY })
                return
            }

            if (!isScrollReleased && prefersVertical) {
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
                    setIsScrollReleased(true)
                }
                return
            }

            if (isScrollReleased && window.scrollY <= 0 && deltaY < 0) {
                const target = horizontalTargetRef.current ?? resolveHorizontalTarget()
                if (!target) return

                const atStart = target.scrollLeft <= 0
                if (!atStart) {
                    event.preventDefault()
                    target.scrollLeft += deltaY
                } else {
                    setIsScrollReleased(false)
                }
            }
        }

        window.addEventListener("wheel", handleWheel, { passive: false })

        return () => {
            window.removeEventListener("wheel", handleWheel)
        }
    }, [isScrollReleased])

    return (
        <div ref={pageRef} className="flex flex-col">
            <HorizontalHeader />
            <section className="min-h-[150vh]" aria-hidden="true" />
        </div>
    )
}
