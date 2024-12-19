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
	},

	filterByTag: function (collection, tag) {
		return collection.filter(
			(item) => item.data.tags && item.data.tags.includes(tag)
		)
	},

	filterByCategory: function (collection, category) {
		return collection.filter(
			(item) =>
				item.data.category && item.data.category.includes(category)
		)
	},

	readingTime: function (content) {
		const WPM = 200

		const wordCount = content.split(/\s+/).length
		const readingTime = Math.ceil(wordCount / WPM)
		return `${readingTime} min${readingTime !== 1 ? "s" : ""} read`
	},

	nl2br: function (str) {
		if (typeof str !== "string") {
			return str
		}
		return str.replace(/(?:\r\n|\r|\n)/g, "<br>")
	}
}
