import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest): NextResponse {
    const response = NextResponse.next()

    // Add current pathname to headers for server components
    response.headers.set("x-pathname", request.nextUrl.pathname)

    // Content Security Policy
    const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob: https://cdn.sanity.io https://i.scdn.co https://image.api.playstation.com",
        "font-src 'self'",
        "connect-src 'self' https://api.sanity.io https://*.sanity.io wss://*.sanity.io",
        "frame-src 'self' https://*.sanity.io",
        "media-src 'self' https://cdn.sanity.io",
    ].join("; ")

    response.headers.set("Content-Security-Policy", csp)
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}
