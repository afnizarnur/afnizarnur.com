interface SkipToMainContentProps {
    targetId?: string
}

export function SkipToMainContent({
    targetId = "main-content",
}: SkipToMainContentProps): JSX.Element {
    return (
        <a
            href={`#${targetId}`}
            className="sr-only focus:not-sr-only focus:block focus:fixed focus:top-12 focus:left-12 focus:right-12 focus:z-[9999] focus:px-4 focus:py-8 focus:bg-background-primary focus:text-text-primary focus:text-center focus:border focus:border-border-primary focus:rounded"
        >
            Skip to main content
        </a>
    )
}
