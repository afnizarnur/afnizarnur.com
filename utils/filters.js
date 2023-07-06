const { DateTime } = require("luxon")

module.exports = {
	dateToFormat: function (date, format) {
		return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(
			String(format)
		)
	},

	dateToISO: function (date) {
		return DateTime.fromJSDate(date, { zone: "utc" }).toISO({
			includeOffset: false,
			suppressMilliseconds: true
		})
	},

	obfuscate: function (str) {
		const chars = []
		for (var i = str.length - 1; i >= 0; i--) {
			chars.unshift(["&#", str[i].charCodeAt(), ";"].join(""))
		}
		return chars.join("")
	},

	findById: function (array, id) {
		return array.find((i) => i.id === id)
	},

	slice: function (array, start, end) {
		return end ? array.slice(start, end) : array.slice(start)
	},

	excludePost: function (allPosts, currentPost) {
		return allPosts.filter(
			(post) => post.inputPath !== currentPost.inputPath
		)
	}
}
