function initClipboard(email) {
	const button = document.querySelector(".copy-email")

	if (!button) return

	button.addEventListener("click", function () {
		navigator.clipboard
			.writeText(email)
			.then(() => {
				updateButtonText(button, "email address copied!")
				setTimeout(() => {
					updateButtonText(
						button,
						`reach out to me via email<svg class="icon icon--copy" role="img" aria-hidden="true"><use xlink:href="#svg-copy"></use></svg>`
					)
				}, 1500)
			})
			.catch((error) => {
				console.error("Failed to copy text: ", error)
			})
	})
}

function updateButtonText(button, text) {
	const span = document.createElement("span")
	span.innerHTML = text
	button.innerHTML = ""
	button.appendChild(span)
}

export default initClipboard
