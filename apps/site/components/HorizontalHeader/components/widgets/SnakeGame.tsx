"use client"

import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
    useSyncExternalStore,
} from "react"
import { PlayIcon, PauseIcon } from "@phosphor-icons/react/dist/ssr"

interface Position {
    x: number
    y: number
}

type Direction = "up" | "down" | "left" | "right"
type GameState = "menu" | "playing" | "paused" | "gameOver"

interface SnakeGameStateData {
    gameState: GameState
}

const WIDTH = 40
const HEIGHT = 4
const INITIAL_SNAKE: Position[] = [
    { x: 15, y: 1 },
    { x: 14, y: 1 },
    { x: 13, y: 1 },
]
const INITIAL_DIRECTION: Direction = "right"
const BASE_SPEED = 250
const LEVEL_UP = 25

// Global state manager for snake game (singleton pattern)
class SnakeGameStateManager {
    private static instance: SnakeGameStateManager | null = null
    private state: SnakeGameStateData = { gameState: "menu" }
    private listeners = new Set<() => void>()
    private resetCallback: (() => void) | null = null

    static getInstance(): SnakeGameStateManager {
        if (!this.instance) {
            this.instance = new SnakeGameStateManager()
        }
        return this.instance
    }

    subscribe = (listener: () => void): (() => void) => {
        this.listeners.add(listener)
        return () => this.listeners.delete(listener)
    }

    getSnapshot = (): SnakeGameStateData => {
        return this.state
    }

    private notify(): void {
        this.listeners.forEach((listener) => listener())
    }

    setGameState(value: GameState): void {
        if (this.state.gameState !== value) {
            this.state = { ...this.state, gameState: value }
            this.notify()
        }
    }

    setResetCallback(callback: () => void): void {
        this.resetCallback = callback
    }

    performReset(): void {
        if (this.resetCallback) {
            this.resetCallback()
        }
    }
}

function useSnakeGameState() {
    const stateManager = useMemo(() => SnakeGameStateManager.getInstance(), [])
    const state = useSyncExternalStore(
        stateManager.subscribe,
        stateManager.getSnapshot,
        stateManager.getSnapshot
    )
    return { state, stateManager }
}

