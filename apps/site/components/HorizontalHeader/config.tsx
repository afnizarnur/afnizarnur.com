import type { WidgetConfig } from "./types"
import { SnakeGame } from "./components/SnakeGame"

/**
 * Widget configurations with default positions and content
 * This can be moved to props or a separate config file for reusability
 */
export const WIDGET_CONFIGS: WidgetConfig[] = [
    {
        id: "intro",
        defaultX: 0,
        defaultY: 64,
        width: 598,
        minHeight: 200,
        title: "Intro",
        content: (
            <h1 className="flex-1 justify-start text-text-primary text-heading-1">
                Afnizar works at the intersection of design, code, and strategy. Building things
                that last.
            </h1>
        ),
    },
    {
        id: "bio",
        defaultX: 0,
        defaultY: 424,
        width: 443,
        minHeight: 200,
        title: "Short bio",
        content: (
            <div className="flex-1 justify-start text-text-primary text-subhead-1">
                Designer. Engineer. Cat dad of two. Works where design meets infrastructure.
                Collects diecasts, photographs light, builds minimal tools for complex systems.
            </div>
        ),
    },
    {
        id: "avatar",
        defaultX: 634,
        defaultY: 64,
        width: 420,
        height: 420,
        imageProps: {
            src: "/avatar.png",
            alt: "Afnizar's avatar",
        },
        content: <div />,
    },
    {
        id: "work",
        defaultX: 1090,
        defaultY: 64,
        width: 641,
        minHeight: 200,
        title: "Current Work",
        backgroundColor: "var(--color-background-warning-primary)",
        content: (
            <h2 className="flex-1 text-text-primary text-heading-2">
                Currently part of <span className="font-semibold">INA Digital Edu</span>, designing
                and developing digital learning platforms for{" "}
                <span className="font-semibold">Kementerian Pendidikan Dasar dan Menengah</span>.
            </h2>
        ),
    },
    {
        id: "game_snake",
        defaultX: 1090,
        defaultY: 384,
        width: 443,
        height: 250,
        title: "Play Snake Game",
        noPadding: true,
        content: <SnakeGame />,
    },
]
