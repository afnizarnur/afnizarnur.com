import Link from "next/link"
import type { ReactNode } from "react"

export interface HeaderAction {
    href: string
    label: string
    variant?: "primary" | "secondary" | "ghost"
    external?: boolean
}

interface PageHeaderProps {
    title: string
    description?: string
    eyebrow?: string | ReactNode
    orientation?: "left" | "center"
    actions?: HeaderAction[]
    headingLevel?: "h1" | "h2" | "h3" | "h4"
    children?: ReactNode
    meta?: ReactNode
}

export function PageHeader({
    title,
    description,
    eyebrow,
    orientation = "left",
    actions = [],
    headingLevel: HeadingTag = "h1",
    children,
    meta,
}: PageHeaderProps): JSX.Element {
    const normalizedActions = actions.map((action) => ({
        ...action,
        variant: action.variant ?? "primary",
    }))

    const isCenter = orientation === "center"

    return (
        <header
            className={`mb-48 flex flex-col gap-16 ${isCenter ? "items-center text-center" : ""}`}
        >
            {eyebrow && (
                typeof eyebrow === "string" ? (
                    <span className="inline-flex items-center gap-8 rounded-full bg-background-accent-primary px-12 py-4 text-xs font-semibold uppercase tracking-wide text-text-accent-primary">
                        {eyebrow}
                    </span>
                ) : (
                    eyebrow
                )
            )}

            <HeadingTag className="text-balance text-4xl font-bold text-text-primary sm:text-5xl">
                {title}
            </HeadingTag>

            {description && (
                <p className="text-balance text-xl text-text-secondary">{description}</p>
            )}

            {children}

            {meta && (
                <div className={`flex flex-wrap gap-16 ${isCenter ? "justify-center" : ""}`}>
                    {meta}
                </div>
            )}

            {normalizedActions.length > 0 && (
                <div className={`mt-16 flex flex-wrap gap-16 ${isCenter ? "justify-center" : ""}`}>
                    {normalizedActions.map((action) => {
                        const className = `inline-flex items-center justify-center gap-8 rounded-full px-16 py-8 text-sm font-semibold transition-colors duration-150 ${
                            action.variant === "primary"
                                ? "bg-background-accent-solid text-text-inverse hover:bg-background-accent-solid-hover"
                                : action.variant === "secondary"
                                  ? "border border-border-primary bg-background-primary text-text-primary hover:bg-background-secondary"
                                  : "text-text-primary hover:text-text-accent-primary"
                        }`

                        if (action.external || action.href.startsWith("http")) {
                            return (
                                <a
                                    key={action.href}
                                    href={action.href}
                                    target={action.external ? "_blank" : undefined}
                                    rel={action.external ? "noopener noreferrer" : undefined}
                                    className={className}
                                >
                                    {action.label}
                                </a>
                            )
                        }

                        return (
                            <Link
                                key={action.href}
                                href={action.href}
                                className={className}
                            >
                                {action.label}
                            </Link>
                        )
                    })}
                </div>
            )}
        </header>
    )
}