export function SnakeGame(): React.ReactElement {
    const { stateManager } = useSnakeGameState()
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
    const [food, setFood] = useState<Position>({ x: 20, y: 2 })
    const [score, setScore] = useState<number>(0)
    const [level, setLevel] = useState<number>(1)
    const [gameState, setGameState] = useState<GameState>("menu")
    const [speed, setSpeed] = useState<number>(BASE_SPEED)
    const [incPoints, setIncPoints] = useState<number>(1)

    const directionRef = useRef<Direction>(INITIAL_DIRECTION)
    const directionQueueRef = useRef<Direction[]>([])
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
    const lastSyncedStateRef = useRef<GameState>("menu")

    // Sync internal state with external state manager (one-way, game logic -> actions)
    useEffect(() => {
        // Only update external state if it's different from what we last synced
        if (lastSyncedStateRef.current !== gameState) {
            lastSyncedStateRef.current = gameState
            stateManager.setGameState(gameState)
        }
    }, [gameState, stateManager])

    // Listen to external state changes from action buttons (actions -> game logic)
    useEffect(() => {
        const unsubscribe = stateManager.subscribe(() => {
            const externalGameState = stateManager.getSnapshot().gameState
            // Only update if it's actually different to avoid circular updates
            if (lastSyncedStateRef.current !== externalGameState) {
                lastSyncedStateRef.current = externalGameState
                setGameState(externalGameState)
            }
        })
        return unsubscribe
    }, [stateManager])

    // Generate random food position
    const generateFood = useCallback((currentSnake: Position[]): Position => {
        let newFood: Position
        do {
            newFood = {
                x: Math.floor(Math.random() * WIDTH),
                y: Math.floor(Math.random() * HEIGHT),
            }
        } while (currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
        return newFood
    }, [])

    // Reset game
    const resetGame = useCallback((): void => {
        setSnake(INITIAL_SNAKE)
        directionRef.current = INITIAL_DIRECTION
        directionQueueRef.current = []
        setFood(generateFood(INITIAL_SNAKE))
        setScore(0)
        setLevel(1)
        setSpeed(BASE_SPEED)
        setIncPoints(1)
        setGameState("menu")
    }, [generateFood])

    // Register reset callback with state manager
    useEffect(() => {
        stateManager.setResetCallback(resetGame)
    }, [resetGame, stateManager])

    // Start game
    const startGame = useCallback((): void => {
        if (gameState === "gameOver") {
            resetGame()
        }
        setGameState("playing")
    }, [gameState, resetGame])

    // Pause game
    const pauseGame = useCallback((): void => {
        setGameState((prev) => (prev === "playing" ? "paused" : "playing"))
    }, [])

    // Handle direction change
    const emitDirection = useCallback((dir: Direction): void => {
        const opposite: Record<Direction, Direction> = {
            up: "down",
            down: "up",
            left: "right",
            right: "left",
        }

        const lastDir =
            directionQueueRef.current.length > 0
                ? directionQueueRef.current[directionQueueRef.current.length - 1]
                : directionRef.current

        if (opposite[lastDir] !== dir) {
            directionQueueRef.current.push(dir)
        }
    }, [])

    // Move snake
    const moveSnake = useCallback((): void => {
        // Process queued direction
        if (directionQueueRef.current.length > 0) {
            directionRef.current = directionQueueRef.current.shift()!
        }

        setSnake((prevSnake) => {
            const head = prevSnake[0]
            let newHead: Position

            switch (directionRef.current) {
                case "up":
                    newHead = { x: head.x, y: head.y - 1 }
                    break
                case "down":
                    newHead = { x: head.x, y: head.y + 1 }
                    break
                case "left":
                    newHead = { x: head.x - 1, y: head.y }
                    break
                case "right":
                    newHead = { x: head.x + 1, y: head.y }
                    break
            }

            // Check wall collision
            if (newHead.x < 0 || newHead.x >= WIDTH || newHead.y < 0 || newHead.y >= HEIGHT) {
                setGameState("gameOver")
                return prevSnake
            }

            // Check self collision
            if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
                setGameState("gameOver")
                return prevSnake
            }

            const newSnake = [newHead, ...prevSnake]

            // Check food collision
            if (newHead.x === food.x && newHead.y === food.y) {
                const newScore = score + incPoints
                const newLevel = Math.floor(newScore / LEVEL_UP) + 1

                setScore(newScore)
                setLevel(newLevel)

                // Adjust speed and points based on level
                if (newScore % LEVEL_UP === 0) {
                    if (speed > 100) {
                        setSpeed((prev) => prev - 50)
                    } else if (speed > 50) {
                        setSpeed((prev) => prev - 10)
                    } else {
                        setIncPoints((prev) => prev + 1)
                    }
                }

                setFood(generateFood(newSnake))
                return newSnake
            }

            // Remove tail if no food eaten
            newSnake.pop()
            return newSnake
        })
    }, [food, score, speed, incPoints, generateFood])

    // Handle keyboard input
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent): void => {
            if (gameState === "menu" && (e.key.startsWith("Arrow") || e.key === " ")) {
                e.preventDefault()
                startGame()
                return
            }

            if (gameState === "playing" || gameState === "paused") {
                switch (e.key) {
                    case "ArrowUp":
                        e.preventDefault()
                        if (gameState === "playing") emitDirection("up")
                        break
                    case "ArrowDown":
                        e.preventDefault()
                        if (gameState === "playing") emitDirection("down")
                        break
                    case "ArrowLeft":
                        e.preventDefault()
                        if (gameState === "playing") emitDirection("left")
                        break
                    case "ArrowRight":
                        e.preventDefault()
                        if (gameState === "playing") emitDirection("right")
                        break
                    case " ":
                        e.preventDefault()
                        pauseGame()
                        break
                }
            }

            if (gameState === "gameOver" && (e.key === " " || e.key === "Enter")) {
                e.preventDefault()
                resetGame()
                startGame()
            }
        }

        window.addEventListener("keydown", handleKeyPress)
        return (): void => {
            window.removeEventListener("keydown", handleKeyPress)
        }
    }, [gameState, startGame, pauseGame, resetGame, emitDirection])

    // Game loop
    useEffect(() => {
        if (gameState !== "playing") {
            if (gameLoopRef.current) {
                clearTimeout(gameLoopRef.current)
                gameLoopRef.current = null
            }
            return
        }

        const gameLoop = (): void => {
            moveSnake()
            gameLoopRef.current = setTimeout(gameLoop, speed)
        }

        gameLoopRef.current = setTimeout(gameLoop, speed)

        return (): void => {
            if (gameLoopRef.current) {
                clearTimeout(gameLoopRef.current)
                gameLoopRef.current = null
            }
        }
    }, [gameState, speed, moveSnake])

    // Render ASCII game board
    const renderBoard = useCallback((): string => {
        // Create empty matrix
        const matrix: number[][] = []
        for (let y = 0; y < HEIGHT; y++) {
            matrix.push(new Array(WIDTH).fill(0))
        }

        // Place snake (1 for body)
        snake.forEach((segment) => {
            if (segment.y >= 0 && segment.y < HEIGHT && segment.x >= 0 && segment.x < WIDTH) {
                matrix[segment.y][segment.x] = 1
            }
        })

        // Place food (2 for food)
        if (food.y >= 0 && food.y < HEIGHT && food.x >= 0 && food.x < WIDTH) {
            matrix[food.y][food.x] = 2
        }

        // Convert to ASCII
        const lines = matrix.map((row) =>
            row
                .map((cell) => {
                    if (cell === 2) return "@"
                    if (cell === 1) return "#"
                    return " "
                })
                .join("")
        )

        // Add border
        const topBorder = "+" + "-".repeat(WIDTH) + "+"
        const bottomBorder = "+" + "-".repeat(WIDTH) + "+"

        // Create status line with padding
        const padding = "  "
        const statusText = `Score:${score.toString().padStart(2, " ")} | Level:${level.toString().padStart(2, " ")}`
        const spaceBetween = Math.max(1, WIDTH - statusText.length - padding.length * 2)
        const headerLine = "|" + padding + statusText + " ".repeat(spaceBetween) + padding + "|"
        const headerBorder = "+" + "-".repeat(WIDTH) + "+"

        return [
            topBorder,
            headerLine,
            headerBorder,
            ...lines.map((line) => "|" + line + "|"),
            bottomBorder,
        ].join("\n")
    }, [snake, food, score, level])

    return (
        <pre
            className="font-mono text-text-primary m-0 select-none w-full flex items-center justify-center overflow-hidden"
            style={{
                fontSize: "16px",
                lineHeight: "1.4",
                whiteSpace: "pre",
            }}
        >
            {renderBoard()}
        </pre>
    )
}

