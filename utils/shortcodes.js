const Image = require("@11ty/eleventy-img")
const cheerio = require("cheerio")

module.exports = {
    icon: function (name) {
        return `<svg class="icon icon--${name}" role="img" aria-hidden="true">
                    <use xlink:href="#svg-${name}"></use>
                </svg>`
    },
    image: async function (
        src,
        alt,
        sizes = "(max-width: 480px) 100vw, (max-width: 768px) 90vw, 1280px",
        width,
        height
    ) {
        let path = "src/assets/images/" + src
        console.log(`Generating image(s) from: ${path}`)

        let metadata = await Image(path, {
            widths: [600, 900, "auto"],
            formats: ["auto"],
            urlPath: "/assets/images/",
            outputDir: "./dist/assets/images/"
        })

        let imageAttributes = {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async"
        }

        let imageHTML = Image.generateHTML(metadata, imageAttributes)

        if (width && height) {
            let $ = cheerio.load(imageHTML)
            let imgElement = $("img")
            imgElement.attr("width", width)
            imgElement.attr("height", height)
            imageHTML = $.html()
        }

        return imageHTML
    }
}
