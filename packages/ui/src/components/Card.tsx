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
    const baseStyles =
        "block rounded-lg border border-neutral-200 bg-white p-6 transition-all hover:shadow-lg"
    const combinedStyles = `${baseStyles} ${className}`

    if (href) {
        return (
            <a href={href} className={combinedStyles}>
                {children}
            </a>
        )
    }

    return <div className={combinedStyles}>{children}</div>
}
