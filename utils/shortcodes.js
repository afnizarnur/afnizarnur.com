const Image = require("@11ty/eleventy-img")

module.exports = {
    icon: function (name) {
        return `<svg class="icon icon--${name}" role="img" aria-hidden="true">
                    <use xlink:href="#svg-${name}"></use>
                </svg>`
    },
    image: async function (
        src,
        alt,
        sizes = "(min-width: 1152px) 100vw, 50vw"
    ) {
        let path = "src/assets/images/" + src
        console.log(`Generating image(s) from:  ${path}`)

        let options = {
            widths: [600, 900, 1500],
            formats: ["auto"],
            urlPath: "/assets/images/",
            outputDir: "./dist/assets/images/"
        }

        Image(path, options)

        let imageAttributes = {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async"
        }
        metadata = Image.statsSync(path, options)
        return Image.generateHTML(metadata, imageAttributes)
    }
}
