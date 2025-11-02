import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import { useReducedMotion } from "@/contexts/UserPreferencesContext"
import {
    BULLET_SPEED,
    COLLISION_DISTANCE,
    FIRE_INTERVAL,
    GAME_UPDATE_INTERVAL,
    JET_MOVE_SPEED,
} from "../constants"
import type { Asteroid, Bullet, Explosion, JetPlane } from "../types"
import { generateInitialAsteroids, updateAsteroids } from "../utils/gameEngine"

interface GameState {
    jet: JetPlane
    bullets: Bullet[]
    asteroids: Asteroid[]
    explosions: Explosion[]
}

type GameAction =
    | { type: "UPDATE_JET"; jet: JetPlane }
    | { type: "FIRE_BULLET"; bullet: Bullet }
    | { type: "UPDATE_GAME"; updates: Partial<GameState> }

function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case "UPDATE_JET":
            return { ...state, jet: action.jet }
        case "FIRE_BULLET":
            return { ...state, bullets: [...state.bullets, action.bullet] }
        case "UPDATE_GAME":
            return { ...state, ...action.updates }
        default:
            return state
    }
}

/**
 * Hook to manage game logic, physics, and state
 * Uses a reducer for better performance and simpler state updates
 */
export function useGameLogic(): {
    isMounted: boolean
    jet: JetPlane
    bullets: Bullet[]
    asteroids: Asteroid[]
    explosions: Explosion[]
} {
    const [isMounted, setIsMounted] = useState(false)
    const prefersReducedMotion = useReducedMotion()
    const bulletIdRef = useRef(0)
    const asteroidIdRef = useRef(0)
    const explosionIdRef = useRef(0)
    const lastFireTimeRef = useRef(0)

    const [state, dispatch] = useReducer(gameReducer, {
        jet: { x: 50, y: 85, direction: 1 },
        bullets: [],
        asteroids: generateInitialAsteroids(asteroidIdRef),
        explosions: [],
    })

    // Detect collisions between bullets and asteroids
    const detectCollisions = useCallback((bullets: Bullet[], asteroids: Asteroid[]) => {
        const survivingBullets: Bullet[] = []
        const survivingAsteroids: Asteroid[] = []
        const newExplosions: Explosion[] = []
        const hitAsteroidIds = new Set<number>()

        for (const bullet of bullets) {
            let hit = false

            for (const asteroid of asteroids) {
                if (hitAsteroidIds.has(asteroid.id)) continue

                const distance = Math.sqrt(
                    (bullet.x - asteroid.x) ** 2 + (bullet.y - asteroid.y) ** 2
                )

                if (distance < COLLISION_DISTANCE) {
                    hit = true
                    hitAsteroidIds.add(asteroid.id)
                    newExplosions.push({
                        x: asteroid.x,
                        y: asteroid.y,
                        id: explosionIdRef.current++,
                        frame: 0,
                    })
                    break
                }
            }

            if (!hit) {
                survivingBullets.push(bullet)
            }
        }

        // Keep asteroids that weren't hit
        for (const asteroid of asteroids) {
            if (!hitAsteroidIds.has(asteroid.id)) {
                survivingAsteroids.push(asteroid)
            }
        }

        return { survivingBullets, survivingAsteroids, newExplosions }
    }, [])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (prefersReducedMotion) return

        const interval = setInterval(() => {
            const currentTime = Date.now()

            // Update jet position and direction
            const newJet = { ...state.jet }
            newJet.x += newJet.direction * JET_MOVE_SPEED

            if (newJet.x <= 15) {
                newJet.x = 15
                newJet.direction = 1
            } else if (newJet.x >= 85) {
                newJet.x = 85
                newJet.direction = -1
            }

            // Fire bullets periodically
            let newBullet: Bullet | null = null
            if (currentTime - lastFireTimeRef.current > FIRE_INTERVAL) {
                lastFireTimeRef.current = currentTime
                newBullet = {
                    x: newJet.x,
                    y: newJet.y - 5,
                    id: bulletIdRef.current++,
                }
            }

            // Move bullets
            const currentBullets = newBullet ? [...state.bullets, newBullet] : state.bullets
            const movedBullets = currentBullets
                .map((bullet) => ({ ...bullet, y: bullet.y - BULLET_SPEED }))
                .filter((bullet) => bullet.y > -5)

            // Detect collisions
            const { survivingBullets, survivingAsteroids, newExplosions } = detectCollisions(
                movedBullets,
                state.asteroids
            )

            // Update asteroids (move and respawn)
            const updatedAsteroids = updateAsteroids(survivingAsteroids, asteroidIdRef)

            // Update explosions
            const updatedExplosions = [...state.explosions, ...newExplosions]
                .map((explosion) => ({ ...explosion, frame: explosion.frame + 1 }))
                .filter((explosion) => explosion.frame < 3)

            // Single state update with all changes
            dispatch({
                type: "UPDATE_GAME",
                updates: {
                    jet: newJet,
                    bullets: survivingBullets,
                    asteroids: updatedAsteroids,
                    explosions: updatedExplosions,
                },
            })
        }, GAME_UPDATE_INTERVAL)

        return () => clearInterval(interval)
    }, [state, prefersReducedMotion, detectCollisions])

    return {
        isMounted,
        jet: state.jet,
        bullets: state.bullets,
        asteroids: state.asteroids,
        explosions: state.explosions,
    }
}
