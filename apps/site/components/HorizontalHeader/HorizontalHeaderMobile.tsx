"use client"

import React from "react"
import { Widget } from "../Widget"
import { FooterSegment } from "./components"
import { WIDGET_CONFIGS } from "./config"

/**
 * Mobile implementation with scroll-stacking effect.
 * Cards pin to the top as you scroll, creating a natural stacking animation.
 */
export function HorizontalHeaderMobile(): React.ReactElement {
    const filteredConfigs = WIDGET_CONFIGS.filter((config) => config.id !== "game_snake")

    return (
        <div className="flex flex-col bg-background-primary">
            <div
                className="relative bg-background-secondary"
                role="region"
                aria-label="Content widgets"
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-6 w-44"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(-40deg, rgba(0,0,0,0.06) 0 8px, transparent 0 20px)",
                        backgroundRepeat: "repeat-y",
                    }}
                />
                <div className="relative pb-6">
                    {filteredConfigs.map((config, index) => (
                        <article
                            key={config.id}
                            className="sticky px-6 pt-5 pb-2"
                            style={{
                                top: "var(--navbar-height, 66px)",
                                zIndex: index + 1,
                            }}
                            aria-label={`${config.title || config.id} section`}
                        >
                            <div className="flex w-full justify-center pb-4">
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
                        </article>
                    ))}
                    <div className="h-32" />
                </div>
            </div>
            <div className="bg-background-primary px-6" aria-hidden="true">
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
