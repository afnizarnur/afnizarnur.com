"use client"

import type { PortableTextBlock } from "@afnizarnur/ui"
import { PortableText as ReactPortableText } from "@portabletext/react"

interface PortableTextProps {
    value: PortableTextBlock[]
}

export function PortableText({ value }: PortableTextProps): JSX.Element {
    return (
        <div className="portable-text">
            <ReactPortableText value={value} />

            <style jsx global>{`
                .portable-text h2 {
                    @apply mt-48 mb-16 text-balance text-3xl font-bold text-text-primary;
                }

                .portable-text h3 {
                    @apply mt-32 mb-12 text-balance text-2xl font-bold text-text-primary;
                }

                .portable-text h4 {
                    @apply mt-24 mb-8 text-balance text-xl font-bold text-text-primary;
                }

                .portable-text p {
                    @apply mb-16 text-balance text-text-secondary leading-relaxed;
                }

                .portable-text blockquote {
                    @apply border-l-4 border-border-accent-primary pl-16 my-24 text-balance italic text-text-tertiary;
                }

                .portable-text ul {
                    @apply list-disc pl-24 mb-16 space-y-8;
                }

                .portable-text ol {
                    @apply list-decimal pl-24 mb-16 space-y-8;
                }

                .portable-text li {
                    @apply text-text-secondary;
                }

                .portable-text strong {
                    @apply font-semibold;
                }

                .portable-text em {
                    @apply italic;
                }

                .portable-text code {
                    @apply rounded bg-background-secondary px-8 py-2 text-sm font-mono text-text-primary;
                }

                .portable-text pre {
                    @apply overflow-x-auto rounded-lg bg-background-inverse p-16 my-24;
                }

                .portable-text pre code {
                    @apply text-sm text-text-inverse bg-transparent p-0;
                }

                .portable-text a {
                    @apply text-text-accent-primary hover:opacity-80 underline;
                }

                .portable-text img {
                    @apply rounded-lg w-full my-32;
                }

                .portable-text figure {
                    @apply my-32;
                }

                .portable-text figcaption {
                    @apply mt-8 text-center text-sm text-text-tertiary;
                }
            `}</style>
        </div>
    )
}
