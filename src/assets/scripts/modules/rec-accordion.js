class RecommendationAccordion {
	constructor(containerSelector) {
		this.container = document.querySelector(containerSelector)

		if (!this.container) {
			return
		}

		this.showMore = this.container.querySelector(".show-more")
		this.showMoreLink = this.container.querySelector(".show-more-link")
		this.accordionWrapper =
			this.container.querySelector(".accordion-wrapper")

		this.showMoreLink.addEventListener(
			"click",
			this.handleShowMoreClick.bind(this)
		)
	}

	handleShowMoreClick(event) {
		event.preventDefault()
		this.expandAccordion()
		this.hideShowMore()
	}

	expandAccordion() {
		this.accordionWrapper.style.height = "auto"
	}

	hideShowMore() {
		this.showMore.style.display = "none"
	}
}

const initRecommendationAccordion = () => {
	document.addEventListener("DOMContentLoaded", function () {
		const recommendationAccordion = new RecommendationAccordion(
			".recommendation--accordion"
		)
	})
}

export default initRecommendationAccordion
