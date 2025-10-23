"use client"

import { HorizontalHeader } from "@/components/HorizontalHeader"
import { SkipToMainContent } from "@/components/SkipToMainContent"

export default function HomePage(): JSX.Element {
    return (
        <>
            <SkipToMainContent />

            <main id="main-content" role="main" className="flex flex-col">
                <HorizontalHeader />
                <section className="min-h-[150vh]">
                    {/* Additional content goes here */}
                </section>
            </main>
        </>
    )
}
