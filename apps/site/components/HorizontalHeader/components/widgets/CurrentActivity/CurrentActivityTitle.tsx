import React from "react"
import { useCurrentActivityState } from "./hooks/useCurrentActivityState"

/**
 * Dynamic title component that changes based on content type
 */
export const CurrentActivityTitle = React.memo(function CurrentActivityTitle(): React.ReactElement {
    const { contentType } = useCurrentActivityState()
    const title = contentType === "spotify" ? "Now_Playing" : "Now_Gaming"

    return <>{title}</>
})
