import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

/**
 * Draft Mode Enable Endpoint
 *
 * This route is called by Sanity Studio's Presentation Tool to enable
 * draft mode and redirect to the preview URL.
 *
 * @see https://www.sanity.io/docs/draft-mode
 */
export async function GET(request: Request): Promise<Response> {
    const { searchParams } = new URL(request.url)
    const redirectTo = searchParams.get("redirect") || "/"

    // Enable draft mode
    await (await draftMode()).enable()

    // Redirect to the preview URL
    redirect(redirectTo)
}
