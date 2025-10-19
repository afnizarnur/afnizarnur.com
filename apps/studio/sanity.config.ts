import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { presentationTool } from "sanity/presentation"
import { schemaTypes } from "./schemas"

/**
 * Sanity Studio Configuration
 *
 * Includes:
 * - Structure Tool: Content management interface
 * - Vision Tool: GROQ query playground
 * - Presentation Tool: Live preview and visual editing
 */

const PREVIEW_BASE_URL =
    process.env.SANITY_STUDIO_PREVIEW_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"

const plugins = [
    structureTool(),
    visionTool(),
    presentationTool({
        previewUrl: {
            origin: PREVIEW_BASE_URL,
            draftMode: {
                enable: "/api/draft-mode/enable",
            },
        },
    }),
] as any

export default defineConfig({
    name: "default",
    title: "Afnizar Nur Ghifari",

    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",

    plugins,

    schema: {
        types: schemaTypes,
    },
})
