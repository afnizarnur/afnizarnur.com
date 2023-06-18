const Image = require("@11ty/eleventy-img")
const { JSDOM } = require("jsdom")

module.exports = {
    icon: function (name) {
        return `<svg class="icon icon--${name}" role="img" aria-hidden="true">
                    <use xlink:href="#svg-${name}"></use>
                </svg>`
    },
    image: async function (
        src,
        alt,
        sizes = "(min-width: 1024px) 100vw, 50vw",
        width,
        height
    ) {
        let path = "src/assets/images/" + src
        console.log(`Generating image(s) from: ${path}`)

        let metadata = await Image(path, {
            widths: [600, 900, 1500],
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
            // Set custom width and height attributes using JSDOM
            let dom = new JSDOM(imageHTML)
            let imgElement = dom.window.document.querySelector("img")
            imgElement.setAttribute("width", width)
            imgElement.setAttribute("height", height)
            imageHTML = dom.serialize()
        }

        return imageHTML
    }
}
