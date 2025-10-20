import type { WidgetConfig } from "./types"

/**
 * Widget configurations with default positions and content
 * This can be moved to props or a separate config file for reusability
 */
export const WIDGET_CONFIGS: WidgetConfig[] = [
    {
        id: "intro",
        defaultX: 24,
        defaultY: 100,
        width: 598,
        minHeight: 200,
        title: "Intro",
        showClose: true,
        content: (
            <h1 className="flex-1 justify-start text-text-primary text-heading-1">
                Afnizar works at the intersection of design, code, and strategy. Building things
                that last.
            </h1>
        ),
    },
    {
        id: "bio",
        defaultX: 24,
        defaultY: 450,
        width: 443,
        minHeight: 200,
        title: "Short bio",
        showClose: true,
        content: (
            <div className="flex-1 justify-start text-text-primary text-subhead-1">
                Designer. Engineer. Cat dad of two. Works where design meets infrastructure.
                Collects diecasts, photographs light, builds minimal tools for complex systems.
            </div>
        ),
    },
    {
        id: "avatar",
        defaultX: 658,
        defaultY: 100,
        width: 420,
        height: 420,
        imageProps: {
            src: "/avatar.png",
            alt: "Afnizar's avatar",
        },
        showClose: true,
        content: <div />,
    },
    {
        id: "work",
        defaultX: 1114,
        defaultY: 100,
        width: 641,
        minHeight: 200,
        title: "Current Work",
        backgroundColor: "var(--color-background-warning-primary)",
        showClose: true,
        content: (
            <h2 className="flex-1 text-text-primary text-heading-2">
                Currently part of <span className="font-semibold">INA Digital Edu</span>, designing
                and developing digital learning platforms for{" "}
                <span className="font-semibold">Kementerian Pendidikan Dasar dan Menengah</span>.
            </h2>
        ),
    },
]
