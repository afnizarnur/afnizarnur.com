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

	pluralize: async function (num, word) {
		let plur = (await import("plur")).default
		return num + " " + plur(word, num)
	},

	slice: function (array, start, end) {
		return end ? array.slice(start, end) : array.slice(start)
	},

	excludePost: function (allPosts, currentPost) {
		return allPosts.filter(
			(post) => post.inputPath !== currentPost.inputPath
		)
	},

	getAllTags: function (collection) {
		let tagSet = new Set()
		for (let item of collection) {
			;(item.data.tags || []).forEach((tag) => tagSet.add(tag))
		}
		return Array.from(tagSet)
	},

	filterTagList: function (tags) {
		return (tags || []).filter(
			(tag) => ["all", "selected", "worksbyyear"].indexOf(tag) === -1
		)
	}
}
