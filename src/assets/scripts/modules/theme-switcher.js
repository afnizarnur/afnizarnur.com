const THEME_STORAGE_KEY = "theme"

class ThemePicker {
	constructor() {
		this.activeTheme = "default"
		this.hasLocalStorage = typeof Storage !== "undefined"
		this.init()
	}

	init() {
		const storedPreference = this.getStoredPreference()
		const systemPreference = this.getSystemPreference()

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

		return this.setTheme(nextTheme)
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

		localStorage.setItem(THEME_STORAGE_KEY, id)

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
	new ThemePicker()
}
