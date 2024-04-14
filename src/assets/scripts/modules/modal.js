function initializeModal(modalElement, modalButton, closeButton, modalOverlay) {
	const modal = document.querySelector(modalElement)
	const button = document.querySelector(modalButton)
	const content = document.querySelector(closeButton)
	const overlay = document.querySelector(modalOverlay)

	if (!modal || !button || !content || !overlay) {
		return
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

	content.addEventListener("click", closeModal)

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

initializeModal(".modal", ".modal-button", ".modal--content", ".modal--overlay")
