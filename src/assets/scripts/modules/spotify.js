// spotify.js

import axios from "axios"

async function getCurrentPlayingSong() {
    const accessToken = "YOUR_SPOTIFY_ACCESS_TOKEN"
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    }

    try {
        const response = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
                headers: headers
            }
        )

        if (response.status !== 200) {
            throw new Error(
                "Failed to fetch currently playing song from Spotify API"
            )
        }

        const data = response.data
        return data.item
    } catch (error) {
        throw new Error(
            "Failed to fetch currently playing song from Spotify API"
        )
    }
}

async function displayCurrentSong() {
    try {
        const { songTitle, artistName } = await getCurrentPlayingSong()
        const paragraph = document.getElementById("current-song")
        paragraph.textContent = `${songTitle} from ${artistName}`
    } catch (error) {
        console.error(error)
    }
}

displayCurrentSong() // Invoke the function immediately when the script loads
