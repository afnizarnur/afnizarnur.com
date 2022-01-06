import { createFocusTrap } from "focus-trap"

const SELECTORS = {
    nav: ".nav__mobile-nav",
    header: ".header",
    toggleBtn: ".js-nav-toggle"
}

const CLASSES = {
    open: "is-open"
}

class Navigation {
    constructor() {
        this.isOpen = false

        this.nav = document.querySelector(SELECTORS.nav)
        this.toggleBtn = document.querySelector(SELECTORS.toggleBtn)
        this.header = document.querySelector(SELECTORS.header)
        this.focusTrap = createFocusTrap(this.nav)

        this.toggleBtn.addEventListener("click", () => this.toggleMenu())
    }

    toggleMenu(force) {
        this.isOpen = typeof force === "boolean" ? force : !this.isOpen

        this.nav.classList.toggle(CLASSES.open, this.isOpen)
        this.header.classList.toggle(CLASSES.open, this.isOpen)
        this.toggleBtn.classList.toggle(CLASSES.open, this.isOpen)
        this.toggleBtn.setAttribute("aria-expanded", String(this.isOpen))

        if (this.isOpen) {
            //     this.focusTrap.activate()
            document.getElementsByTagName("body")[0].style =
                "overflow: hidden; height: 100vh;"
        } else {
            //     this.focusTrap.deactivate()
            document.getElementsByTagName("body")[0].style = "overflow: visible"
        }
    }
}

if (document.querySelector(SELECTORS.nav)) {
    new Navigation()
}