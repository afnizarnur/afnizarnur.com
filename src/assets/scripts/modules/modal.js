function initializeModal(modalIdentifier) {
	const modal = document.querySelector(`.${modalIdentifier}`)
	const button = document.querySelector(`.${modalIdentifier}-button`)
	const content = modal.querySelector(`.${modalIdentifier}--content`)
	const closeButton = content.querySelector(
		`.${modalIdentifier}--close-button`
	)
	const overlay = modal.querySelector(`.${modalIdentifier}--overlay`)

	if (!modal || !button || !content || !closeButton || !overlay) {
		return /
	}

	const openModal = () => {
		modal.style.display = "block"
		modal.setAttribute("aria-hidden", "false")
		document.body.style.overflow = "hidden"
	}

	const closeModal = () => {
		content.style.animation = "slideOutToTop 0.3s ease-out forwards"
		overlay.style.animation = "hideModal 0.3s ease-out"

		setTimeout(() => {
			modal.style.display = "none"
			modal.setAttribute("aria-hidden", "true")
			document.body.style.overflow = ""
			content.style.animation = ""
			overlay.style.animation = ""
		}, 300)
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
