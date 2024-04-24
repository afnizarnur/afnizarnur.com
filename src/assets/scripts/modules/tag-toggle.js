document.addEventListener("DOMContentLoaded", function () {
	const toggleButtons = document.querySelectorAll(".toggle-tags")
	const hiddenTagsList = document.querySelectorAll(".hidden-tags")

	toggleButtons.forEach(function (toggleButton, index) {
		const hiddenTags = hiddenTagsList[index]
		if (toggleButton && hiddenTags) {
			toggleButton.addEventListener("click", function () {
				const isHidden = hiddenTags.style.display === "none"
				hiddenTags.style.display = isHidden ? "block" : "none"
				if (isHidden) {
					toggleButton.innerHTML = `
                        <svg class="icon icon--close-alt" role="img" aria-hidden="true">
                            <use xlink:href="#svg-close-alt"></use>
                        </svg>`
				} else {
					toggleButton.innerHTML = `
                        <svg class="icon icon--three-dot" role="img" aria-hidden="true">
                            <use xlink:href="#svg-three-dot"></use>
                        </svg>`
				}
			})
		}
	})
})
