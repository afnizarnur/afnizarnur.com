document.addEventListener("DOMContentLoaded", function () {
	const toggleButtons = document.querySelectorAll(".toggle-tags")
	const hiddenTagsList = document.querySelectorAll(".hidden-tags")

	toggleButtons.forEach(function (toggleButton) {
		toggleButton.addEventListener("click", function () {
			hiddenTagsList.forEach(function (hiddenTags) {
				const isHidden = hiddenTags.style.display === "none"
				hiddenTags.style.display = isHidden ? "block" : "none"
			})

			toggleButtons.forEach(function (btn) {
				const isHidden = hiddenTagsList[0].style.display === "none"
				btn.setAttribute("aria-expanded", !isHidden)
				if (isHidden) {
					btn.innerHTML = `
                        <svg class="icon icon--three-dot" role="img" aria-hidden="true">
                            <use xlink:href="#svg-three-dot"></use>
                        </svg>`
				} else {
					btn.innerHTML = `
                        <svg class="icon icon--close-alt" role="img" aria-hidden="true">
                            <use xlink:href="#svg-close-alt"></use>
                        </svg>`
				}
			})

			if (!hiddenTagsList[0].style.display === "none") {
				toggleButtons[0].focus()
			}
		})

		// Keyboard accessibility
		toggleButton.addEventListener("keydown", function (event) {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault()
				toggleButton.click()
			}
		})
	})
})
