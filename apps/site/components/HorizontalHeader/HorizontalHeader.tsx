"use client"

import React from "react"
import { MotionConfig } from "framer-motion"
import { useReducedMotion } from "@/contexts/UserPreferencesContext"
import { HorizontalHeaderDesktop } from "./HorizontalHeaderDesktop"
import { HorizontalHeaderMobile } from "./HorizontalHeaderMobile"

/**
 * Horizontal header with responsive desktop and mobile variants.
 * Wrapped in MotionConfig to automatically respect reduced motion preferences.
 */
export function HorizontalHeader(): React.ReactElement {
    const prefersReducedMotion = useReducedMotion()

    return (
        <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
            <div className="bg-background-primary">
                <div className="md:hidden">
                    <HorizontalHeaderMobile />
                </div>
                <div className="hidden md:block">
                    <HorizontalHeaderDesktop />
                </div>
            </div>
        </MotionConfig>
    )
}
