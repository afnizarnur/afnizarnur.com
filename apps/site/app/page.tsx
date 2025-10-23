"use client"

import { HorizontalHeader } from "@/components/HorizontalHeader"

export default function HomePage(): JSX.Element {
    return (
        <>
            {/* Skip to main content link for keyboard navigation */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background-primary focus:text-text-primary focus:rounded focus:ring-2 focus:ring-text-primary"
            >
                Skip to main content
            </a>

            <main id="main-content" role="main" className="flex flex-col">
                <HorizontalHeader />
                <section className="min-h-[150vh]">
                    {/* Additional content goes here */}
                </section>
            </main>
        </>
    )
}
