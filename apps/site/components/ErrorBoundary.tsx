"use client"

import { Component, type ReactNode } from "react"

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    error?: Error
}

/**
 * Error Boundary component for graceful error handling in React.
 * Catches JavaScript errors anywhere in the child component tree.
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<ErrorFallback />}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // Log error to console in development
        if (process.env.NODE_ENV === "development") {
            console.error("Error caught by boundary:", error, errorInfo)
        }
        // In production, you could send this to an error tracking service
    }

    handleRetry = (): void => {
        this.setState({ hasError: false, error: undefined })
    }

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return <DefaultErrorFallback onRetry={this.handleRetry} />
        }

        return this.props.children
    }
}

interface DefaultErrorFallbackProps {
    onRetry: () => void
}

function DefaultErrorFallback({ onRetry }: DefaultErrorFallbackProps): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center">
            <h2 className="text-heading-3 text-text-primary mb-4">Something went wrong</h2>
            <p className="text-body-2 text-text-secondary mb-6">
                An unexpected error occurred. Please try again.
            </p>
            <button
                onClick={onRetry}
                className="px-4 py-2 bg-background-secondary text-text-primary rounded-radius-8 hover:bg-background-tertiary transition-colors duration-150"
                type="button"
            >
                Try again
            </button>
        </div>
    )
}
