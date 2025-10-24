#!/usr/bin/env node

/**
 * Spotify Authorization Script
 *
 * This script helps you get the refresh token needed for the Now Playing widget.
 * Run this once to authorize your Spotify account and get the refresh token.
 *
 * Usage:
 *   1. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your .env or .env.local
 *   2. Run: node scripts/spotify-auth.js
 *   3. Follow the prompts to authorize your account
 *   4. Copy the refresh token to your .env or .env.local
 */

import http from "http"
import { URL } from "url"
import { config } from "dotenv"
import { resolve } from "path"

// Load environment variables from .env.local and .env
config({ path: resolve(process.cwd(), ".env.local") })
config({ path: resolve(process.cwd(), ".env") })

const PORT = process.env.SPOTIFY_AUTH_PORT || 3002
const REDIRECT_URI = `http://localhost:${PORT}/callback`
const SCOPES = ["user-read-recently-played"]

// Load environment variables
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error("\n❌ Error: Missing Spotify credentials")
    console.error("Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your .env or .env.local file\n")
    process.exit(1)
}

// Generate authorization URL
function getAuthUrl() {
    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        scope: SCOPES.join(" "),
    })
    return `https://accounts.spotify.com/authorize?${params.toString()}`
}

// Exchange authorization code for refresh token
async function getRefreshToken(code) {
    const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: REDIRECT_URI,
        }),
    })

    if (!response.ok) {
        const error = await response.text()
        throw new Error(`Failed to get token: ${error}`)
    }

    return response.json()
}

// Start local server to receive callback
function startCallbackServer() {
    return new Promise((resolve, reject) => {
        const server = http.createServer(async (req, res) => {
            const url = new URL(req.url, `http://${req.headers.host}`)

            if (url.pathname === "/callback") {
                const code = url.searchParams.get("code")
                const error = url.searchParams.get("error")

                if (error) {
                    res.writeHead(400, { "Content-Type": "text/html" })
                    res.end(`<html><body><h1>Authorization Failed</h1><p>${error}</p></body></html>`)
                    server.close()
                    reject(new Error(error))
                    return
                }

                if (!code) {
                    res.writeHead(400, { "Content-Type": "text/html" })
                    res.end("<html><body><h1>Error</h1><p>No authorization code received</p></body></html>")
                    server.close()
                    reject(new Error("No code received"))
                    return
                }

                try {
                    const tokenData = await getRefreshToken(code)

                    res.writeHead(200, { "Content-Type": "text/html" })
                    res.end(`
                        <html>
                        <body style="font-family: monospace; padding: 2rem;">
                            <h1 style="color: #1DB954;">✓ Success!</h1>
                            <p>Authorization successful. You can close this window.</p>
                            <p>Check your terminal for the refresh token.</p>
                        </body>
                        </html>
                    `)

                    server.close()
                    resolve(tokenData)
                } catch (err) {
                    res.writeHead(500, { "Content-Type": "text/html" })
                    res.end(`<html><body><h1>Error</h1><p>${err.message}</p></body></html>`)
                    server.close()
                    reject(err)
                }
            }
        })

        server.listen(PORT, () => {
            console.log("\n🎵 Spotify Authorization\n")
            console.log("1. A browser window will open")
            console.log("2. Log in to Spotify and authorize the app")
            console.log("3. You'll be redirected back to get your refresh token\n")
            console.log(`Listening on port ${PORT}...\n`)
            console.log("Opening browser...\n")

            const authUrl = getAuthUrl()
            console.log("If browser doesn't open, visit this URL:")
            console.log(authUrl)
            console.log()

            // Try to open browser
            import("child_process").then(({ exec }) => {
                const start =
                    process.platform === "darwin"
                        ? "open"
                        : process.platform === "win32"
                          ? "start"
                          : "xdg-open"
                exec(`${start} "${authUrl}"`)
            })
        })

        server.on("error", (err) => {
            reject(err)
        })
    })
}

// Main function
async function main() {
    try {
        const tokenData = await startCallbackServer()

        console.log("\n✓ Authorization successful!\n")
        console.log("Add this to your .env or .env.local file:\n")
        console.log("━".repeat(60))
        console.log(`SPOTIFY_REFRESH_TOKEN=${tokenData.refresh_token}`)
        console.log("━".repeat(60))
        console.log()
    } catch (error) {
        console.error("\n❌ Error:", error.message)
        process.exit(1)
    }
}

main()
