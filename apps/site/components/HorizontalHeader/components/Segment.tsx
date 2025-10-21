import React from "react"

interface SegmentProps {
    label?: string
    width: number
}

/**
 * A single segment in the horizontal header background
 */
export const Segment = React.memo(function Segment({
    label,
    width,
}: SegmentProps): React.ReactElement {
    return (
        <div className="flex-shrink-0" style={{ width: `${width}px` }}>
            <div className="flex flex-col py-64 md:py-80 lg:py-90 items-center justify-center bg-background-secondary relative h-full">
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
