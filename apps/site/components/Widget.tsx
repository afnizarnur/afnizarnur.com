"use client"

import React from "react"
import Image from "next/image"
import { X } from "@phosphor-icons/react"
import { TerminalTextEffect } from "./TerminalTextEffect"

export interface WidgetProps {
    title?: string
    showClose?: boolean
    onClose?: () => void
    width?: number | string
    height?: number | string
    backgroundColor?: string
    backgroundImage?: string
    imageProps?: {
        src: string
        alt: string
    }
    noPadding?: boolean
    triggerTitleAnimation?: number
    children: React.ReactNode
}

function isDarkColor(color: string | undefined): boolean {
    if (!color) return false

    // Handle hex colors
    if (color.startsWith("#")) {
        const hex = color.replace("#", "")
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        return luminance < 0.5
    }

    // Handle rgb/rgba
    if (color.startsWith("rgb")) {
        const match = color.match(/\d+/g)
        if (match && match.length >= 3) {
            const r = parseInt(match[0])
            const g = parseInt(match[1])
            const b = parseInt(match[2])
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
            return luminance < 0.5
        }
    }

    return false
}

export function Widget({
    title,
    showClose = false,
    onClose,
    width = 598,
    height = "auto",
    backgroundColor,
    backgroundImage,
    imageProps,
    noPadding = false,
    triggerTitleAnimation,
    children,
}: WidgetProps): React.ReactElement {
    const hasBackgroundImage = !!backgroundImage || !!imageProps
    const isDark = isDarkColor(backgroundColor)
    const containerWidth =
        typeof width === "number" ? width : width === "auto" ? undefined : parseInt(width as string)
    const containerHeight =
        typeof height === "number"
            ? height
            : height === "auto"
              ? undefined
              : parseInt(height as string)

    return (
        <div
            className="bg-background-primary rounded-2xl inline-flex flex-col justify-start items-end flex-none relative overflow-hidden"
            style={{
                width: typeof width === "number" ? `${width}px` : width,
                height: typeof height === "number" ? `${height}px` : height,
                backgroundColor: backgroundColor,
            }}
        >
            {/* Background Image using Next.js Image */}
            {imageProps && containerWidth && containerHeight && (
                <Image
                    src={imageProps.src}
                    alt={imageProps.alt}
                    fill
                    priority
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            )}

            {/* Fallback to CSS background image */}
            {backgroundImage && !imageProps && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            )}

            {/* Widget Header - Always rendered */}
            <div
                className={`self-stretch inline-flex justify-start items-center gap-1 relative z-10 ${
                    hasBackgroundImage ? "px-16 py-12" : "pl-32 pr-16 py-16"
                }`}
            >
                {title && (
                    <div className="flex-1 opacity-50 justify-start text-text-primary text-eyebrow-1 uppercase">
                        <TerminalTextEffect
                            effect="cursor"
                            triggerAnimation={triggerTitleAnimation}
                        >
                            {title.replace(/ /g, "_")}
                        </TerminalTextEffect>
                    </div>
                )}
                {!title && <div className="flex-1" />}
                {showClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className={`w-5 h-5 relative overflow-hidden flex items-center justify-center transition-colors ${
                            hasBackgroundImage || isDark
                                ? "text-white hover:text-gray-200"
                                : "text-icon-tertiary hover:text-icon-secondary"
                        }`}
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Widget Content */}
            {!hasBackgroundImage && !noPadding && (
                <div className="self-stretch px-32 py-32 inline-flex justify-center items-center gap-1">
                    {children}
                </div>
            )}
            {!hasBackgroundImage && noPadding && (
                <div className="self-stretch inline-flex justify-center items-center gap-1">
                    {children}
                </div>
            )}
        </div>
    )
}
