function navigateToUrl() {
	var selectElement = document.getElementById("select-version")

	if (selectElement) {
		var selectedYear =
			selectElement.options[selectElement.selectedIndex].value

		if (selectedYear !== "2024") {
			selectElement.value = "2024"
			var url = "https://" + selectedYear + ".afnizarnur.com/"
			window.location.href = url
			window.umami.track("footer-" + selectedYear)
		}
	}
}

const initNavigateToUrl = () => {
	var selectElement = document.getElementById("select-version")

	if (selectElement) {
		selectElement.addEventListener("change", navigateToUrl)
	}
}

export default initNavigateToUrl
