"use client"

import { HorizontalHeader } from "@/components/HorizontalHeader"

export default function HomePage(): JSX.Element {
    return (
        <>
            <HorizontalHeader />
            <section className="min-h-[150vh]">{/* Additional content goes here */}</section>
        </>
    )
}
