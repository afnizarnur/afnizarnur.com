/**
 * @author afnizarnur
 * @email hi@afnizarnur.com
 * @create date 02-07-2023 10:05:25
 * @modify date 02-07-2023 10:05:25
 * @desc Copy to clipboard functionality
 */

class Clipboard {
	constructor(email) {
		this.email = email
		this.button = document.querySelector(".copy-email")
		if (this.button) {
			this.button.addEventListener(
				"click",
				this.copyToClipboard.bind(this)
			)
		}
	}

	copyToClipboard() {
		if (!this.button) {
			return
		}

		navigator.clipboard
			.writeText(this.email)
			.then(() => {
				this.updateButtonText("email address copied!")
				setTimeout(() => {
					this.updateButtonText(
						`reach out to me via email<svg class="icon icon--copy" role="img" aria-hidden="true"><use xlink:href="#svg-copy"></use></svg>`
					)
				}, 1500)
			})
			.catch((error) => {
				console.error("Failed to copy text: ", error)
			})
	}

	updateButtonText(text) {
		if (this.button) {
			const span = document.createElement("span")
			span.innerHTML = text
			this.button.innerHTML = ""
			this.button.appendChild(span)
		}
	}
}

const initClipboard = (email) => {
	const clipboard = new Clipboard(email)
}

export default initClipboard
