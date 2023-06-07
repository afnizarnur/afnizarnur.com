class Clipboard {
    constructor(email) {
        this.email = email
        this.button = document.querySelector(".copy-email")
        this.button.addEventListener("click", this.copyToClipboard.bind(this))
    }

    copyToClipboard() {
        navigator.clipboard
            .writeText(this.email)
            .then(() => {
                this.updateButtonText("email address copied!")
                setTimeout(() => {
                    this.updateButtonText(
                        `reach out to me via email <svg class="icon icon--copy" role="img" aria-hidden="true" width="24" height="24">
                        <use xlink:href="#svg-copy"></use></svg>`
                    )
                }, 1500)
            })
            .catch((error) => {
                console.error("Failed to copy text: ", error)
            })
    }

    updateButtonText(text) {
        if (this.button) {
            const span = document.createElement("span")
            span.innerHTML = text
            this.button.innerHTML = "" // Clear existing content
            this.button.appendChild(span)
        }
    }
}

const clipboard = new Clipboard("afnizarhilmi@gmail.com")
