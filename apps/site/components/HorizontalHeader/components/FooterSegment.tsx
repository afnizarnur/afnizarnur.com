import React from "react"
import { SEGMENT_WIDTH } from "../constants"

interface FooterSegmentProps {
    label: string
    width?: number | string
    className?: string
    innerClassName?: string
    triangleColor?: string
    triangleOffset?: number | string
}

/**
 * A footer segment with distance label and triangle pointer
 */
export const FooterSegment = React.memo(function FooterSegment({
    label,
    width = SEGMENT_WIDTH,
    className,
    innerClassName,
    triangleColor,
    triangleOffset,
}: FooterSegmentProps): React.ReactElement {
    const resolvedWidth = typeof width === "number" ? `${width}px` : width
    const containerClassName = className ? `flex-shrink-0 ${className}` : "flex-shrink-0"
    const contentClassName = innerClassName ?? "relative py-16 px-6"
    const pointerColor = triangleColor ?? "var(--color-background-primary)"
    const pointerLeft =
        triangleOffset === undefined
            ? "24px"
            : typeof triangleOffset === "number"
              ? `${triangleOffset}px`
              : triangleOffset

    return (
        <div className={containerClassName} style={{ width: resolvedWidth }}>
            <div className={contentClassName}>
                {/* Triangle pointer */}
                <div
                    className="absolute -top-2.5 transition-all duration-200 z-10"
                    style={{ left: pointerLeft }}
                >
                    <div
                        className="w-0 h-0"
                        style={{
                            borderLeft: "12px solid transparent",
                            borderRight: "12px solid transparent",
                            borderBottom: `12px solid ${pointerColor}`,
                        }}
                    />
                </div>
                <span className="text-eyebrow-1 text-text-disabled">{label}</span>
            </div>
        </div>
    )
})