// Actions component (rendered in widget header)
export const SnakeGameActions = React.memo(function SnakeGameActions(): React.ReactElement {
    const { state } = useSnakeGameState()
    const { startGame, pauseGame, resetGame } = useSnakeGameHandlers()

    const playLabel = useMemo(() => {
        if (state.gameState === "menu") return "Start game"
        if (state.gameState === "gameOver") return "Restart game"
        return "Resume game"
    }, [state.gameState])

    const pauseLabel = useMemo(() => "Pause game", [])

    return (
        <>
            {state.gameState !== "playing" && (
                <button
                    type="button"
                    onClick={() => {
                        if (state.gameState === "gameOver") {
                            resetGame()
                        }
                        startGame()
                    }}
                    className="relative overflow-hidden flex items-center justify-center transition-colors rounded text-icon-tertiary hover:opacity-50 cursor-pointer"
                    aria-label={playLabel}
                    title={playLabel}
                >
                    <PlayIcon size={20} />
                </button>
            )}
            {state.gameState === "playing" && (
                <button
                    type="button"
                    onClick={pauseGame}
                    className="relative overflow-hidden flex items-center justify-center transition-colors rounded text-icon-tertiary hover:opacity-50 cursor-pointer"
                    aria-label={pauseLabel}
                    title={pauseLabel}
                >
                    <PauseIcon size={20} />
                </button>
            )}
        </>
    )
})

// Hook to handle game actions
function useSnakeGameHandlers() {
    const stateManager = useMemo(() => SnakeGameStateManager.getInstance(), [])

    const startGame = useCallback(() => {
        const currentState = stateManager.getSnapshot()
        if (currentState.gameState === "gameOver") {
            stateManager.performReset()
        }
        stateManager.setGameState("playing")
    }, [stateManager])

    const pauseGame = useCallback(() => {
        const currentState = stateManager.getSnapshot()
        stateManager.setGameState(currentState.gameState === "playing" ? "paused" : "playing")
    }, [stateManager])

    const resetGame = useCallback(() => {
        stateManager.performReset()
        stateManager.setGameState("menu")
    }, [stateManager])

    return { startGame, pauseGame, resetGame }
}
