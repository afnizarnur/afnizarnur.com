class RecommendationCarousel {
	constructor(carouselSelector) {
		this.carousel = document.querySelector(carouselSelector)

		if (!this.carousel) {
			return
		}

		this.carouselInner = this.carousel.querySelector(".carousel-inner")
		this.prevButton = this.carousel.querySelector(".carousel-prev")
		this.nextButton = this.carousel.querySelector(".carousel-next")
		this.testimonials = Array.from(
			this.carouselInner.querySelectorAll(".carousel-slide")
		)
		this.recoGrouped = []

		// Group testimonials into pairs
		for (let i = 0; i < this.testimonials.length; i += 2) {
			this.recoGrouped.push(this.testimonials.slice(i, i + 2))
		}

		this.currentIndex = 0

		this.prevButton.addEventListener(
			"click",
			this.navigateToPrevious.bind(this)
		)
		this.nextButton.addEventListener(
			"click",
			this.navigateToNext.bind(this)
		)

		// Keyboard navigation
		this.carousel.addEventListener("keydown", (event) => {
			if (event.key === "ArrowLeft") {
				this.navigateToPrevious()
			} else if (event.key === "ArrowRight") {
				this.navigateToNext()
			}
		})

		this.showRecommendation(this.currentIndex)
	}

	showRecommendation(index) {
		const recoGroup = this.recoGrouped[index]
		this.carouselInner.innerHTML = ""

		recoGroup.forEach((testimonial) => {
			this.carouselInner.appendChild(testimonial.cloneNode(true))
		})
	}

	navigateToNext() {
		this.currentIndex = (this.currentIndex + 1) % this.recoGrouped.length
		this.showRecommendation(this.currentIndex)
	}

	navigateToPrevious() {
		this.currentIndex =
			(this.currentIndex - 1 + this.recoGrouped.length) %
			this.recoGrouped.length
		this.showRecommendation(this.currentIndex)
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new RecommendationCarousel(".carousel")
})
