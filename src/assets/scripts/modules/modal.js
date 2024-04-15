function initializeModal(modalIdentifier) {
	const modal = document.querySelector(`.${modalIdentifier}`)
	const button = document.querySelector(`.${modalIdentifier}-button`)
	const content = modal.querySelector(`.${modalIdentifier}--content`)
	const closeButton = content.querySelector(
		`.${modalIdentifier}--close-button`
	)
	const overlay = modal.querySelector(`.${modalIdentifier}--overlay`)

	if (!modal || !button || !content || !closeButton || !overlay) {
		return
	}

	const openModal = () => {
		modal.style.display = "block"
		modal.setAttribute("aria-hidden", "false")
		document.body.style.overflow = "hidden"
	}

	const closeModal = () => {
		const mediaQuery = window.matchMedia("(max-width: 480px)")

		if (mediaQuery.matches) {
			content.style.animation = "slideOutToBottom 0.4s ease-in forwards"
		} else {
			content.style.animation = "slideOutToTop 0.4s ease-in forwards"
		}

		overlay.style.animation = "hideModal 0.4s ease-in"

		setTimeout(() => {
			modal.style.display = "none"
			modal.setAttribute("aria-hidden", "true")
			document.body.style.overflow = ""
			content.style.animation = ""
			overlay.style.animation = ""
		}, 400)
	}

	button.addEventListener("click", openModal)

	closeButton.addEventListener("click", closeModal)

	overlay.addEventListener("click", (e) => {
		if (e.target === overlay) {
			closeModal()
		}
	})

	modal.addEventListener("keydown", (e) => {
		if (e.key === "Escape" || e.keyCode === 27) {
			closeModal()
		}
	})
}

initializeModal("modal-theme-switcher")
