const THEME_STORAGE_KEY = "theme"

class ThemeSwitcher {
	constructor() {
		this.activeTheme = "default"
		this.hasLocalStorage = typeof Storage !== "undefined"
		this.toggleMobileMenu = document.querySelector(
			".js-themeswitcher-toggle-menu"
		)
		this.toggleContact = document.querySelector(
			".js-themeswitcher-toggle-contact"
		)
		this.switchCheckbox = document.getElementById("switch-system")
		this.init()
	}

	init() {
		const storedPreference = this.getStoredPreference()
		const systemPreference = this.getSystemPreference()
		const switchCheckbox = document.getElementById("switch-system")

		if (storedPreference) {
			this.activeTheme = storedPreference
		} else if (systemPreference) {
			this.activeTheme = systemPreference
		} else {
			this.activeTheme = "default"
		}

		this.bindEvents()
		this.setTheme(this.activeTheme)

		const prefersDarkMode = window.matchMedia(
			"(prefers-color-scheme: dark)"
		)

		prefersDarkMode.addEventListener("change", () => {
			const newTheme = prefersDarkMode.matches ? "dark" : "default"
			this.setTheme(newTheme)
		})
	}

	bindEvents() {
		const themeButtons = document.querySelectorAll(".theme-button")
		const switchCheckbox = document.getElementById("switch-system")
		const toggleMobileMenu = document.querySelector(
			".js-themeswitcher-toggle-menu"
		)
		const toggleContact = document.querySelector(
			".js-themeswitcher-toggle-contact"
		)

		themeButtons.forEach((button) => {
			button.addEventListener("click", () => {
				const theme = button.dataset.theme
				this.setTheme(theme)
				switchCheckbox.checked = false
			})
		})

		switchCheckbox.addEventListener("change", () => {
			if (switchCheckbox.checked) {
				const systemPreference = this.getSystemPreference()
				this.activeTheme = systemPreference || "default"
			} else {
				const storedPreference = this.getStoredPreference()
				this.activeTheme = storedPreference || "default"
			}
			this.setTheme(this.activeTheme)
		})

		if (toggleMobileMenu) {
			toggleMobileMenu.addEventListener("click", () => {
				this.themeRoller(this.activeTheme)
				switchCheckbox.checked = false
			})
		}

		if (toggleContact) {
			toggleContact.addEventListener("click", () => {
				this.themeRoller(this.activeTheme)
				switchCheckbox.checked = false
			})
		}
	}

	themeRoller(theme) {
		let nextTheme

		if (theme === "default") {
			nextTheme = "dark"
		} else if (theme === "dark") {
			nextTheme = "gray"
		} else if (theme === "gray") {
			nextTheme = "pink"
		} else if (theme === "pink") {
			nextTheme = "blue"
		} else {
			nextTheme = "default"
		}

		this.setTheme(nextTheme)
	}

	getSystemPreference() {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return "dark"
		}

		return false
	}

	getStoredPreference() {
		if (this.hasLocalStorage) {
			return localStorage.getItem(THEME_STORAGE_KEY)
		}

		return false
	}

	setTheme(id) {
		this.activeTheme = id
		document.documentElement.setAttribute("data-theme", id)

		if (this.hasLocalStorage) {
			localStorage.setItem(THEME_STORAGE_KEY, id)
		}

		const currentSelected = document.querySelector(
			`.theme-button[data-theme="${id}"]`
		)
		const themeButtons = document.querySelectorAll(".theme-button")

		themeButtons.forEach((button) => {
			const existingBadge = button.querySelector(".theme-selected")
			if (existingBadge) {
				existingBadge.remove()
			}
		})

		if (currentSelected) {
			const selectedBadge = document.createElement("span")
			selectedBadge.classList.add("theme-selected")
			selectedBadge.innerHTML = '<small class="helper">Selected</small>'

			currentSelected.appendChild(selectedBadge)
		}
	}
}

if (window.CSS && CSS.supports("color", "var(--fake-var)")) {
	new ThemeSwitcher()
}
