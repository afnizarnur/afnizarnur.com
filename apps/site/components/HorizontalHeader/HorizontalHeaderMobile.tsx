"use client"

import React from "react"
import { Widget } from "../Widget"
import { FooterSegment } from "./components"
import { WIDGET_CONFIGS } from "./config"

/**
 * Mobile implementation renders widgets vertically for native scrolling while
 * reusing the shared Widget presentation component.
 */
export function HorizontalHeaderMobile(): React.ReactElement {
    return (
        <div className="flex flex-col bg-background-primary">
            <div className="relative overflow-hidden bg-background-secondary">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-6 w-44"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(-40deg, rgba(0,0,0,0.06) 0 8px, transparent 0 20px)",
                        backgroundRepeat: "repeat-y",
                    }}
                />
                <div className="relative z-10 flex flex-col gap-6 px-6 pt-6 pb-32">
                    {WIDGET_CONFIGS.filter((config) => config.id !== "game_snake").map((config) => (
                        <div key={config.id} className="flex w-full justify-center">
                            <Widget
                                title={config.title}
                                showClose={config.showClose}
                                onClose={() => console.log(`${config.id} closed`)}
                                width="100%"
                                height={config.height ?? "auto"}
                                backgroundColor={config.backgroundColor}
                                backgroundImage={config.backgroundImage}
                                imageProps={config.imageProps}
                                noPadding={config.noPadding}
                            >
                                {config.content}
                            </Widget>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-background-primary px-6">
                <FooterSegment
                    label="Current Location"
                    width="100%"
                    className="relative z-10"
                    innerClassName="relative py-16"
                    triangleOffset="10px"
                />
            </div>
        </div>
    )
}
