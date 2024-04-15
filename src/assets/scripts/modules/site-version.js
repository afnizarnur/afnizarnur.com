function navigateToUrl() {
	var selectElement = document.getElementById("select-version")
	var selectedYear = selectElement.options[selectElement.selectedIndex].value

	if (selectedYear !== "2024") {
		selectElement.value = "2024"
		var url = "https://" + selectedYear + ".afnizarnur.com/"
		window.location.href = url
		window.umami.track("footer-" + selectedYear)
	}
}

document
	.getElementById("select-version")
	.addEventListener("change", navigateToUrl)
