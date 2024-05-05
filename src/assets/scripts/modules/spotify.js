class SpotifyFetcher {
	constructor() {
		this.paragraph = document.getElementById("current-song")
		if (this.paragraph) {
			this.updateFromLocalStorage()
			this.fetchSpotify()
		}
	}

	fetchSpotify() {
		fetch("/.netlify/functions/spotify")
			.then((res) => res.json())
			.then((data) => {
				const songTitle = data.name
				const artistName = data.artists[0].name
				const url = data.url
				this.updateParagraph(songTitle, artistName, url)

				if (songTitle !== "Explicit Content") {
					localStorage.setItem(
						"spotifyData",
						JSON.stringify({ songTitle, artistName, url })
					)
				}
			})

			.catch((error) => {
				if (process.env.ELEVENTY_ENV === "production") {
					console.error(error)
				}
			})
	}

	updateFromLocalStorage() {
		const storedData = JSON.parse(localStorage.getItem("spotifyData"))
		if (storedData) {
			this.updateParagraph(
				storedData.songTitle,
				storedData.artistName,
				storedData.url
			)
		}
	}

	updateParagraph(songTitle, artistName, url) {
		if (this.paragraph) {
			this.paragraph.innerHTML = `
		  <div class="equalizer-container">
			<div class="equalizer-bar"></div>
			<div class="equalizer-bar"></div>
			<div class="equalizer-bar"></div>
		  </div>
		  <a href="${url}" data-umami-event="userinfo-spotify" target="_blank">${songTitle} by ${artistName}</a>`
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new SpotifyFetcher()
})
