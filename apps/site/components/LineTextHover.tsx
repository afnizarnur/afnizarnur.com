"use client"

import { motion } from "framer-motion"
import React, { useCallback, useRef, useState } from "react"

const lettersAndSymbols = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','
]

interface LineTextHoverProps {
    children: string
    className?: string
    as?: keyof JSX.IntrinsicElements
    onHoverStart?: () => void
    onHoverEnd?: () => void
}

export function LineTextHover({ 
    children, 
    className = "", 
    as: Component = "span",
    onHoverStart,
    onHoverEnd
}: LineTextHoverProps) {
    const [animationKey, setAnimationKey] = useState(0)
    const isAnimatingRef = useRef(false)
    const chars = children.split('')

    const handleMouseEnter = useCallback(() => {
        if (isAnimatingRef.current) return
        
        isAnimatingRef.current = true
        setAnimationKey(prev => prev + 1)
        onHoverStart?.()
        
        // Reset after animation completes
        const totalDuration = (chars.length * 70) + (4 * 70) + 100
        setTimeout(() => {
            isAnimatingRef.current = false
        }, totalDuration)
    }, [chars.length, onHoverStart])

    const handleMouseLeave = useCallback(() => {
        onHoverEnd?.()
    }, [onHoverEnd])

    return (
        <Component
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ 
                cursor: 'pointer',
                fontKerning: 'none',
                position: 'relative',
                whiteSpace: 'nowrap'
            }}
        >
            {chars.map((char, index) => (
                <CharSpan
                    key={`${index}-${animationKey}`}
                    char={char}
                    index={index}
                    shouldAnimate={animationKey > 0}
                />
            ))}
        </Component>
    )
}

interface CharSpanProps {
    char: string
    index: number
    shouldAnimate: boolean
}

function CharSpan({ char, index, shouldAnimate }: CharSpanProps) {
    const [displayChar, setDisplayChar] = useState(char)
    const [cursorOpacity, setCursorOpacity] = useState(0)

    // Use useEffect to handle the animation timing more precisely
    React.useEffect(() => {
        if (!shouldAnimate) {
            setDisplayChar(char)
            setCursorOpacity(0)
            return
        }

        const delay = (index + 1) * 70 // 0.07s delay
        const duration = 30 // 0.03s duration
        const repeatDelay = 40 // 0.04s repeat delay
        
        const timeout = setTimeout(() => {
            // Show cursor at start (onStart equivalent)
            setCursorOpacity(1)
            
            let repeatCount = 0
            
            // Create the repeating animation manually
            const animate = () => {
                // Set random character
                const randomChar = lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)]
                setDisplayChar(randomChar)
                
                // After first repeat, hide cursor
                if (repeatCount === 1) {
                    setCursorOpacity(0)
                }
                
                repeatCount++
                
                if (repeatCount <= 3) {
                    setTimeout(animate, duration + repeatDelay)
                } else {
                    // Animation complete - restore original character
                    setTimeout(() => {
                        setDisplayChar(char)
                        setCursorOpacity(0)
                    }, duration)
                }
            }
            
            animate()
        }, delay)

        return () => clearTimeout(timeout)
    }, [shouldAnimate, char, index])

    return (
        <motion.span
            style={{
                position: 'relative',
                display: 'inline-block',
                minWidth: char === ' ' ? '0.25em' : 'auto'
            }}
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? {
                opacity: 1,
                transition: {
                    duration: 0.03,
                    delay: (index + 1) * 0.07,
                    repeat: 3,
                    repeatDelay: 0.04
                }
            } : { opacity: 1 }}
        >
            {displayChar}
            {/* Cursor square - only shows during this character's animation */}
            <span
                style={{
                    content: '',
                    width: '1ch',
                    top: 0,
                    left: 0,
                    position: 'absolute',
                    background: 'currentColor',
                    height: '100%',
                    opacity: cursorOpacity,
                    pointerEvents: 'none'
                }}
            />
        </motion.span>
    )
}