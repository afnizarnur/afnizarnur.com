import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { config as loadEnvConfig } from "dotenv"
import { defineCliConfig } from "sanity/cli"

// Load environment variables when commands execute from repo root
loadEnvConfig()
loadEnvConfig({
    path: resolve(dirname(fileURLToPath(import.meta.url)), ".env"),
    override: false,
})

const projectId = process.env.SANITY_STUDIO_PROJECT_ID

if (!projectId) {
    throw new Error(
        "Missing SANITY_STUDIO_PROJECT_ID environment variable. Set it in apps/studio/.env."
    )
}

const dataset = process.env.SANITY_STUDIO_DATASET || "production"

export default defineCliConfig({
    api: {
        projectId,
        dataset,
    },
    deployment: {
        appId: "b3lik76redq587i6ytbktvo9",
    },
})
