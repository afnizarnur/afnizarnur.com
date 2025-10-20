import React from "react"

interface FooterSegmentProps {
    label: string
    width: number
}

/**
 * A footer segment with distance label and triangle pointer
 */
export const FooterSegment = React.memo(function FooterSegment({
    label,
    width,
}: FooterSegmentProps): React.ReactElement {
    return (
        <div className="flex-shrink-0" style={{ width: `${width}px` }}>
            <div className="relative py-16 px-6">
                {/* Triangle pointer */}
                <div
                    className="absolute -top-2.5 transition-all duration-200"
                    style={{ left: "24px" }}
                >
                    <div
                        className="w-0 h-0"
                        style={{
                            borderLeft: "12px solid transparent",
                            borderRight: "12px solid transparent",
                            borderBottom: "12px solid var(--color-background-primary)",
                        }}
                    />
                </div>
                <span className="text-eyebrow-1 text-text-disabled">{label}</span>
            </div>
        </div>
    )
})
