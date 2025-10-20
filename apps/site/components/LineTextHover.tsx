"use client"

import { motion, useAnimation } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

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

interface CharAnimationProps {
    char: string
    index: number
    isAnimating: boolean
}

function CharAnimation({ char, index, isAnimating }: CharAnimationProps) {
    const [displayChar, setDisplayChar] = useState(char)
    const [isVisible, setIsVisible] = useState(true)
    const controls = useAnimation()
    const timeoutRefs = useRef<NodeJS.Timeout[]>([])

    const clearTimeouts = useCallback(() => {
        timeoutRefs.current.forEach(timeout => clearTimeout(timeout))
        timeoutRefs.current = []
    }, [])

    useEffect(() => {
        if (!isAnimating) {
            clearTimeouts()
            setDisplayChar(char)
            setIsVisible(true)
            controls.set({ opacity: 1 })
            return
        }

        clearTimeouts()
        
        const delay = (index + 1) * 70 // 0.07s * 1000ms
        const scrambleDuration = 30 // 0.03s * 1000ms
        const scrambleDelay = 40 // 0.04s * 1000ms
        const totalScrambles = 3

        // Start animation after delay
        const startTimeout = setTimeout(() => {
            setIsVisible(false)
            controls.start({ opacity: 0 })

            // Perform scramble iterations
            for (let i = 0; i < totalScrambles; i++) {
                const scrambleTimeout = setTimeout(() => {
                    const randomChar = lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)]
                    setDisplayChar(randomChar)
                    setIsVisible(true)
                    controls.start({ opacity: 1 })

                    // Hide after scramble duration
                    const hideTimeout = setTimeout(() => {
                        if (i < totalScrambles - 1) {
                            setIsVisible(false)
                            controls.start({ opacity: 0 })
                        }
                    }, scrambleDuration)
                    
                    timeoutRefs.current.push(hideTimeout)
                }, i * (scrambleDuration + scrambleDelay))
                
                timeoutRefs.current.push(scrambleTimeout)
            }

            // Final reveal of original character
            const finalTimeout = setTimeout(() => {
                setDisplayChar(char)
                setIsVisible(true)
                controls.start({ opacity: 1 })
            }, totalScrambles * (scrambleDuration + scrambleDelay) + scrambleDuration)
            
            timeoutRefs.current.push(finalTimeout)
        }, delay)

        timeoutRefs.current.push(startTimeout)

        return clearTimeouts
    }, [isAnimating, char, index, controls, clearTimeouts])

    return (
        <motion.span
            animate={controls}
            initial={{ opacity: 1 }}
            style={{
                display: 'inline-block',
                minWidth: char === ' ' ? '0.25em' : 'auto'
            }}
        >
            {displayChar}
        </motion.span>
    )
}

export function LineTextHover({ 
    children, 
    className = "", 
    as: Component = "span",
    onHoverStart,
    onHoverEnd
}: LineTextHoverProps) {
    const [isAnimating, setIsAnimating] = useState(false)
    const chars = children.split('')

    const handleMouseEnter = useCallback(() => {
        setIsAnimating(true)
        onHoverStart?.()
        
        // Reset animation state after animation completes
        const totalDuration = (chars.length * 70) + (3 * (30 + 40)) + 30 + 100 // Add some buffer
        setTimeout(() => {
            setIsAnimating(false)
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
            style={{ cursor: 'pointer' }}
        >
            {chars.map((char, index) => (
                <CharAnimation
                    key={`${char}-${index}`}
                    char={char}
                    index={index}
                    isAnimating={isAnimating}
                />
            ))}
        </Component>
    )
}