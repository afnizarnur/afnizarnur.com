import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

/**
 * On-Demand Revalidation Endpoint
 *
 * This route is called by Sanity webhooks to trigger ISR revalidation
 * when content changes in the CMS.
 *
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
 * @see https://www.sanity.io/docs/webhooks
 */

interface SanityWebhookPayload {
    _type: string
    _id: string
    slug?: {
        current: string
    }
}

export async function POST(request: NextRequest): Promise<Response> {
    try {
        // Verify the request is authorized
        const secret = request.nextUrl.searchParams.get("secret")
        const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

        if (!expectedSecret) {
            console.error("SANITY_REVALIDATE_SECRET is not configured")
            return NextResponse.json(
                { message: "Revalidation not configured" },
                { status: 500 }
            )
        }

        if (secret !== expectedSecret) {
            return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
        }

        // Parse the webhook payload
        const body = (await request.json()) as SanityWebhookPayload

        if (!body._type) {
            return NextResponse.json(
                { message: "Missing _type in payload" },
                { status: 400 }
            )
        }

        // Determine which tags to revalidate based on document type
        const tags: string[] = []

        switch (body._type) {
            case "siteSettings":
                tags.push("settings")
                break

            case "navigation":
                tags.push("navigation")
                break

            case "post":
                tags.push("posts")
                if (body.slug?.current) {
                    tags.push(`post-${body.slug.current}`)
                }
                break

            case "project":
                tags.push("projects")
                if (body.slug?.current) {
                    tags.push(`project-${body.slug.current}`)
                }
                break

            case "page":
                if (body.slug?.current) {
                    tags.push(`page-${body.slug.current}`)
                }
                break

            case "tag":
                tags.push("tags")
                if (body.slug?.current) {
                    tags.push(`tag-${body.slug.current}`)
                }
                break

            default:
                return NextResponse.json(
                    { message: `Unknown document type: ${body._type}` },
                    { status: 400 }
                )
        }

        // Revalidate all relevant tags
        for (const tag of tags) {
            revalidateTag(tag)
        }

        console.log(`Revalidated tags: ${tags.join(", ")}`)

        return NextResponse.json({
            revalidated: true,
            tags,
            now: Date.now(),
        })
    } catch (error) {
        console.error("Revalidation error:", error)
        return NextResponse.json(
            {
                message: "Error revalidating",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        )
    }
}
