"use client"

import { motion } from "framer-motion"
import React, { useCallback, useRef, useState } from "react"
import { useReducedMotion } from "@/contexts/UserPreferencesContext"

const lettersAndSymbols = [
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
]

const defaultColors = ["#22a3a9", "#4ca922", "#a99222", "#1d2619"]

type EffectType = "cursor" | "background" | "colorful"

interface TerminalTextEffectProps {
    children: string
    effect?: EffectType
    className?: string
    as?: keyof JSX.IntrinsicElements
    onHoverStart?: () => void
    onHoverEnd?: () => void
    colors?: string[] // For colorful effect
    triggerAnimation?: number // External trigger - increment to trigger animation
}

export function TerminalTextEffect({
    children,
    effect = "cursor",
    className = "",
    as: Component = "span",
    onHoverStart,
    onHoverEnd,
    colors = defaultColors,
    triggerAnimation,
}: TerminalTextEffectProps) {
    const [animationKey, setAnimationKey] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const isAnimatingRef = useRef(false)
    const chars = children.split("")
    const prefersReducedMotion = useReducedMotion()

    // Get timing based on effect type
    const getTimingConfig = React.useCallback((effectType: EffectType) => {
        switch (effectType) {
            case "cursor":
                return { charDelay: 70, duration: 30, repeatDelay: 40, repeats: 3 }
            case "background":
                return { charDelay: 60, duration: 30, repeatDelay: 50, repeats: 2 }
            case "colorful":
                return { charDelay: 80, duration: 30, repeatDelay: 100, repeats: 3 }
            default:
                return { charDelay: 70, duration: 30, repeatDelay: 40, repeats: 3 }
        }
    }, [])

    const handleMouseEnter = useCallback(() => {
        // Skip animation if user prefers reduced motion
        if (prefersReducedMotion) {
            onHoverStart?.()
            return
        }

        if (isAnimatingRef.current) return

        isAnimatingRef.current = true
        setIsHovered(true)
        setAnimationKey((prev) => prev + 1)
        onHoverStart?.()

        const timing = getTimingConfig(effect)
        const textAnimationDuration =
            chars.length * timing.charDelay +
            (timing.repeats + 1) * (timing.duration + timing.repeatDelay) +
            100
        setTimeout(() => {
            isAnimatingRef.current = false
        }, textAnimationDuration)
    }, [chars.length, onHoverStart, effect, prefersReducedMotion, getTimingConfig])

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false)
        onHoverEnd?.()
    }, [onHoverEnd])

    // Handle external trigger
    React.useEffect(() => {
        if (triggerAnimation !== undefined && triggerAnimation > 0) {
            handleMouseEnter()
        }
    }, [triggerAnimation, handleMouseEnter])

    return (
        <Component
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                cursor: "pointer",
                fontKerning: "none",
                position: "relative",
                whiteSpace: "nowrap",
            }}
        >
            {chars.map((char, index) => (
                <CharSpan
                    key={`${index}-${animationKey}`}
                    char={char}
                    index={index}
                    effect={effect}
                    shouldAnimate={animationKey > 0}
                    colors={colors}
                />
            ))}

            {/* Background effect for background variant */}
            {effect === "background" && !prefersReducedMotion && (
                <motion.span
                    style={{
                        content: "",
                        position: "absolute",
                        left: 0,
                        width: "100%",
                        height: "calc(100% + 3px)",
                        top: 0,
                        backgroundColor: "white",
                        mixBlendMode: "difference",
                        transformOrigin: "0% 50%",
                        pointerEvents: "none",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{
                        scaleX: isHovered ? 1 : 0,
                        transition: isHovered
                            ? { duration: 1, ease: [0.19, 1, 0.22, 1] } // expo ease
                            : { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }, // power4 ease
                    }}
                />
            )}
        </Component>
    )
}

interface CharSpanProps {
    char: string
    index: number
    effect: EffectType
    shouldAnimate: boolean
    colors: string[]
}

function CharSpan({ char, index, effect, shouldAnimate, colors }: CharSpanProps) {
    const [displayChar, setDisplayChar] = useState(char)
    const [currentColor, setCurrentColor] = useState("currentColor")
    const [cursorOpacity, setCursorOpacity] = useState(0)
    const prefersReducedMotion = useReducedMotion()

    // Get timing config for this effect
    const getTimingConfig = React.useCallback((effectType: EffectType) => {
        switch (effectType) {
            case "cursor":
                return { charDelay: 70, duration: 30, repeatDelay: 40, repeats: 3 }
            case "background":
                return { charDelay: 60, duration: 30, repeatDelay: 50, repeats: 2 }
            case "colorful":
                return { charDelay: 80, duration: 30, repeatDelay: 100, repeats: 3 }
            default:
                return { charDelay: 70, duration: 30, repeatDelay: 40, repeats: 3 }
        }
    }, [])

    // Handle animation based on effect type
    React.useEffect(() => {
        if (!shouldAnimate || prefersReducedMotion) {
            setDisplayChar(char)
            setCurrentColor("currentColor")
            setCursorOpacity(0)
            return
        }

        const timing = getTimingConfig(effect)
        const delay = (index + 1) * timing.charDelay

        const timeout = setTimeout(() => {
            // Show cursor for cursor effect
            if (effect === "cursor") {
                setCursorOpacity(1)
            }

            let repeatCount = 0

            const animate = () => {
                // Set random character
                const randomChar =
                    lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)]
                setDisplayChar(randomChar)

                // Set random color for colorful effect
                if (effect === "colorful") {
                    const randomColor = colors[Math.floor(Math.random() * colors.length)]
                    setCurrentColor(randomColor)
                }

                // Hide cursor after first repeat for cursor effect
                if (effect === "cursor" && repeatCount === 1) {
                    setCursorOpacity(0)
                }

                repeatCount++

                if (repeatCount <= timing.repeats) {
                    setTimeout(animate, timing.duration + timing.repeatDelay)
                } else {
                    // Animation complete - restore original character and color
                    const restoreDelay = effect === "background" ? 100 : timing.duration
                    setTimeout(() => {
                        setDisplayChar(char)
                        setCurrentColor("currentColor")
                        setCursorOpacity(0)
                    }, restoreDelay)
                }
            }

            animate()
        }, delay)

        return () => clearTimeout(timeout)
    }, [shouldAnimate, char, index, effect, colors, prefersReducedMotion, getTimingConfig])

    return (
        <motion.span
            style={{
                position: "relative",
                display: "inline-block",
                minWidth: char === " " ? "0.25em" : "auto",
                color: currentColor,
                transformOrigin: effect === "colorful" ? "50% 0%" : "center",
            }}
            initial={{ opacity: 1 }}
            animate={
                shouldAnimate
                    ? {
                          opacity: 1,
                          transition: {
                              duration: getTimingConfig(effect).duration / 1000,
                              delay: (index + 1) * (getTimingConfig(effect).charDelay / 1000),
                              repeat: getTimingConfig(effect).repeats,
                              repeatDelay: getTimingConfig(effect).repeatDelay / 1000,
                              ease: effect === "colorful" ? "linear" : "easeOut",
                          },
                      }
                    : { opacity: 1 }
            }
        >
            {displayChar}

            {/* Cursor square for cursor effect */}
            {effect === "cursor" && (
                <span
                    style={{
                        content: "",
                        width: "1ch",
                        top: 0,
                        left: 0,
                        position: "absolute",
                        background: "currentColor",
                        height: "100%",
                        opacity: cursorOpacity,
                        pointerEvents: "none",
                    }}
                />
            )}
        </motion.span>
    )
}
