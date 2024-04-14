function navigateToUrl() {
	var selectElement = document.getElementById("select-version")
	var selectedYear = selectElement.options[selectElement.selectedIndex].value
	if (selectedYear !== "2024") {
		var url = "https://" + selectedYear + ".afnizarnur.com/"
		window.open(url, "_blank")
		window.umami.track("footer-" + selectedYear)
		selectElement.value = "2024"
	}
}

document
	.getElementById("select-version")
	.addEventListener("change", navigateToUrl)
