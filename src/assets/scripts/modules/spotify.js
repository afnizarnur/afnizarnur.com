import axios from "axios"

async function getRecentlyPlayedTrack() {
    const accessToken = process.env.SPOTIFY_ACCESS_TOKEN

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    }

    try {
        const response = await axios.get(
            "https://api.spotify.com/v1/me/player/recently-played?limit=1",
            {
                headers: headers
            }
        )

        if (response.status !== 200) {
            if (!process.env.ELEVENTY_ENV === "production") {
                throw new Error(
                    "Failed to fetch recently played track from Spotify API"
                )
            }
        }

        const data = response.data
        if (data.items.length === 0) {
            return null
        }

        const track = data.items[0].track
        const songTitle = track.name
        const artistName = track.artists[0].name
        return { songTitle, artistName }
    } catch (error) {
        if (!process.env.ELEVENTY_ENV === "production") {
            throw new Error(
                "Failed to fetch recently played track from Spotify API"
            )
        }
    }
}

async function displayCurrentSong() {
    try {
        const trackInfo = await getRecentlyPlayedTrack()
        if (trackInfo) {
            const { songTitle, artistName } = trackInfo
            const paragraph = document.getElementById("current-song")
            paragraph.innerHTML = `
                <div class="equalizer-container">
                    <div class="equalizer-bar"></div>
                    <div class="equalizer-bar"></div>
                    <div class="equalizer-bar"></div>
                </div>
                <a href="https://open.spotify.com/user/afnizarnur" target="_blank">${songTitle} by ${artistName}</a>`
        }
    } catch (error) {
        if (!process.env.ELEVENTY_ENV === "production") {
            console.error(error)
        }
    }
}

document.addEventListener("DOMContentLoaded", displayCurrentSong)
