"use client"

import React from "react"
import { MotionConfig } from "framer-motion"
import { HorizontalHeaderDesktop } from "./HorizontalHeaderDesktop"
import { HorizontalHeaderMobile } from "./HorizontalHeaderMobile"
import { DragProvider } from "./contexts/DragContext"

/**
 * Horizontal header with responsive desktop and mobile variants.
 * Wrapped in MotionConfig to automatically respect reduced motion preferences.
 */
export function HorizontalHeader(): React.ReactElement {
    return (
        <DragProvider>
            <MotionConfig reducedMotion="user">
                <div className="bg-background-primary">
                    <div className="md:hidden">
                        <HorizontalHeaderMobile />
                    </div>
                    <div className="hidden md:block">
                        <HorizontalHeaderDesktop />
                    </div>
                </div>
            </MotionConfig>
        </DragProvider>
    )
}
