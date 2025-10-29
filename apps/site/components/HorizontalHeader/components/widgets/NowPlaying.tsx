"use client"

import { GameController, SpotifyLogo } from "@phosphor-icons/react/dist/ssr"
import { motion } from "framer-motion"
import Image from "next/image"
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"
import { useReducedMotion } from "@/contexts/UserPreferencesContext"
import { STORAGE_KEYS } from "@/lib/storage"
import { TerminalTextEffect } from "../../../TerminalTextEffect"
import { parseStorageData, writeStorageData } from "../../utils"

type ContentType = "spotify" | "games"

interface NowPlayingData {
  isPlaying: boolean
  title: string
  artist: string
  albumArt?: string
  songUrl?: string
}

interface CachedNowPlayingData extends NowPlayingData {
  timestamp: number
}

interface GameData {
  name: string
  playtime: string
  icon?: string
}

interface NowPlayingProps {
  title?: string
  artist?: string
  albumArt?: string
  isPlaying?: boolean
}

interface Bar {
  chars: string[]
  height: number
}

const LETTERS_AND_SYMBOLS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "-",
  "_",
  "+",
  "=",
  ";",
  ":",
  "<",
  ">",
  ",",
] as const

const BAR_COUNT = 12
const UPDATE_INTERVAL = 150
const MIN_HEIGHT = 20
const MAX_HEIGHT = 80
const CHARS_PER_HEIGHT = 6
const CACHE_EXPIRY_MS = 10 * 60 * 1000 // 10 minutes

const MusicWaveVisualizer = React.memo(function MusicWaveVisualizer({
  isLoading = false,
}: {
  isLoading?: boolean
}): React.ReactElement {
  const [isMounted, setIsMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const generateBars = useCallback((): Bar[] => {
    return Array.from({ length: BAR_COUNT }, () => {
      const height = Math.random() * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT
      const charCount = Math.ceil((height / 100) * CHARS_PER_HEIGHT)
      return {
        chars: Array.from(
          { length: charCount },
          () =>
            LETTERS_AND_SYMBOLS[
              Math.floor(Math.random() * LETTERS_AND_SYMBOLS.length)
            ]
        ),
        height,
      }
    })
  }, [])

  const [bars, setBars] = useState<Bar[]>(generateBars())

  useEffect(() => {
    setIsMounted(true)
    setBars(generateBars())
  }, [generateBars])

  useEffect(() => {
    // Only set interval if motion is not reduced
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setBars(generateBars())
    }, UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [generateBars, prefersReducedMotion])

  return (
    <div
      className="flex items-end gap-2 h-64 min-w-[160px]"
      role="img"
      aria-label="Music visualizer animation"
    >
      {isMounted &&
        bars.map((bar, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Visualizer bars have stable order
            key={i}
            className={`w-24 md:w-12 flex flex-col items-center justify-end font-mono text-text-primary text-[12px] overflow-hidden${
              prefersReducedMotion ? "" : " transition-all duration-150"
            }`}
            style={{
              height: `${bar.height}%`,
              opacity: isLoading ? 0.3 : 1,
            }}
            aria-hidden="true"
          >
            {bar.chars.map((char, j) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Characters have stable order within bar
              <span key={`${i}-${j}`}>{char}</span>
            ))}
          </div>
        ))}
    </div>
  )
})

const GAME_UPDATE_INTERVAL = 80
const JET_MOVE_SPEED = 1.5
const BULLET_SPEED = 4
const ASTEROID_SPEED_MIN = 0.8
const ASTEROID_SPEED_MAX = 2
const FIRE_INTERVAL = 400 // Fire every 400ms
const ASTEROID_COUNT = 8
const COLLISION_DISTANCE = 8 // Distance threshold for collision detection
const EXPLOSION_FRAMES = 3

// Plane shapes - different for left/right direction
const PLANE_SHAPE_RIGHT = ">-<"
const PLANE_SHAPE_LEFT = ">-<"
const EXPLOSION_CHARS = ["*", "+", "x", "·"]

interface JetPlane {
  x: number
  y: number
  direction: 1 | -1 // 1 = right, -1 = left
}

interface Bullet {
  x: number
  y: number
  id: number
}

interface Asteroid {
  char: string
  x: number
  y: number
  speed: number
  id: number
  size: "small" | "medium" | "large"
}

