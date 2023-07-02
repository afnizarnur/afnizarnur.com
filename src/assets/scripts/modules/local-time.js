/**
 * @author afnizarnur
 * @email afnizarhilmi@gmail.com
 * @create date 02-07-2023 10:06:14
 * @modify date 02-07-2023 10:06:14
 * @desc Add localtime component
 */

class LocalTime {
	constructor(offset, elementId) {
		this.offset = offset
		this.element = document.getElementById(elementId)
		this.updateLocalTime()
		setInterval(this.updateLocalTime.bind(this), 1000)
	}

	updateLocalTime() {
		const now = new Date()
		const utcHours = now.getUTCHours()
		const hours = ("0" + ((utcHours + this.offset / 60) % 24)).slice(-2)
		const minutes = ("0" + now.getMinutes()).slice(-2)

		const formattedTime = hours + ":" + minutes
		if (this.element) {
			this.element.textContent = formattedTime
		}
	}
}

const localtime = new LocalTime(420, "local-time")
