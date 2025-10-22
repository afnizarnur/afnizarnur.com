import React from "react"
import { SEGMENT_WIDTH } from "../constants"

interface SegmentProps {
    label?: string
    width?: number | string
}

/**
 * A single segment in the horizontal header background
 */
export const Segment = React.memo(function Segment({
    label,
    width = SEGMENT_WIDTH,
}: SegmentProps): React.ReactElement {
    const resolvedWidth = typeof width === "number" ? `${width}px` : width

    return (
        <div className="flex-shrink-0" style={{ width: resolvedWidth }}>
            <div className="flex flex-col py-86 md:pt-86 lg:py-86 items-center justify-center bg-background-secondary relative h-full">
                <div
                    className="absolute inset-y-0 left-24 overflow-hidden"
                    style={{
                        width: "24px",
                        backgroundImage:
                            "repeating-linear-gradient(-40deg, rgba(0,0,0,0.06) 0 8px, transparent 0px 20px)",
                        backgroundRepeat: "repeat-y",
                    }}
                />

                {/* Content on top, fill the whole segment */}
                {label && (
                    <div className="relative z-10 flex flex-col items-center justify-center bg-background-secondary h-full">
                        <span className="text-sm font-medium text-text-primary truncate px-2">
                            {label}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
})
