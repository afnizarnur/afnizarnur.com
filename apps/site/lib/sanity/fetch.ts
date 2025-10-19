import "server-only"
import { draftMode } from "next/headers"
import type { QueryParams } from "next-sanity"
import { client } from "./client"
import { sanityFetch as liveFetch } from "./live"

/**
 * Enhanced Sanity fetch function with draft mode support
 *
 * This wrapper automatically handles:
 * - Live preview when draft mode is enabled
 * - Standard ISR caching when draft mode is disabled
 * - Proper Next.js cache tags for on-demand revalidation
 *
 * @example
 * ```ts
 * const posts = await sanityFetch<Post[]>({
 *   query: postsQuery,
 *   params: { limit: 10 },
 *   tags: ['posts']
 * })
 * ```
 */
export async function sanityFetch<QueryResponse>({
    query,
    params = {},
    tags,
    revalidate = 3600, // Default to 1 hour ISR
}: {
    query: string
    params?: QueryParams
    tags?: string[]
    revalidate?: number | false
}): Promise<QueryResponse> {
    let isDraftMode = false
    try {
        isDraftMode = (await draftMode()).isEnabled
    } catch {
        // draftMode() throws outside request scope (e.g., during build/generateStaticParams)
        // In this case, we fall back to standard ISR fetch
        isDraftMode = false
    }

    // In draft mode, use Live Content API for real-time updates
    if (isDraftMode) {
        const { data } = await liveFetch({
            query,
            params,
            tags,
        })
        return data as QueryResponse
    }

    // In production, use standard fetch with ISR caching
    return client.fetch<QueryResponse>(query, params, {
        next: {
            revalidate,
            tags,
        },
    })
}
