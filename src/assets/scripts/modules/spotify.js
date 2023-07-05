/**
 * @author afnizarnur
 * @email afnizarhilmi@gmail.com
 * @create date 02-07-2023 10:05:55
 * @modify date 02-07-2023 10:05:55
 * @desc Spotify component fetcher
 */

class SpotifyFetcher {
	constructor() {
		this.paragraph = document.getElementById("current-song")
		if (this.paragraph) {
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
			})
			.catch((error) => {
				console.error(error)
			})
	}

	updateParagraph(songTitle, artistName, url) {
		if (this.paragraph) {
			this.paragraph.innerHTML = `
            <div class="equalizer-container">
              <div class="equalizer-bar"></div>
              <div class="equalizer-bar"></div>
              <div class="equalizer-bar"></div>
            </div>
            <a href="${url}" data-umami-event="footer-spotify" target="_blank">${songTitle} by ${artistName}</a>`
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new SpotifyFetcher()
})
