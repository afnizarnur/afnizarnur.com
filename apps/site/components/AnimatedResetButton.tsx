"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BroomIcon, CheckIcon } from "@phosphor-icons/react"

interface AnimatedResetButtonProps {
    onClick: () => void
    ariaLabel?: string
    show: boolean
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

    const handleClick = (): void => {
        if (isClicked) return // Prevent multiple clicks

        // Show check icon first
        setIsClicked(true)

        // Keep button visible even after hasChanges becomes false
        setForceShow(true)

        // Reset widgets immediately after icon transition starts
        setTimeout(() => {
            onClick()
        }, 150)

        // Hide button after showing check icon
        setTimeout(() => {
            setIsClicked(false)
            setForceShow(false)
        }, 1000)
    }

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
                    initial={{ opacity: 0, rotateY: -90, transformOrigin: "left" }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                >
            <AnimatePresence mode="wait">
                {!isClicked ? (
                    <motion.div
                        key="broom"
                        initial={{ scale: 1, rotate: 0 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <BroomIcon size={24} color="currentColor" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="check"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
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
