const modal = document.querySelector(".modal")
const modalButton = document.querySelector(".modal-button")
const modalContent = document.querySelector(".modal--content")
const closeButton = document.querySelector(".modal--close-button")
const modalOverlay = document.querySelector(".modal--overlay")

const openModal = () => {
	modal.style.display = "block"
	modal.setAttribute("aria-hidden", "false")
	closeButton.focus()
	document.body.style.overflow = "hidden"
}

const closeModal = () => {
	modalContent.style.animation = "slideOutToTop 0.3s ease-out forwards"
	modalOverlay.style.animation = "hideModal 0.3s ease-out"

	setTimeout(() => {
		modal.style.display = "none"
		modal.setAttribute("aria-hidden", "true")
		modalButton.focus()
		document.body.style.overflow = ""
		modalContent.style.animation = ""
		modalOverlay.style.animation = ""
	}, 300)
}

modalButton.addEventListener("click", openModal)

closeButton.addEventListener("click", closeModal)

modalOverlay.addEventListener("click", (e) => {
	if (e.target === modalOverlay) {
		closeModal()
	}
})

modal.addEventListener("keydown", (e) => {
	if (e.key === "Escape" || e.keyCode === 27) {
		closeModal()
	}
})

export { openModal, closeModal }
