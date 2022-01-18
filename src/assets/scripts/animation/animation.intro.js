import gsap from "gsap"
import Splitting from "splitting"

const IntroAnimation = () => {
    const target = document.querySelector(".intro__heading")

    const results = Splitting({
        target: target,
        by: "lines"
    })

    const tl = gsap.timeline({ paused: "true" })

    results[0].lines.forEach((line, index) => {
        tl.addLabel("marker")
        tl.fromTo(
            line,
            {
                ease: "Power3.out",
                autoAlpha: 0,
                y: "100%"
            },
            {
                duration: 0.4,
                ease: "Power3.out",
                autoAlpha: 1,
                y: "0%"
            },
            "marker-=0.25"
        )
    })

    return tl
}

export default IntroAnimation