interface Explosion {
  x: number
  y: number
  id: number
  frame: number
}

const GameVisualizer = React.memo(
  function GameVisualizer(): React.ReactElement {
    const [isMounted, setIsMounted] = useState(false)
    const prefersReducedMotion = useReducedMotion()
    const bulletIdRef = React.useRef(0)
    const asteroidIdRef = React.useRef(0)
    const explosionIdRef = React.useRef(0)
    const lastFireTimeRef = React.useRef(0)

    const getAsteroidSize = useCallback((): "small" | "medium" | "large" => {
      const rand = Math.random()
      if (rand < 0.5) return "small"
      if (rand < 0.8) return "medium"
      return "large"
    }, [])

    const getAsteroidChars = useCallback(
      (size: "small" | "medium" | "large"): string => {
        const char =
          LETTERS_AND_SYMBOLS[
            Math.floor(Math.random() * LETTERS_AND_SYMBOLS.length)
          ]
        if (size === "small") return char
        if (size === "medium") return char + char
        return char + char + char
      },
      []
    )

    const generateAsteroid = useCallback((): Asteroid => {
      const size = getAsteroidSize()
      return {
        char: getAsteroidChars(size),
        x: Math.random() * 100,
        y: -5,
        speed:
          Math.random() * (ASTEROID_SPEED_MAX - ASTEROID_SPEED_MIN) +
          ASTEROID_SPEED_MIN,
        id: asteroidIdRef.current++,
        size,
      }
    }, [getAsteroidChars, getAsteroidSize])

    const [jet, setJet] = useState<JetPlane>({
      x: 50,
      y: 85, // Near bottom
      direction: 1,
    })

    const [bullets, setBullets] = useState<Bullet[]>([])
    const [explosions, setExplosions] = useState<Explosion[]>([])
    const [asteroids, setAsteroids] = useState<Asteroid[]>(() =>
      Array.from({ length: ASTEROID_COUNT }, () => {
        const size = getAsteroidSize()
        return {
          char: getAsteroidChars(size),
          x: Math.random() * 100,
          y: Math.random() * 70,
          speed:
            Math.random() * (ASTEROID_SPEED_MAX - ASTEROID_SPEED_MIN) +
            ASTEROID_SPEED_MIN,
          id: asteroidIdRef.current++,
          size,
        }
      })
    )

    useEffect(() => {
      setIsMounted(true)
    }, [])

    useEffect(() => {
      if (prefersReducedMotion) return

      const interval = setInterval(() => {
        const currentTime = Date.now()

        // Update jet position and direction
        setJet((prev) => {
          let newX = prev.x + prev.direction * JET_MOVE_SPEED
          let newDirection = prev.direction

          // Change direction at boundaries
          if (newX <= 15) {
            newX = 15
            newDirection = 1
          } else if (newX >= 85) {
            newX = 85
            newDirection = -1
          }

          return {
            ...prev,
            x: newX,
            direction: newDirection,
          }
        })

        // Fire bullets periodically
        if (currentTime - lastFireTimeRef.current > FIRE_INTERVAL) {
          lastFireTimeRef.current = currentTime
          setJet((prev) => {
            setBullets((prevBullets) => [
              ...prevBullets,
              {
                x: prev.x,
                y: prev.y - 5,
                id: bulletIdRef.current++,
              },
            ])
            return prev
          })
        }

        // Collision detection and update
        setBullets((prevBullets) => {
          const survivingBullets: Bullet[] = []
          const hitAsteroidIds: number[] = []

          for (const bullet of prevBullets) {
            let hit = false

            setAsteroids((prevAsteroids) => {
              const survivingAsteroids: Asteroid[] = []

              for (const asteroid of prevAsteroids) {
                const distance = Math.sqrt(
                  (bullet.x - asteroid.x) ** 2 + (bullet.y - asteroid.y) ** 2
                )

                if (
                  distance < COLLISION_DISTANCE &&
                  !hitAsteroidIds.includes(asteroid.id)
                ) {
                  // Collision detected!
                  hit = true
                  hitAsteroidIds.push(asteroid.id)

                  // Create explosion
                  setExplosions((prev) => [
                    ...prev,
                    {
                      x: asteroid.x,
                      y: asteroid.y,
                      id: explosionIdRef.current++,
                      frame: 0,
                    },
                  ])
                } else {
                  survivingAsteroids.push(asteroid)
                }
              }

              return survivingAsteroids
            })

            if (!hit) {
              survivingBullets.push(bullet)
            }
          }

          return survivingBullets
            .map((bullet) => ({
              ...bullet,
              y: bullet.y - BULLET_SPEED,
            }))
            .filter((bullet) => bullet.y > -5)
        })

        // Update asteroids position and respawn
        setAsteroids((prevAsteroids) => {
          const updated = prevAsteroids.map((asteroid) => ({
            ...asteroid,
            y: asteroid.y + asteroid.speed,
          }))

          // Respawn asteroids that went off screen or replace destroyed ones
          while (updated.length < ASTEROID_COUNT) {
            updated.push(generateAsteroid())
          }

          return updated
            .map((asteroid) => {
              if (asteroid.y > 105) {
                return generateAsteroid()
              }
              return asteroid
            })
            .slice(0, ASTEROID_COUNT)
        })

        // Update explosions
        setExplosions((prevExplosions) =>
          prevExplosions
            .map((explosion) => ({
              ...explosion,
              frame: explosion.frame + 1,
            }))
            .filter((explosion) => explosion.frame < EXPLOSION_FRAMES)
        )
      }, GAME_UPDATE_INTERVAL)

      return () => clearInterval(interval)
    }, [prefersReducedMotion, generateAsteroid])

    return (
      <div
        className="relative h-64 min-w-[160px] overflow-hidden"
        role="img"
        aria-label="Game visualizer animation"
      >
        {isMounted && (
          <>
            {/* Jet Plane */}
            <div
              className={`absolute font-mono text-[12px] text-text-primary whitespace-pre${
                prefersReducedMotion ? "" : " transition-all duration-80"
              }`}
              style={{
                left: `${jet.x}%`,
                top: `${jet.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              aria-hidden="true"
            >
              {jet.direction === 1 ? PLANE_SHAPE_RIGHT : PLANE_SHAPE_LEFT}
            </div>

            {/* Bullets */}
            {bullets.map((bullet) => (
              <div
                key={bullet.id}
                className={`absolute font-mono text-[12px] text-text-primary${
                  prefersReducedMotion ? "" : " transition-all duration-80"
                }`}
                style={{
                  left: `${bullet.x}%`,
                  top: `${bullet.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                aria-hidden="true"
              >
                |
              </div>
            ))}

            {/* Asteroids */}
            {asteroids.map((asteroid) => (
              <div
                key={asteroid.id}
                className={`absolute font-mono whitespace-pre${
                  asteroid.size === "large"
                    ? " text-[14px]"
                    : asteroid.size === "medium"
                    ? " text-[12px]"
                    : " text-[10px]"
                } text-text-tertiary${
                  prefersReducedMotion ? "" : " transition-all duration-80"
                }`}
                style={{
                  left: `${asteroid.x}%`,
                  top: `${asteroid.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                aria-hidden="true"
              >
                {asteroid.char}
              </div>
            ))}

            {/* Explosions */}
            {explosions.map((explosion) => (
              <div
                key={explosion.id}
                className="absolute font-mono text-[14px] text-text-primary"
                style={{
                  left: `${explosion.x}%`,
                  top: `${explosion.y}%`,
                  transform: "translate(-50%, -50%)",
                  opacity: 1 - explosion.frame / EXPLOSION_FRAMES,
                }}
                aria-hidden="true"
              >
                {EXPLOSION_CHARS[explosion.frame % EXPLOSION_CHARS.length]}
              </div>
            ))}
          </>
        )}
      </div>
    )
  }
)

/**
 * Fetches now playing data from the API
 */
async function fetchNowPlaying(): Promise<NowPlayingData> {
  const response = await fetch("/api/spotify/now-playing")
  if (!response.ok) {
    throw new Error("Failed to fetch now playing")
  }
  return response.json()
}

// Mock game data for UI implementation
const MOCK_GAMES: GameData[] = [
  {
    name: "Elden Ring",
    playtime: "Last played 2 hours ago",
  },
  {
    name: "Baldur's Gate 3",
    playtime: "Last played 5 hours ago",
  },
  {
    name: "Cyberpunk 2077",
    playtime: "Last played yesterday",
  },
]

// Shared state for NowPlaying widget
const nowPlayingState = {
  contentType: "spotify" as ContentType,
  animationTrigger: 0,
  listeners: new Set<
    (state: { contentType: ContentType; animationTrigger: number }) => void
  >(),

  getState() {
    return {
      contentType: this.contentType,
      animationTrigger: this.animationTrigger,
    }
  },

  setContentType(type: ContentType) {
    if (type !== this.contentType) {
      this.contentType = type
      this.animationTrigger++
      this.notify()
    }
  },

  subscribe(
    listener: (state: {
      contentType: ContentType
      animationTrigger: number
    }) => void
  ) {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  },

  notify() {
    this.listeners.forEach((listener) => listener(this.getState()))
  },
}

/**
 * Hook to use shared NowPlaying state
 */
function useNowPlayingState() {
  const [state, setState] = useState(nowPlayingState.getState())

  useEffect(() => {
    return nowPlayingState.subscribe(setState)
  }, [])

  const handleSwitch = useCallback((type: ContentType) => {
    nowPlayingState.setContentType(type)
  }, [])

  return {
    contentType: state.contentType,
    animationTrigger: state.animationTrigger,
    handleSwitch,
  }
}

/**
 * Dynamic title component that changes based on content type
 */
export const NowPlayingTitle = React.memo(
  function NowPlayingTitle(): React.ReactElement {
    const { contentType } = useNowPlayingState()
    const title = contentType === "spotify" ? "Now_Playing" : "Now_Gaming"

    return <>{title}</>
  }
)

/**
 * Action buttons for switching between Spotify and Games content
 */
export const NowPlayingActions = React.memo(
  function NowPlayingActions(): React.ReactElement {
    const { contentType, handleSwitch } = useNowPlayingState()
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
      </>
    )
  }
)

export function NowPlaying({
  title: defaultTitle,
  artist: defaultArtist,
  albumArt: defaultAlbumArt,
  isPlaying: defaultIsPlaying,
}: NowPlayingProps = {}): React.ReactElement {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentGameIndex] = useState(0)

  // Use shared state for content switching
  const { contentType, animationTrigger } = useNowPlayingState()

  // Load cached data immediately on mount (before first paint)
  useLayoutEffect(() => {
    const cached = parseStorageData<CachedNowPlayingData | null>(
      STORAGE_KEYS.nowPlaying,
      null
    )
    if (cached) {
      const isCacheValid = Date.now() - cached.timestamp < CACHE_EXPIRY_MS
      if (isCacheValid) {
        setNowPlaying(cached)
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    async function loadNowPlaying(): Promise<void> {
      try {
        const data = await fetchNowPlaying()
        if (isMounted) {
          setNowPlaying(data)
          setIsLoading(false)
          // Cache the data with timestamp
          const cachedData: CachedNowPlayingData = {
            ...data,
            timestamp: Date.now(),
          }
          writeStorageData(STORAGE_KEYS.nowPlaying, cachedData)
        }
      } catch (error) {
        console.error("Failed to fetch now playing:", error)
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadNowPlaying()

    // Poll for updates every 5 minutes
    const interval = setInterval(loadNowPlaying, 5 * 60 * 1000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  // Use fetched data or fallback to props/defaults
  const title = nowPlaying?.title ?? defaultTitle ?? "On a Cherry Blossom Night"
  const artist = nowPlaying?.artist ?? defaultArtist ?? "Aimyon"
  const albumArt = nowPlaying?.albumArt ?? defaultAlbumArt
  const isPlaying = nowPlaying?.isPlaying ?? defaultIsPlaying ?? true

  // Get current game data
  const currentGame = MOCK_GAMES[currentGameIndex]

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
      aria-label="Now playing"
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
                {contentType === "games" && <GameController size={24} />}
              </div>
            )}
          </div>

          {/* Track Info / Game Info */}
          <div className="grid gap-8 min-w-0">
            <h3
              className="text-text-primary text-base font-normal leading-tight truncate"
              title={displayTitle}
              style={{
                opacity: isLoading && contentType === "spotify" ? 0.5 : 1,
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
                opacity: isLoading && contentType === "spotify" ? 0.5 : 1,
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
