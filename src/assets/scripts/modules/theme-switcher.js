const THEME_PREFERENCE_KEY = "themePreference"

class ThemeSwitcher {
	constructor() {
		this.activeTheme = "default"
		this.followSystemTheme = true
		this.hasLocalStorage = typeof Storage !== "undefined"
		this.switchCheckbox = document.getElementById("switch-system")
		this.themeButtons = document.querySelectorAll(".theme-button")
		this.init()
	}

	init() {
		this.loadPreferences()
		this.applyTheme()
		this.bindEvents()

		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", (e) => {
				if (this.followSystemTheme) {
					this.activeTheme = e.matches ? "dark" : "default"
					this.applyTheme()
					this.savePreferences()
				}
			})
	}

	loadPreferences() {
		if (this.hasLocalStorage) {
			const preference = localStorage.getItem(THEME_PREFERENCE_KEY)
			if (preference) {
				const { theme, followSystem } = JSON.parse(preference)
				this.activeTheme = theme || this.activeTheme
				this.followSystemTheme = followSystem
				if (followSystem) {
					const systemTheme = this.getSystemPreference()
					this.activeTheme = systemTheme
				}
			} else {
				this.savePreferences()
			}
		}
		this.updateCheckbox()
	}

	savePreferences() {
		if (this.hasLocalStorage) {
			const preference = JSON.stringify({
				theme: this.activeTheme,
				followSystem: this.followSystemTheme
			})
			localStorage.setItem(THEME_PREFERENCE_KEY, preference)
		}
	}

	updateCheckbox() {
		this.switchCheckbox.checked = this.followSystemTheme
	}

	bindEvents() {
		const toggleMobileMenu = document.querySelector(
			".js-themeswitcher-toggle-menu"
		)
		const toggleContact = document.querySelector(
			".js-themeswitcher-toggle-contact"
		)

		if (toggleMobileMenu) {
			toggleMobileMenu.addEventListener("click", () => {
				this.themeRoller(this.activeTheme)
				this.switchCheckbox.checked = false
			})
		}

		if (toggleContact) {
			toggleContact.addEventListener("click", () => {
				this.themeRoller(this.activeTheme)
				this.switchCheckbox.checked = false
			})
		}

		this.themeButtons.forEach((button) => {
			button.addEventListener("click", (event) => {
				const theme = button.dataset.theme
				this.activeTheme = theme
				this.followSystemTheme = false
				this.applyTheme()
				this.savePreferences()
				this.updateCheckbox()
			})
		})

		this.switchCheckbox.addEventListener("change", () => {
			this.followSystemTheme = this.switchCheckbox.checked
			if (this.followSystemTheme) {
				this.activeTheme = this.getSystemPreference() || "default"
			}
			this.applyTheme()
			this.savePreferences()
		})
	}

	applyTheme() {
		document.documentElement.setAttribute("data-theme", this.activeTheme)
		this.updateThemeButtons()
	}

	updateThemeButtons() {
		this.themeButtons.forEach((button) => {
			const existingBadge = button.querySelector(".theme-selected")
			if (existingBadge) {
				existingBadge.remove()
			}
			if (button.dataset.theme === this.activeTheme) {
				const selectedBadge = document.createElement("span")
				selectedBadge.classList.add("theme-selected")
				selectedBadge.innerHTML =
					'<small class="helper">Selected</small>'
				button.appendChild(selectedBadge)
			}
		})
	}

	themeRoller(theme) {
		let nextTheme
		switch (theme) {
			case "default":
				nextTheme = "dark"
				break
			case "dark":
				nextTheme = "gray"
				break
			case "gray":
				nextTheme = "pink"
				break
			case "pink":
				nextTheme = "blue"
				break
			default:
				nextTheme = "default"
		}
		this.activeTheme = nextTheme
		this.applyTheme()
		this.savePreferences()
		this.updateCheckbox()
	}

	getSystemPreference() {
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "default"
	}
}

if (window.CSS && CSS.supports("color", "var(--fake-var)")) {
	new ThemeSwitcher()
}
