/**
 * @author afnizarnur
 * @email afnizarhilmi@gmail.com
 * @create date 02-07-2023 10:01:00
 * @modify date 02-07-2023 10:01:00
 * @desc Recommendation carousel
 */

class RecommendationCarousel {
	constructor(carouselSelector) {
		this.carousel = document.querySelector(carouselSelector)

		if (!this.carousel) {
			return
		}

		this.carouselInner = this.carousel.querySelector(".carousel-inner")
		this.carouselFooter = this.carousel.querySelector(".carousel-footer")
		this.prevButton = this.carousel.querySelector(".carousel-prev")
		this.nextButton = this.carousel.querySelector(".carousel-next")
		this.recomendations = Array.from(
			this.carouselInner.querySelectorAll(".carousel-slide")
		)
		this.itemsPerSlide = this.getItemsPerSlide()
		this.recoGrouped = this.groupRecommendation()
		this.currentIndex = 0

		if (this.prevButton && this.nextButton) {
			this.prevButton.addEventListener(
				"click",
				this.navigateToPrevious.bind(this)
			)
			this.nextButton.addEventListener(
				"click",
				this.navigateToNext.bind(this)
			)

			if (this.itemsPerSlide >= 2) {
				if (window.innerWidth >= 768) {
					this.carouselFooter.style.display = "none"
				} else {
					this.carouselFooter.style.display = "flex"
				}
			}
		}

		this.carousel.addEventListener("keydown", (event) => {
			if (event.key === "ArrowLeft") {
				this.navigateToPrevious()
			} else if (event.key === "ArrowRight") {
				this.navigateToNext()
			}
		})

		this.showRecommendation(this.currentIndex)
		this.handleResize()
		window.addEventListener("resize", this.handleResize.bind(this))
	}

	getItemsPerSlide() {
		return window.innerWidth >= 768 ? 2 : 1
	}

	groupRecommendation() {
		const grouped = []
		for (
			let i = 0;
			i < this.recomendations.length;
			i += this.itemsPerSlide
		) {
			const group = this.recomendations.slice(i, i + this.itemsPerSlide)
			grouped.push(group)
		}
		return grouped
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

	handleResize() {
		const newItemsPerSlide = this.getItemsPerSlide()
		if (newItemsPerSlide !== this.itemsPerSlide) {
			this.itemsPerSlide = newItemsPerSlide
			this.recoGrouped = this.groupRecommendation()
			this.currentIndex = 0
			this.showRecommendation(this.currentIndex)
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new RecommendationCarousel(".carousel")
})
