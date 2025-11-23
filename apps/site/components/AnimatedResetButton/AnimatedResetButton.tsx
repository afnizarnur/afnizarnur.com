"use client"

import { BroomIcon, CheckIcon } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "framer-motion"
import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "@/contexts/UserPreferencesContext"

interface AnimatedResetButtonProps {
    onClick: () => void
    ariaLabel?: string
    show: boolean
}

// Animation timing constants
const ANIMATION_TIMING = {
    RESET_DELAY: 150, // Delay before calling onClick
    ANIMATION_DURATION: 1000, // Total animation duration before hiding
    ICON_EXIT_DURATION: 0.2, // Broom icon exit duration
    ICON_ENTER_DURATION: 0.3, // Check icon enter duration
} as const

// Framer Motion animation variants
const buttonVariants = {
    initial: { opacity: 0, rotateY: -90, transformOrigin: "left" as const },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, scale: 0.8 },
}

const buttonTransition = {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
}

const iconVariants = {
    broom: {
        initial: { scale: 1, rotate: 0 },
        animate: { scale: 1, rotate: 0 },
        exit: { scale: 0, rotate: 180, opacity: 0 },
    },
    check: {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { opacity: 0 },
    },
}

/**
 * Animated reset button with entrance hinge animation and click morph effect
 * Shows Broom icon initially, morphs to Check icon on click, then disappears
 */
export function AnimatedResetButton({
    onClick,
    ariaLabel = "Reset widget positions and states",
    show,
}: AnimatedResetButtonProps): React.ReactElement {
    const [isClicked, setIsClicked] = useState(false)
    const [forceShow, setForceShow] = useState(false)
    const prefersReducedMotion = useReducedMotion()
    const timeoutRefs = useRef<NodeJS.Timeout[]>([])

    // Cleanup timeouts on unmount to prevent memory leaks
    useEffect(() => {
        return () => {
            timeoutRefs.current.forEach(clearTimeout)
            timeoutRefs.current = []
        }
    }, [])

    const handleClick = useCallback((): void => {
        if (isClicked) return // Prevent multiple clicks

        // Show check icon first
        setIsClicked(true)

        // Keep button visible even after hasChanges becomes false
        setForceShow(true)

        // Reset widgets immediately after icon transition starts
        const resetTimeout = setTimeout(() => {
            onClick()
        }, ANIMATION_TIMING.RESET_DELAY)

        // Hide button after showing check icon
        const hideTimeout = setTimeout(() => {
            setIsClicked(false)
            setForceShow(false)
        }, ANIMATION_TIMING.ANIMATION_DURATION)

        // Store timeouts for cleanup
        timeoutRefs.current.push(resetTimeout, hideTimeout)
    }, [isClicked, onClick])

    // Show button if either hasChanges or we're in the middle of animation
    const shouldShow = show || forceShow

    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.button
                    className="w-[40px] h-[40px] p-[8px] flex items-center justify-center text-icon-secondary hover:text-icon-primary active:text-icon-primary transition-colors rounded-radius-8 cursor-pointer relative overflow-hidden"
                    aria-label={ariaLabel}
                    type="button"
                    onClick={handleClick}
                    disabled={isClicked}
                    initial={prefersReducedMotion ? buttonVariants.animate : buttonVariants.initial}
                    animate={buttonVariants.animate}
                    exit={buttonVariants.exit}
                    transition={prefersReducedMotion ? { duration: 0 } : buttonTransition}
                >
                    <AnimatePresence mode="wait">
                        {!isClicked ? (
                            <motion.div
                                key="broom"
                                initial={iconVariants.broom.initial}
                                animate={iconVariants.broom.animate}
                                exit={iconVariants.broom.exit}
                                transition={
                                    prefersReducedMotion
                                        ? { duration: 0 }
                                        : { duration: ANIMATION_TIMING.ICON_EXIT_DURATION }
                                }
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <BroomIcon size={24} color="currentColor" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="check"
                                initial={iconVariants.check.initial}
                                animate={iconVariants.check.animate}
                                exit={iconVariants.check.exit}
                                transition={
                                    prefersReducedMotion
                                        ? { duration: 0 }
                                        : { duration: ANIMATION_TIMING.ICON_ENTER_DURATION }
                                }
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <CheckIcon size={24} color="currentColor" weight="bold" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            )}
        </AnimatePresence>
    )
}
