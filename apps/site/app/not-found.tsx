import Link from "next/link"
import { PageHeader } from "@/components/PageHeader"

export default function NotFound(): JSX.Element {
    return (
        <div className="mx-auto max-w-7xl px-16 py-60 sm:px-24 lg:px-32">
            <div className="mx-auto max-w-2xl text-center">
                <PageHeader
                    title="Page not found"
                    description="Sorry, we couldn't find the page you're looking for."
                    orientation="center"
                    headingLevel="h1"
                />

                <div className="mt-32">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-8 rounded-full px-24 py-12 text-sm font-semibold transition-colors duration-150 bg-background-accent-solid text-text-inverse hover:bg-background-accent-solid-hover"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        </div>
    )
}
