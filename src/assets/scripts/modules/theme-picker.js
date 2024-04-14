/**
 * @author afnizarnur
 * @email hi@afnizarnur.com
 * @create date 02-07-2023 10:07:59
 * @modify date 02-07-2023 10:07:59
 * @desc Theme picker component
 */

const CLASSES = {
	open: "is-open",
	active: "is-active"
}

const THEME_STORAGE_KEY = "theme"

class ThemePicker {
	constructor() {
		this.activeTheme = "default"
		this.hasLocalStorage = typeof Storage !== "undefined"
		this.toggleBtn = document.querySelector(".js-themepicker-toggle")
		this.toggleBtnMenu = document.querySelector(
			".js-themepicker-toggle-menu"
		)
		this.toggleBtnContact = document.querySelector(
			".js-themepicker-toggle-contact"
		)
		this.init()
	}

	init() {
		const systemPreference = this.getSystemPreference()
		const storedPreference = this.getStoredPreference()

		if (storedPreference) {
			this.activeTheme = storedPreference
		} else if (systemPreference) {
			this.activeTheme = systemPreference
		}

		this.bindEvents()
	}

	bindEvents() {
		// Main navigation
		if (this.toggleBtn) {
			this.toggleBtn.addEventListener("click", () =>
				this.themeRoller(this.activeTheme)
			)
		}

		// Mobile menu
		if (this.toggleBtnMenu) {
			this.toggleBtnMenu.addEventListener("click", () =>
				this.themeRoller(this.activeTheme)
			)
		}

		// Illustration contact
		if (this.toggleBtnContact) {
			this.toggleBtnContact.addEventListener("click", () =>
				this.themeRoller(this.activeTheme)
			)
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

		if (this.hasLocalStorage) {
			localStorage.setItem(THEME_STORAGE_KEY, id)
		}
	}
}

if (window.CSS && CSS.supports("color", "var(--fake-var)")) {
	new ThemePicker()
}
