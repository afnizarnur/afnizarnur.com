/**
 * @author afnizarnur
 * @email afnizarhilmi@gmail.com
 * @create date 04-07-2023 22:28:21
 * @modify date 04-07-2023 22:28:21
 * @desc Recommendation accordion
 */

class RecommendationAccordion {
	constructor(containerSelector) {
		this.container = document.querySelector(containerSelector)
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

document.addEventListener("DOMContentLoaded", function () {
	const recommendationAccordion = new RecommendationAccordion(
		".recommendation--accordion"
	)
})
