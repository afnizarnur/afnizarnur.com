document.addEventListener("DOMContentLoaded", function () {
	const toggleButtons = document.querySelectorAll(".toggle-tags")

	toggleButtons.forEach(function (toggleButton) {
		toggleButton.addEventListener("click", function () {
			const parentItem = toggleButton.closest("ul")
			const hiddenTagsList = parentItem.querySelectorAll(".hidden-badge")

			hiddenTagsList.forEach(function (hiddenTags) {
				const isHidden = hiddenTags.style.display === "none"
				hiddenTags.style.display = isHidden ? "block" : "none"
			})

			const isHidden = hiddenTagsList[0].style.display === "none"
			toggleButton.setAttribute("aria-expanded", !isHidden)
			toggleButton.innerHTML = isHidden
				? `
                <svg class="icon icon--three-dot" role="img" aria-hidden="true">
                    <use xlink:href="#svg-three-dot"></use>
                </svg>`
				: `
                <svg class="icon icon--close-alt" role="img" aria-hidden="true">
                    <use xlink:href="#svg-close-alt"></use>
                </svg>`

			if (!isHidden) {
				toggleButton.focus()
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
