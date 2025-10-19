import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

/**
 * Draft Mode Disable Endpoint
 *
 * This route disables draft mode and redirects back to the home page.
 * You can call this from your preview UI or manually navigate to it.
 *
 * @example
 * fetch('/api/draft-mode/disable')
 */
export async function GET(): Promise<Response> {
    // Disable draft mode
    await (await draftMode()).disable()

    // Redirect to home page
    redirect("/")
}
