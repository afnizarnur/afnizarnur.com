import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
    // Enable static export with ISR support
    // Note: For Netlify deployment with ISR, we'll use their adapter
    output: "standalone",

    // Set the monorepo root for proper file tracing
    outputFileTracingRoot: path.join(__dirname, "../../"),

    // Image optimization
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
            },
        ],
    },

    // Enable experimental features for better performance
    experimental: {
        // Enable optimized package imports for better bundle size
        optimizePackageImports: ["@phosphor-icons/react", "framer-motion"],
    },

    // Redirect trailing slashes
    trailingSlash: false,

    // Enable React strict mode
    reactStrictMode: true,

    // Configure TypeScript
    typescript: {
        ignoreBuildErrors: false,
    },

    // Configure ESLint
    eslint: {
        ignoreDuringBuilds: false,
    },
}

export default nextConfig
