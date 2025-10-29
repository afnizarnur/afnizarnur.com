import React from "react"
import { useReducedMotion } from "@/contexts/UserPreferencesContext"
import {
    EXPLOSION_CHARS,
    EXPLOSION_FRAMES,
    PLANE_SHAPE_LEFT,
    PLANE_SHAPE_RIGHT,
} from "../constants"
import { useGameLogic } from "../hooks/useGameLogic"

export const GameVisualizer = React.memo(function GameVisualizer(): React.ReactElement {
    const prefersReducedMotion = useReducedMotion()
    const { isMounted, jet, bullets, asteroids, explosions } = useGameLogic()

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
})
