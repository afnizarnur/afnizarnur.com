"use client"

import React from "react"
import { HorizontalHeaderDesktop } from "./HorizontalHeaderDesktop"
import { HorizontalHeaderMobile } from "./HorizontalHeaderMobile"

/**
 * Horizontal header with responsive desktop and mobile variants.
 */
export function HorizontalHeader(): React.ReactElement {
    return (
        <div className="bg-background-primary">
            <div className="md:hidden">
                <HorizontalHeaderMobile />
            </div>
            <div className="hidden md:block">
                <HorizontalHeaderDesktop />
            </div>
        </div>
    )
}
