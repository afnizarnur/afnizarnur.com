"use client"

import { X } from "@phosphor-icons/react"
import Image from "next/image"
import type React from "react"

export interface WidgetProps {
    title?: string | React.ReactNode
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
    customActions?: React.ReactNode
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
            const r = parseInt(match[0], 10)
            const g = parseInt(match[1], 10)
            const b = parseInt(match[2], 10)
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
    customActions,
    children,
}: WidgetProps): React.ReactElement {
    const hasBackgroundImage = !!backgroundImage || !!imageProps
    const isDark = isDarkColor(backgroundColor)
    const containerWidth =
        typeof width === "number"
            ? width
            : width === "auto"
              ? undefined
              : parseInt(width as string, 10)
    const containerHeight =
        typeof height === "number"
            ? height
            : height === "auto"
              ? undefined
              : parseInt(height as string, 10)

    return (
        <article
            className="bg-background-primary rounded-2xl inline-flex flex-col justify-start items-end flex-none relative overflow-hidden"
            style={{
                width: typeof width === "number" ? `${width}px` : width,
                height: typeof height === "number" ? `${height}px` : height,
                backgroundColor: backgroundColor,
            }}
            aria-label={title ? `${title} widget` : undefined}
        >
            {/* Background Image using Next.js Image */}
            {imageProps && containerWidth && containerHeight && (
                <Image
                    src={imageProps.src}
                    alt={imageProps.alt}
                    fill
                    priority
                    draggable={false}
                    className="object-cover pointer-events-none select-none"
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

            {/* Widget Header - Only render if there's a title, close button, or custom actions */}
            {(title || showClose || customActions) && (
                <div
                    className={`self-stretch inline-flex justify-start items-center gap-1 relative z-10 ${
                        hasBackgroundImage ? "pr-20 pl-24 py-16" : "pl-24 md:pl-24 pr-24 py-16"
                    }`}
                >
                    {title && (
                        <p className="flex-1 opacity-50 justify-start text-text-primary text-eyebrow-1 uppercase">
                            {typeof title === "string" ? title.replace(/ /g, "_") : title}
                        </p>
                    )}
                    {!title && <div className="flex-1" />}
                    {customActions && (
                        <div className="flex items-center gap-8">{customActions}</div>
                    )}
                    {showClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className={`w-5 h-5 relative overflow-hidden flex items-center justify-center transition-colors rounded ${
                                hasBackgroundImage || isDark
                                    ? "text-white hover:text-gray-200"
                                    : "text-icon-tertiary hover:text-icon-secondary"
                            }`}
                            aria-label={`Close ${title || "widget"}`}
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>
            )}

            {/* Widget Content */}
            {!noPadding && (
                <div className="self-stretch px-24 md:px-24 py-24 inline-flex justify-center items-center gap-1 relative z-10">
                    {children}
                </div>
            )}
            {noPadding && (
                <div className="self-stretch inline-flex justify-center items-center gap-1 relative z-10 h-full">
                    {children}
                </div>
            )}
        </article>
    )
}
