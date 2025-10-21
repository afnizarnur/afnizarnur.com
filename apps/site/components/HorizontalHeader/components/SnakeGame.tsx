"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"

interface Position {
    x: number
    y: number
}

type Direction = "up" | "down" | "left" | "right"
type GameState = "menu" | "playing" | "paused" | "gameOver"

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

export function SnakeGame(): React.ReactElement {
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

        // Get button text for bottom
        let buttonText = ""
        if (gameState === "menu") {
            buttonText = "[SPACE] Start"
        } else if (gameState === "playing") {
            buttonText = "[SPACE] Pause"
        } else if (gameState === "paused") {
            buttonText = "[SPACE] Resume"
        } else if (gameState === "gameOver") {
            buttonText = "[SPACE] Restart"
        }

        // Combine status and button on one line with padding
        const padding = "  "
        const statusText = `Score:${score.toString().padStart(2, " ")} | Level:${level.toString().padStart(2, " ")}`
        const combinedLength = statusText.length + buttonText.length + padding.length * 2
        const spaceBetween = Math.max(1, WIDTH - combinedLength)
        const headerLine =
            "|" + padding + statusText + " ".repeat(spaceBetween) + buttonText + padding + "|"
        const headerBorder = "+" + "-".repeat(WIDTH) + "+"

        return [
            topBorder,
            headerLine,
            headerBorder,
            ...lines.map((line) => "|" + line + "|"),
            bottomBorder,
        ].join("\n")
    }, [snake, food, score, level, gameState])

    return (
        <div className="flex flex-col items-center justify-between w-full h-full overflow-hidden gap-2 p-2">
            <pre
                className="font-mono text-text-secondary m-0 select-none flex-1 w-full flex items-center justify-center overflow-hidden"
                style={{
                    fontSize: "16px",
                    lineHeight: "1.4",
                    whiteSpace: "pre",
                }}
            >
                {renderBoard()}
            </pre>
        </div>
    )
}
