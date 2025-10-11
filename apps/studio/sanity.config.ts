import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"

const plugins = [structureTool(), visionTool()] as any

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
