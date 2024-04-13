const modalButton = document.querySelector(".modal-button")
const modal = document.querySelector(".modal")
const closeButton = document.querySelector(".close-button-modal")
const modalOverlay = document.querySelector(".modal-overlay")
const body = document.body

const openModal = () => {
	modal.style.display = "block"
	modal.setAttribute("aria-hidden", "false")
	closeButton.focus()
	body.style.overflow = "hidden"
}

const closeModal = () => {
	modal.style.display = "none"
	modal.setAttribute("aria-hidden", "true")
	modalButton.focus()
	body.style.overflow = ""
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
