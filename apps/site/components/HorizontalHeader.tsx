"use client"

import React from "react"
import { Widget } from "./Widget"

export interface HeaderItem {
    id: string
    label: string
    distance?: number // in meters
}

const SEGMENT_WIDTH = 800 // pixels per segment
const GRID_TEMPLATE = "1fr min(1220px, 100% - 48px) 1fr"

interface SegmentProps {
    label?: string
    width: number
    height: number
}

function Segment({ label, width, height }: SegmentProps): React.ReactElement {
    return (
        <div className="flex-shrink-0" style={{ width: `${width}px` }}>
            <div
                className="flex flex-col py-100 items-center justify-center bg-background-secondary relative"
                style={{ height: `${height}px` }}
            >
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
}

interface FooterSegmentProps {
    label: string
    width: number
}

function FooterSegment({ label, width }: FooterSegmentProps): React.ReactElement {
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
}

export interface HorizontalHeaderProps {
    containerHeight?: number // in pixels
}

export function HorizontalHeader({
    containerHeight = 200,
}: HorizontalHeaderProps): React.ReactElement {
    return (
        <div className="flex flex-col bg-background-primary">
            <div className="overflow-x-auto scrollbar-hide w-full overscroll-none">
                {/* Header section with segments as background */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: GRID_TEMPLATE,
                    }}
                    className="bg-background-secondary relative"
                >
                    {/* Floating widget - Using centered max-width scrolling pattern */}
                    <div
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{
                            display: "grid",
                            gridTemplateColumns: GRID_TEMPLATE,
                        }}
                    >
                        <div
                            className="scrollbar-hide px-6 py-24 pointer-events-auto"
                            style={{ gridColumn: "2" }}
                        >
                            <div className="flex gap-6 items-start">
                                <Widget
                                    title="Intro"
                                    showClose
                                    onClose={() => console.log("Widget closed")}
                                    width={598}
                                >
                                    <h1 className="flex-1 justify-start text-text-primary text-heading-1">
                                        Afnizar works at the intersection of design, code, and
                                        strategy. Building things that last.
                                    </h1>
                                </Widget>
                                <Widget
                                    title="Short bio"
                                    showClose
                                    onClose={() => console.log("Widget closed")}
                                    width={443}
                                >
                                    <div className="flex-1 justify-start text-text-primary text-subhead-1">
                                        Designer. Engineer. Cat dad of two. Works where design meets
                                        infrastructure. Collects diecasts, photographs light, builds
                                        minimal tools for complex systems.
                                    </div>
                                </Widget>
                                <Widget
                                    title="Current Work"
                                    width={641}
                                    backgroundColor="var(--color-background-warning-primary)"
                                    showClose
                                >
                                    <h2 className="flex-1 text-text-primary text-heading-2">
                                        Currently part of{" "}
                                        <span className="font-semibold">INA Digital Edu</span>,
                                        designing and developing digital learning platforms for{" "}
                                        <span className="font-semibold">
                                            Kementerian Pendidikan Dasar dan Menengah
                                        </span>
                                        .
                                    </h2>
                                </Widget>
                                <Widget
                                    showClose
                                    onClose={() => console.log("Image widget closed")}
                                    width={420}
                                    height={420}
                                    backgroundImage="/avatar.png"
                                >
                                    <div />
                                </Widget>
                            </div>
                        </div>
                    </div>

                    {/* Segments as background */}
                    <div className="flex" style={{ gridColumn: "2" }}>
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                        <Segment width={SEGMENT_WIDTH} height={containerHeight} />
                    </div>
                </div>

                {/* Footer section */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: GRID_TEMPLATE,
                    }}
                    className="bg-background-primary"
                >
                    <div className="flex" style={{ gridColumn: "2" }}>
                        <FooterSegment label="Current Location" width={SEGMENT_WIDTH} />
                        <FooterSegment label="50m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="100m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="150m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="200m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="250m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="300m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="350m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="400m" width={SEGMENT_WIDTH} />
                        <FooterSegment label="450m" width={SEGMENT_WIDTH} />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                /* Hide scrollbar but keep scrolling functionality */
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}
