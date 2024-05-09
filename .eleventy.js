const pluginRss = require("@11ty/eleventy-plugin-rss")
const pluginNavigation = require("@11ty/eleventy-navigation")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const pluginSvgSprite = require("eleventy-plugin-svg-sprite")
const pluginPageAssets = require("eleventy-plugin-page-assets")
const markdownIt = require("markdown-it")
const markdownItFootnote = require("markdown-it-footnote")
const markdownItEleventyImg = require("markdown-it-eleventy-img")
const embedEverything = require("eleventy-plugin-embed-everything")

const path = require("path")
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
	config.addPlugin(syntaxHighlight)
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
	config.addPlugin(embedEverything)

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
		})
			.use(markdownItFootnote)
			.use(markdownItEleventyImg, {
				imgOptions: {
					widths: [1280, 768, 480],
					urlPath: "/assets/images/",
					outputDir: "./dist/assets/images/",
					formats: ["avif", "webp", "jpeg"]
				},
				globalAttributes: {
					class: "markdown-image",
					decoding: "async",
					sizes: "100vw"
				},
				resolvePath: (filepath, env) => {
					const markdownDir = env.page.inputPath.replace(env.cwd, "")
					const relativePath = path.dirname(markdownDir)
					const urlPath = `${relativePath}/`
					return `${urlPath}${filepath}`
				},
				renderImage(image, attributes) {
					const [Image, options] = image
					const [src, attrs] = attributes

					Image(src, options)

					const metadata = Image.statsSync(src, options)
					const imageMarkup = Image.generateHTML(metadata, attrs, {
						whitespaceMode: "inline"
					})

					return `<figure>${imageMarkup}${
						attrs.title
							? `<figcaption>${attrs.title}</figcaption>`
							: ""
					}</figure>`
				}
			})
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

	// Collect all tags from works
	let workTagsSet = new Set()
	config.addCollection("workTags", function (collection) {
		collection
			.getFilteredByGlob(CONTENT_GLOBS.works)
			.filter((item) => !(item.data.draft && IS_PRODUCTION))
			.forEach((item) => {
				if (item.data.tags) {
					item.data.tags.forEach((tag) => workTagsSet.add(tag))
				}
			})
		return Array.from(workTagsSet)
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

	// Collect all tags from writing
	let writingTagsSet = new Set()
	config.addCollection("writingTags", function (collection) {
		collection
			.getFilteredByGlob(CONTENT_GLOBS.writing)
			.filter((item) => !(item.data.draft && IS_PRODUCTION))
			.forEach((item) => {
				if (item.data.tags) {
					item.data.tags.forEach((tag) => writingTagsSet.add(tag))
				}
			})
		return Array.from(writingTagsSet)
	})

	// Collections: Writing Categories
	config.addCollection("writingCategories", function (collection) {
		let categorySet = new Set()
		collection.getAll().forEach((item) => {
			if (item.data.category) {
				item.data.category.forEach((category) =>
					categorySet.add(category)
				)
			}
		})
		return Array.from(categorySet)
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
