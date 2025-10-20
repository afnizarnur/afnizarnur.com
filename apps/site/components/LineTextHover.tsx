"use client"

import { motion } from "framer-motion"
import { useCallback, useRef, useState } from "react"

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
    const repeatCount = useRef(0)

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
            onAnimationStart={() => {
                if (shouldAnimate) {
                    setCursorOpacity(1)
                    repeatCount.current = 0
                }
            }}
            onAnimationComplete={() => {
                if (shouldAnimate) {
                    setDisplayChar(char)
                    setCursorOpacity(0)
                }
            }}
            onUpdate={(latest) => {
                if (!shouldAnimate) return
                
                // This is a bit hacky but works for the scramble effect
                if (latest.opacity === 1) {
                    const randomChar = lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)]
                    setDisplayChar(randomChar)
                    
                    repeatCount.current++
                    if (repeatCount.current === 2) { // After first repeat
                        setCursorOpacity(0)
                    }
                }
            }}
        >
            {displayChar}
            {/* Cursor square - matches CSS implementation */}
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