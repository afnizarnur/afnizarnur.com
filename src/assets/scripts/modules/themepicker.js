const SELECTORS = {
    toggleBtn: '.js-themepicker-toggle',
}
const CLASSES = {
    open: 'is-open',
    active: 'is-active'
}
const THEME_STORAGE_KEY = 'theme'

class ThemePicker {
    constructor() {
        this.activeTheme = 'default'
        this.hasLocalStorage = typeof Storage !== 'undefined'
        this.hasThemeColorMeta =
            !!document.querySelector('meta[name="theme-color"]') &&
            window.metaColors

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

        this.setActiveItem()
        this.bindEvents()
    }

    // bindEvents() {
    //     this.toggleBtn.addEventListener('click', () => this.togglePicker())
    //     this.closeBtn.addEventListener('click', () => this.togglePicker(false))

    //     this.navToggleBtn.addEventListener('click', () => {
    //         if (this.isOpen) {
    //             this.togglePicker(false)
    //         }
    //     })

    //     this.themeSelectBtns.forEach((btn) => {
    //         const id = btn.dataset.theme

    //         if (id) {
    //             btn.addEventListener('click', () => this.setTheme(id))
    //         }
    //     })
    // }

    // getSystemPreference() {
    //     if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //         return 'dark'
    //     }
    //     return false
    // }

    // getStoredPreference() {
    //     if (this.hasLocalStorage) {
    //         return localStorage.getItem(THEME_STORAGE_KEY)
    //     }
    //     return false
    // }


    setTheme(id) {
        this.activeTheme = id
        document.documentElement.setAttribute('data-theme', id)

        if (this.hasLocalStorage) {
            localStorage.setItem(THEME_STORAGE_KEY, id)
        }
        if (this.hasThemeColorMeta) {
            const metaColor = window.metaColors[id]
            const metaTag = document.querySelector('meta[name="theme-color"]')
            metaTag.setAttribute('content', metaColor)
        }

        this.setActiveItem()
    }
}

if (window.CSS && CSS.supports('color', 'var(--fake-var)')) {
    new ThemePicker()
}
