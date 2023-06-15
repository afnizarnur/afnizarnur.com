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
                <svg class="icon icon--play-circle" role="img" aria-hidden="true" width="24" height="24">
                    <use xlink:href="#svg-play-circle"></use>
                </svg>
                <a href="https://open.spotify.com/user/afnizarnur" target="_blank">${songTitle} from ${artistName}</a>`
        }
    } catch (error) {
        if (!process.env.ELEVENTY_ENV === "production") {
            console.error(error)
        }
    }
}

document.addEventListener("DOMContentLoaded", displayCurrentSong)
