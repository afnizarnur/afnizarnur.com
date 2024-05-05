const axios = require("axios")
const dotenv = require("dotenv")
dotenv.config()

let nonExplicitSongData = null

exports.handler = async (event, context) => {
	try {
		const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
		const auth = Buffer.from(
			`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
		).toString("base64")
		const tokenEndpoint = "https://accounts.spotify.com/api/token"
		const playerEndpoint =
			"https://api.spotify.com/v1/me/player/recently-played"

		const options = {
			method: "POST",
			headers: {
				Authorization: `Basic ${auth}`,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: `grant_type=refresh_token&refresh_token=${refreshToken}&redirect_uri=${encodeURI(
				process.env.URL + "/.netlify/functions/callback"
			)}`
		}

		const {
			data: { access_token: accessToken }
		} = await axios(tokenEndpoint, options)

		const response = await axios.get(`${playerEndpoint}?limit=1`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})

		const isExplicit = response.data.items[0].track.explicit

		if (isExplicit && !nonExplicitSongData) {
			return {
				statusCode: 204
			}
		}

		const {
			artists: artistsArray,
			name,
			external_urls: urls
		} = response.data.items[0].track
		const artists = artistsArray.map((artist) => ({
			name: artist.name,
			url: artist.href
		}))
		const url = urls.spotify

		nonExplicitSongData = { artists, name, url }

		return {
			statusCode: 200,
			body: JSON.stringify(nonExplicitSongData)
		}
	} catch (err) {
		if (process.env.ELEVENTY_ENV === "development") {
			console.error(err)
		}

		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Internal Server Error" })
		}
	}
}
