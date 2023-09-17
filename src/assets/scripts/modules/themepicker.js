const SELECTORS = {
    toggleBtn: ".js-themepicker-toggle"
}
const CLASSES = {
    open: "is-open",
    active: "is-active"
}
const THEME_STORAGE_KEY = "theme"

class ThemePicker {
    constructor() {
        this.activeTheme = "default"
        this.hasLocalStorage = typeof Storage !== "undefined"
        this.toggleBtn = document.querySelector(SELECTORS.toggleBtn)
        this.toggleBtnMenu = document.querySelector(
            ".js-themepicker-toggle-menu"
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
        this.toggleBtn.addEventListener("click", () =>
            this.themeRoller(this.activeTheme)
        )

        this.toggleBtnMenu.addEventListener("click", () =>
            this.themeRoller(this.activeTheme)
        )
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
            nextTheme = "hacker"
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
