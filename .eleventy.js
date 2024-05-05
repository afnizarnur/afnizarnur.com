const pluginRss = require("@11ty/eleventy-plugin-rss")
const pluginNavigation = require("@11ty/eleventy-navigation")
const pluginSvgSprite = require("eleventy-plugin-svg-sprite")
const pluginPageAssets = require("eleventy-plugin-page-assets")
const markdownIt = require("markdown-it")
const markdownItFootnote = require("markdown-it-footnote")

const lodash = require("lodash")
const filters = require("./utils/filters.js")
const transforms = require("./utils/transforms.js")
const shortcodes = require("./utils/shortcodes.js")

const IS_PRODUCTION = process.env.ELEVENTY_ENV === "production"

const CONTENT_GLOBS = {
	works: "src/works/**/*.md",
	writing: "src/writing/**/*.md",
	media: "*.jpg|*.png|*.gif|*.mp4|*.webp|*.webm"
}

module.exports = function (config) {
	// Plugins
	config.addPlugin(pluginRss)
	config.addPlugin(pluginNavigation)
	config.addPlugin(pluginSvgSprite, {
		path: "./src/assets/icons",
		svgSpriteShortcode: "iconsprite"
	})
	config.addPlugin(pluginPageAssets, {
		mode: "directory",
		postsMatching: ["src/works/*/*.md", "src/writing/*/*.md"],
		assetsMatching: CONTENT_GLOBS.media,
		silent: true
	})

	// Filters
	Object.keys(filters).forEach((filterName) => {
		config.addFilter(filterName, filters[filterName])
	})

	// Transforms
	Object.keys(transforms).forEach((transformName) => {
		config.addTransform(transformName, transforms[transformName])
	})

	// Shortcodes
	Object.keys(shortcodes).forEach((shortcodeName) => {
		config.addShortcode(shortcodeName, shortcodes[shortcodeName])
	})

	// Asset Watch Targets
	config.addWatchTarget("./src/assets")

	// Markdown
	config.setLibrary(
		"md",
		markdownIt({
			html: true,
			breaks: true,
			linkify: true,
			typographer: true
		}).use(markdownItFootnote)
	)

	// Layouts
	config.addLayoutAlias("base", "base.njk")
	config.addLayoutAlias("post", "post.njk")

	// Pass-through files
	config.addPassthroughCopy("src/robots.txt")
	config.addPassthroughCopy("src/site.webmanifest")
	config.addPassthroughCopy("src/assets/images")
	config.addPassthroughCopy("src/assets/fonts")
	config.addPassthroughCopy({ static: "/" })

	// Deep-Merge
	config.setDataDeepMerge(true)

	// Collections: Works
	config.addCollection("works", function (collection) {
		return collection
			.getFilteredByGlob(CONTENT_GLOBS.works)
			.filter((item) => item.data.permalink !== false)
			.filter((item) => !(item.data.draft && IS_PRODUCTION))
			.sort((a, b) => b.date - a.date)
	})

	// Collections: Works by year
	config.addCollection("worksbyyear", (collection) => {
		return lodash
			.chain(collection.getFilteredByGlob(CONTENT_GLOBS.works))
			.filter(
				(item) =>
					item.data.selected || !(item.data.draft && IS_PRODUCTION)
			)
			.groupBy((works) => works.date.getFullYear())
			.toPairs()
			.reverse()
			.value()
	})

	// Collections: Selected Works
	config.addCollection("selected", function (collection) {
		return collection
			.getFilteredByGlob(CONTENT_GLOBS.works)
			.filter((item) => item.data.selected)
			.sort((a, b) => b.date - a.date)
	})

	// Collections: Writing
	config.addCollection("writing", function (collection) {
		return collection
			.getFilteredByGlob(CONTENT_GLOBS.writing)
			.filter((item) => item.data.permalink !== false)
			.filter((item) => !(item.data.draft && IS_PRODUCTION))
			.sort((a, b) => b.date - a.date)
	})

	// Collections: Writing by year
	config.addCollection("writingbyyear", (collection) => {
		return lodash
			.chain(collection.getFilteredByGlob(CONTENT_GLOBS.writing))
			.filter((item) => !(item.data.draft && IS_PRODUCTION))
			.groupBy((works) => works.date.getFullYear())
			.toPairs()
			.reverse()
			.value()
	})

	// Base Config
	return {
		dir: {
			input: "src",
			output: "dist",
			includes: "includes",
			layouts: "layouts",
			data: "data"
		},
		templateFormats: ["njk", "md", "11ty.js"],
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk"
	}
}
