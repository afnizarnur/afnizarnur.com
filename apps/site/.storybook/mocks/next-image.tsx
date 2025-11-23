import type { ImageProps } from "next/image"

// Mock Next.js Image component for Storybook
// Uses a regular img tag since Next.js image optimization doesn't work in Storybook
function MockImage({ src, alt, fill, priority, ...props }: ImageProps) {
    // Handle different src types
    const imgSrc =
        typeof src === "string" ? src : typeof src === "object" && "src" in src ? src.src : ""

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={imgSrc}
            alt={alt}
            style={
                fill
                    ? { position: "absolute", height: "100%", width: "100%", objectFit: "cover" }
                    : undefined
            }
            {...props}
        />
    )
}

export default MockImage
export { MockImage as Image }
