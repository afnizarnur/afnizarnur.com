document.addEventListener("DOMContentLoaded", function () {
	const toggleButtons = document.querySelectorAll(".toggle-tags")
	const hiddenTagsList = document.querySelectorAll(".hidden-tags")

	toggleButtons.forEach(function (toggleButton, index) {
		const hiddenTags = hiddenTagsList[index]
		if (toggleButton && hiddenTags) {
			toggleButton.addEventListener("click", function () {
				const isHidden = hiddenTags.style.display === "none"
				hiddenTags.style.display = isHidden ? "block" : "none"
				toggleButton.textContent = isHidden ? "x" : "..."
			})
		}
	})
})
