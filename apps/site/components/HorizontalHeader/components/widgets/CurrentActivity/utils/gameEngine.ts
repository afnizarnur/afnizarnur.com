import {
    ASTEROID_COUNT,
    ASTEROID_SPEED_MAX,
    ASTEROID_SPEED_MIN,
    COLLISION_DISTANCE,
    LETTERS_AND_SYMBOLS,
} from "../constants"
import type { Asteroid, Bullet, Explosion } from "../types"

export function getAsteroidSize(): "small" | "medium" | "large" {
    const rand = Math.random()
    if (rand < 0.5) return "small"
    if (rand < 0.8) return "medium"
    return "large"
}

export function getAsteroidChars(size: "small" | "medium" | "large"): string {
    const char = LETTERS_AND_SYMBOLS[Math.floor(Math.random() * LETTERS_AND_SYMBOLS.length)]
    if (size === "small") return char
    if (size === "medium") return char + char
    return char + char + char
}

export function generateAsteroid(asteroidIdRef: React.MutableRefObject<number>): Asteroid {
    const size = getAsteroidSize()
    return {
        char: getAsteroidChars(size),
        x: Math.random() * 100,
        y: -5,
        speed: Math.random() * (ASTEROID_SPEED_MAX - ASTEROID_SPEED_MIN) + ASTEROID_SPEED_MIN,
        id: asteroidIdRef.current++,
        size,
    }
}

export function generateInitialAsteroids(
    asteroidIdRef: React.MutableRefObject<number>
): Asteroid[] {
    return Array.from({ length: ASTEROID_COUNT }, () => {
        const size = getAsteroidSize()
        return {
            char: getAsteroidChars(size),
            x: Math.random() * 100,
            y: Math.random() * 70,
            speed: Math.random() * (ASTEROID_SPEED_MAX - ASTEROID_SPEED_MIN) + ASTEROID_SPEED_MIN,
            id: asteroidIdRef.current++,
            size,
        }
    })
}

export function detectCollisions(
    bullets: Bullet[],
    asteroids: Asteroid[],
    explosionIdRef: React.MutableRefObject<number>
): {
    survivingBullets: Bullet[]
    survivingAsteroids: Asteroid[]
    newExplosions: Explosion[]
} {
    const survivingBullets: Bullet[] = []
    const hitAsteroidIds: number[] = []
    const newExplosions: Explosion[] = []

    for (const bullet of bullets) {
        let hit = false

        for (const asteroid of asteroids) {
            const distance = Math.sqrt((bullet.x - asteroid.x) ** 2 + (bullet.y - asteroid.y) ** 2)

            if (distance < COLLISION_DISTANCE && !hitAsteroidIds.includes(asteroid.id)) {
                // Collision detected!
                hit = true
                hitAsteroidIds.push(asteroid.id)

                // Create explosion
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

    const survivingAsteroids = asteroids.filter((asteroid) => !hitAsteroidIds.includes(asteroid.id))

    return {
        survivingBullets,
        survivingAsteroids,
        newExplosions,
    }
}

export function updateAsteroids(
    asteroids: Asteroid[],
    asteroidIdRef: React.MutableRefObject<number>
): Asteroid[] {
    const updated = asteroids.map((asteroid) => ({
        ...asteroid,
        y: asteroid.y + asteroid.speed,
    }))

    // Respawn asteroids that went off screen or replace destroyed ones
    while (updated.length < ASTEROID_COUNT) {
        updated.push(generateAsteroid(asteroidIdRef))
    }

    return updated
        .map((asteroid) => {
            if (asteroid.y > 105) {
                return generateAsteroid(asteroidIdRef)
            }
            return asteroid
        })
        .slice(0, ASTEROID_COUNT)
}
