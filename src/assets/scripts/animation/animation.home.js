import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

const HomeAnimation = () => {
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
