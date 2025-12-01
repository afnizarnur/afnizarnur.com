import { GameController, SpotifyLogo } from "@phosphor-icons/react/dist/ssr"
import { motion } from "framer-motion"
import React from "react"
import { useCurrentActivityState } from "./hooks/useCurrentActivityState"
import { usePSNData } from "./hooks/usePSNData"

/**
 * Action buttons for switching between Spotify and Games content
 */
export const CurrentActivityActions = React.memo(
    function CurrentActivityActions(): React.ReactElement {
        const { contentType, handleSwitch } = useCurrentActivityState()
        const { hasError: hasPSNError } = usePSNData()
        const spotifyWeight = contentType === "spotify" ? "fill" : "regular"
        const gamesWeight = contentType === "games" ? "fill" : "regular"

        return (
            <>
                <motion.button
                    type="button"
                    onClick={() => handleSwitch("spotify")}
                    className="relative overflow-hidden flex items-center justify-center transition-colors rounded text-icon-tertiary hover:opacity-50 cursor-pointer"
                    aria-label="Show Spotify content"
                    title="Show Spotify content"
                    animate={{ scale: 1 }}
                >
                    <SpotifyLogo size={20} weight={spotifyWeight} />
                </motion.button>

                {!hasPSNError && (
                    <motion.button
                        type="button"
                        onClick={() => handleSwitch("games")}
                        className="relative overflow-hidden flex items-center justify-center transition-colors rounded text-icon-tertiary hover:opacity-50 cursor-pointer"
                        aria-label="Show games content"
                        title="Show games content"
                        animate={{ scale: 1 }}
                    >
                        <GameController size={20} weight={gamesWeight} />
                    </motion.button>
                )}
            </>
        )
    }
)
