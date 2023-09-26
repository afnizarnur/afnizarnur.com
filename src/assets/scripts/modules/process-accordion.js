class ProcessAccordion {
	constructor(containerSelector) {
		this.container = document.querySelector(containerSelector)

		if (!this.container) {
			return
		}

		this.accordionItems = this.container.querySelectorAll(
			".process-accordion--item"
		)

		this.accordionItems.forEach((button, index) => {
			button.addEventListener("click", () => {
				this.toggleAccordionItem(index)
			})
		})
	}

	toggleAccordionItem(index) {
		const item = this.accordionItems[index]
		const content = item.querySelector(".process-accordion--content")
		const chevronIcon = item.querySelector(".icon--chevron-down")

		if (item.classList.contains("active")) {
			content.style.display = "none"
			item.classList.remove("active")
			item.setAttribute("aria-expanded", "false")
			chevronIcon.style.transform = "rotate(0deg)"
		} else {
			content.style.display = "block"
			item.classList.add("active")
			item.setAttribute("aria-expanded", "true")
			chevronIcon.style.transform = "rotate(180deg)"
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const processAccordion = new ProcessAccordion(".process--list-wrapper")
})
