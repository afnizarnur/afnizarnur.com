import React from "react"
import { X } from "phosphor-react"

export interface WidgetProps {
    title?: string
    showClose?: boolean
    onClose?: () => void
    width?: number | string
    height?: number | string
    backgroundColor?: string
    backgroundImage?: string
    children: React.ReactNode
}

export function Widget({
    title,
    showClose = false,
    onClose,
    width = 598,
    height = "auto",
    backgroundColor,
    backgroundImage,
    children,
}: WidgetProps): React.ReactElement {
    return (
        <div
            className="bg-background-primary rounded-2xl inline-flex flex-col justify-start items-end overflow-hidden"
            style={{
                width: typeof width === "number" ? `${width}px` : width,
                height: typeof height === "number" ? `${height}px` : height,
                backgroundColor: backgroundColor,
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            }}
        >
            {/* Widget Header - Always rendered */}
            <div className="self-stretch px-32 py-16 inline-flex justify-start items-center gap-1">
                {title && (
                    <div className="flex-1 opacity-50 justify-start text-text-primary text-eyebrow-1 uppercase">
                        {title}
                    </div>
                )}
                {!title && <div className="flex-1" />}
                {showClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-5 h-5 relative overflow-hidden flex items-center justify-center text-icon-tertiary hover:text-icon-secondary transition-colors"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Widget Content */}
            <div className="self-stretch px-32 py-32 inline-flex justify-center items-center gap-1">
                {children}
            </div>
        </div>
    )
}
