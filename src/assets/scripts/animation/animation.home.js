import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

const HomeAnimation = () => {
    const el = {
        dt: document.querySelector(".designtooling"),
        sw: document.querySelector(".selectedwork"),
        c: document.querySelector("body")
    }

    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".aboutme",
            scrub: true
        }
    })

    tl.to(".design-process", {
        opacity: 0
    }).to(".aboutme", {
        opacity: 1
    })

    return tl
}

export default HomeAnimation
