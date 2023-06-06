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
                    this.updateButtonText("reach out to me via email")
                }, 1500)
            })
            .catch((error) => {
                console.error("Failed to copy text: ", error)
            })
    }

    updateButtonText(text) {
        if (this.button) {
            this.button.innerText = text
        }
    }
}

const clipboard = new Clipboard("afnizarhilmi@gmail.com")
