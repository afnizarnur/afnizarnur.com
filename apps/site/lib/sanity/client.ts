import { createClient } from "next-sanity"

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2025-03-04",
    useCdn: true, // Use CDN for faster response times in production
    stega: {
        // Enable visual editing in development and preview modes
        enabled: process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview",
        studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
    },
})

// Legacy export for backward compatibility during migration
export const sanity = client
