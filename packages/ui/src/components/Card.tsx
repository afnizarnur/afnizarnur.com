import type { ReactNode } from "react"

export interface CardProps {
    children: ReactNode
    className?: string
    href?: string
}

/**
 * Base Card component
 * Used as foundation for ProjectCard and PostCard
 */
export function Card({ children, className = "", href }: CardProps) {
    const classes = ["surface-card", className].filter(Boolean).join(" ")

    if (href) {
        return (
            <a href={href} className={classes}>
                {children}
            </a>
        )
    }

    return <div className={classes}>{children}</div>
}
