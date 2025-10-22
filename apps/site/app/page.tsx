"use client"

import { HorizontalHeader } from "@/components/HorizontalHeader"

export default function HomePage(): JSX.Element {
    return (
        <div className="flex flex-col">
            <HorizontalHeader />
            <section className="min-h-[150vh]" aria-hidden="true" />
        </div>
    )
}
