import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

let tl = gsap.timeline({
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
