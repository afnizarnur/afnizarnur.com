import type { GameData } from "./types"

export const LETTERS_AND_SYMBOLS = [
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

// Music Wave Visualizer Constants
export const BAR_COUNT = 12
export const UPDATE_INTERVAL = 150
export const MIN_HEIGHT = 20
export const MAX_HEIGHT = 80
export const CHARS_PER_HEIGHT = 6

// Game Visualizer Constants
export const GAME_UPDATE_INTERVAL = 80
export const JET_MOVE_SPEED = 1.5
export const BULLET_SPEED = 4
export const ASTEROID_SPEED_MIN = 0.8
export const ASTEROID_SPEED_MAX = 2
export const FIRE_INTERVAL = 400 // Fire every 400ms
export const ASTEROID_COUNT = 8
export const COLLISION_DISTANCE = 8 // Distance threshold for collision detection
export const EXPLOSION_FRAMES = 3

// Plane shapes - different for left/right direction
export const PLANE_SHAPE_RIGHT = ">-<"
export const PLANE_SHAPE_LEFT = ">-<"
export const EXPLOSION_CHARS = ["*", "+", "x", "·"]

// Caching
export const CACHE_EXPIRY_MS = 10 * 60 * 1000 // 10 minutes

// Mock game data for UI implementation
export const MOCK_GAMES: GameData[] = [
    {
        name: "Elden Ring",
        playtime: "2 hrs ago",
    },
    {
        name: "Baldur's Gate 3",
        playtime: "5 hrs ago",
    },
    {
        name: "Cyberpunk 2077",
        playtime: "yesterday",
    },
]
