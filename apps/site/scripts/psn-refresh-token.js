#!/usr/bin/env node

/**
 * PSN Refresh Token Script
 *
 * Exchanges an NPSSO token for a long-lived refresh token using the psn-api package.
 * Run this after obtaining your NPSSO token to generate PSN_REFRESH_TOKEN for .env.local.
 *
 * Usage:
 *   1. Add PSN_NPSSO_TOKEN to your environment or have it in apps/site/.env.local
 *   2. Run: node scripts/psn-refresh-token.js
 *   3. Copy the refresh token output into your .env.local file
 */

import { resolve } from "node:path"
import { createInterface } from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"
import { fileURLToPath } from "node:url"
import { config } from "dotenv"
import { exchangeAccessCodeForAuthTokens, exchangeNpssoForAccessCode } from "psn-api"

const scriptDir = fileURLToPath(new URL(".", import.meta.url))

// Load environment variables from potential locations
config({ path: resolve(process.cwd(), ".env.local") })
config({ path: resolve(process.cwd(), ".env") })
config({ path: resolve(scriptDir, "../.env.local") })
config({ path: resolve(scriptDir, "../.env") })

function renderDivider() {
    console.log("=".repeat(60))
}

async function promptForNpsso(existingToken) {
    const rl = createInterface({ input, output, terminal: true })

    try {
        if (existingToken) {
            console.log("Using PSN_NPSSO_TOKEN from environment\n")
            return existingToken
        }

        console.log("PSN_NPSSO_TOKEN not found in environment.")
        console.log("Paste your NPSSO token (input is visible):")
        const npsso = (await rl.question("> ")).trim()
        console.log()

        if (!npsso) {
            throw new Error("NPSSO token is required to continue")
        }

        return npsso
    } finally {
        rl.close()
    }
}

async function main() {
    console.log("\n[PSN] Refresh Token Helper\n")

    const existingRefresh = process.env.PSN_REFRESH_TOKEN
    if (existingRefresh) {
        console.log("Warning: Detected PSN_REFRESH_TOKEN in environment. Generating a new token")
        console.log("will not invalidate it, but replace the old value in your .env.local if you use the new token.\n")
    }

    const npssoToken = await promptForNpsso(process.env.PSN_NPSSO_TOKEN)

    console.log("Exchanging NPSSO token for access code...")
    const accessCode = await exchangeNpssoForAccessCode(npssoToken)

    console.log("Exchanging access code for auth tokens...")
    const authorization = await exchangeAccessCodeForAuthTokens(accessCode)

    const { refreshToken, refreshTokenExpiresIn } = authorization

    if (!refreshToken) {
        throw new Error("No refresh token returned. Verify your NPSSO token and try again.")
    }

    console.log("\nAuthorization successful!\n")
    console.log("Add this to your apps/site/.env.local file:\n")
    renderDivider()
    console.log(`PSN_REFRESH_TOKEN=${refreshToken}`)
    renderDivider()
    console.log()

    if (typeof refreshTokenExpiresIn === "number") {
        const days = (refreshTokenExpiresIn / 86400).toFixed(2)
        console.log(`Refresh token expires in approximately ${days} days (${refreshTokenExpiresIn} seconds).\n`)
    }

    console.log("Keep your refresh token safe. When it expires, rerun this script with a fresh NPSSO token.\n")
}

main().catch((error) => {
    console.error("\nError:", error.message ?? error)
    process.exit(1)
})
