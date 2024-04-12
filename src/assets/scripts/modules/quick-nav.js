class QuickNav {
	constructor() {
		this.quickNav = document.querySelector(".quick-nav")
		this.navLinks = document.querySelectorAll(".quick-nav a")
		this.sections = []

		if (this.quickNav) {
			this.collectSections()
			this.sectionStart = document.getElementById("long-intro").offsetTop
			this.addEventListeners()
		}
	}

	collectSections() {
		this.navLinks.forEach((link) => {
			const sectionId = link.getAttribute("href").slice(1)
			const section = document.getElementById(sectionId)
			if (section) {
				this.sections.push({ link, section })
			}
		})
	}

	addEventListeners() {
		window.addEventListener("scroll", () => {
			this.handleScroll()
			this.updateActiveLink()
		})
	}

	handleScroll() {
		if (window.scrollY >= this.sectionStart - this.quickNav.offsetHeight) {
			this.quickNav.classList.add("show-nav")
		} else {
			this.quickNav.classList.remove("show-nav")
		}
	}

	updateActiveLink() {
		let currentSection = null
		this.sections.forEach((s) => {
			const sectionTop = s.section.offsetTop - window.innerHeight / 2 // mid-point strategy
			const sectionBottom = sectionTop + s.section.offsetHeight
			if (
				window.scrollY >= sectionTop &&
				window.scrollY < sectionBottom
			) {
				currentSection = s.link
			}
		})

		this.navLinks.forEach((link) => {
			link.parentNode.classList.remove("active")
		})

		if (currentSection) {
			currentSection.parentNode.classList.add("active")
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {
	new QuickNav()
})
