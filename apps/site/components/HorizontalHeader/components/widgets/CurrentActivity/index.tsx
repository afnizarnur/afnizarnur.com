"use client"

import Image from "next/image"
import type React from "react"
import { useMemo, useState } from "react"
import { TerminalTextEffect } from "@/components/TerminalTextEffect"
import { MOCK_GAMES } from "./constants"
import { useCurrentActivityState } from "./hooks/useCurrentActivityState"
import { usePSNData } from "./hooks/usePSNData"
import { useSpotifyData } from "./hooks/useSpotifyData"
import type { CurrentActivityProps } from "./types"
import { GameVisualizer } from "./visualizers/GameVisualizer"
import { MusicWaveVisualizer } from "./visualizers/MusicWaveVisualizer"
import { ImageIcon } from "@phosphor-icons/react"

export { CurrentActivityActions } from "./CurrentActivityActions"
export { CurrentActivityTitle } from "./CurrentActivityTitle"

export function CurrentActivity({
  title: defaultTitle,
  artist: defaultArtist,
  albumArt: defaultAlbumArt,
  isPlaying: defaultIsPlaying,
}: CurrentActivityProps = {}): React.ReactElement {
  const [currentGameIndex] = useState(0)

  // Use shared state for content switching
  const { contentType, animationTrigger } = useCurrentActivityState()

  // Fetch Spotify data
  const { nowPlaying, isLoading } = useSpotifyData()

  // Fetch PSN data
  const { recentGame, isLoading: isPSNLoading } = usePSNData()

  // Use fetched data or fallback to props/defaults
  const title = nowPlaying?.title ?? defaultTitle ?? "On a Cherry Blossom Night"
  const artist = nowPlaying?.artist ?? defaultArtist ?? "Aimyon"
  const albumArt = nowPlaying?.albumArt ?? defaultAlbumArt
  const isPlaying = nowPlaying?.isPlaying ?? defaultIsPlaying ?? true

  // Get current game data - use PSN data if available, otherwise fallback to mock
  const currentGame = recentGame ?? MOCK_GAMES[currentGameIndex]

  // Determine display content based on type
  const displayTitle = contentType === "spotify" ? title : currentGame.name
  const displaySubtitle =
    contentType === "spotify" ? artist : currentGame.playtime
  const displayImage = contentType === "spotify" ? albumArt : currentGame.icon

  const albumArtAlt = useMemo(
    () => `${title} by ${artist} album art`,
    [title, artist]
  )

  return (
    <article
      className="w-full px-24 md:px-24 pb-24 pt-0"
      aria-label="Current activity"
    >
      <div className="flex flex-col gap-16">
        {/* Content container - album art + track info */}
        <div className="grid grid-cols-[44px_minmax(0,1fr)] md:grid-cols-[44px_minmax(0,1fr)_auto] gap-16 items-center min-h-[68px]">
          {/* Album Art / Game Icon */}
          <div
            className="w-44 h-44 rounded-lg overflow-hidden bg-background-secondary flex-shrink-0 relative"
            role="img"
            aria-label={
              displayImage
                ? contentType === "spotify"
                  ? albumArtAlt
                  : `${currentGame.name} icon`
                : "No image"
            }
          >
            {displayImage ? (
              <Image
                src={displayImage}
                alt=""
                fill
                className="object-cover"
                sizes="44px"
                unoptimized
              />
            ) : (
              <div
                className="w-full h-full grid place-items-center text-text-disabled text-xs"
                aria-hidden="true"
              >
                <ImageIcon size={24} />
              </div>
            )}
          </div>

          {/* Track Info / Game Info */}
          <div className="grid gap-8 min-w-0">
            <h3
              className="text-text-primary text-base font-normal leading-tight truncate"
              title={displayTitle}
              style={{
                opacity:
                  (isLoading && contentType === "spotify") ||
                  (isPSNLoading && contentType === "games")
                    ? 0.5
                    : 1,
              }}
            >
              <TerminalTextEffect
                triggerAnimation={animationTrigger}
                effect="cursor"
              >
                {displayTitle}
              </TerminalTextEffect>
            </h3>
            <p
              className="text-text-secondary text-eyebrow-2 truncate"
              title={displaySubtitle}
              style={{
                opacity:
                  (isLoading && contentType === "spotify") ||
                  (isPSNLoading && contentType === "games")
                    ? 0.5
                    : 1,
              }}
            >
              <TerminalTextEffect
                triggerAnimation={animationTrigger}
                effect="cursor"
              >
                {displaySubtitle}
              </TerminalTextEffect>
            </p>
          </div>

          {/* Visualizer - desktop */}
          <div
            className="hidden md:flex flex-shrink-0"
            aria-live="polite"
            aria-atomic="true"
          >
            {contentType === "spotify" && isPlaying ? (
              <MusicWaveVisualizer isLoading={isLoading} />
            ) : contentType === "games" ? (
              <GameVisualizer />
            ) : (
              <div className="h-64 min-w-[160px]" />
            )}
          </div>
        </div>

        {/* Visualizer - mobile */}
        <div
          className="flex md:hidden justify-center flex-shrink-0"
          aria-live="polite"
          aria-atomic="true"
        >
          {contentType === "spotify" && isPlaying ? (
            <MusicWaveVisualizer isLoading={isLoading} />
          ) : contentType === "games" ? (
            <GameVisualizer />
          ) : (
            <div className="h-64 min-w-[160px]" />
          )}
        </div>
      </div>
    </article>
  )
}
