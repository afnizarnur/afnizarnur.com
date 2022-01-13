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

    const tlline = gsap
        .timeline({
            scrollTrigger: {
                trigger: ".designtooling h2",
                scrub: true,
                start: "top bottom",
                end: "top bottom-=200px"
            }
        })
        .to(
            el.c,
            {
                duration: 1,
                backgroundColor: "var(--background-default)",
                ease: "Power3.easeInOut"
            },
            0
        )
        .to(
            el.c,
            {
                duration: 1,
                backgroundColor: "var(--surface-primary-inverse)",
                ease: "Power3.easeInOut"
            },
            0
        )

    return tl
}

export default HomeAnimation
