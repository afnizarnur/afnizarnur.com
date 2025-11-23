import { LRUCache } from "lru-cache"

interface RateLimitOptions {
    /** Maximum number of unique tokens per interval */
    uniqueTokenPerInterval?: number
    /** Time interval in milliseconds */
    interval?: number
}

interface RateLimiter {
    /**
     * Check if a request should be rate limited.
     * @param limit - Maximum number of requests allowed
     * @param token - Unique identifier for the client (e.g., IP address)
     * @returns Promise that resolves if within limit, rejects if rate limited
     */
    check: (limit: number, token: string) => Promise<void>
}

/**
 * Creates a rate limiter using LRU cache for efficient token tracking.
 *
 * @example
 * ```ts
 * const limiter = rateLimit({
 *   interval: 60 * 1000, // 1 minute
 *   uniqueTokenPerInterval: 500
 * })
 *
 * // In API route:
 * try {
 *   await limiter.check(10, ip) // 10 requests per minute
 * } catch {
 *   return Response.json({ error: 'Rate limit exceeded' }, { status: 429 })
 * }
 * ```
 */
export function rateLimit(options?: RateLimitOptions): RateLimiter {
    const tokenCache = new LRUCache<string, number[]>({
        max: options?.uniqueTokenPerInterval || 500,
        ttl: options?.interval || 60000,
    })

    return {
        check: (limit: number, token: string): Promise<void> =>
            new Promise((resolve, reject) => {
                const tokenCount = tokenCache.get(token) || [0]

                if (tokenCount[0] === 0) {
                    tokenCache.set(token, [1])
                } else {
                    tokenCount[0] += 1
                    tokenCache.set(token, tokenCount)
                }

                const currentUsage = tokenCount[0]
                const isRateLimited = currentUsage > limit

                if (isRateLimited) {
                    reject(new Error("Rate limit exceeded"))
                } else {
                    resolve()
                }
            }),
    }
}

/**
 * Helper to get client IP from request headers.
 * Handles common proxy headers.
 */
export function getClientIp(request: Request): string {
    const forwardedFor = request.headers.get("x-forwarded-for")
    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim()
    }

    const realIp = request.headers.get("x-real-ip")
    if (realIp) {
        return realIp
    }

    return "anonymous"
}
