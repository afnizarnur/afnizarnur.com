import Splitting from "splitting"
import { gsap } from "gsap"

Splitting()

let DOM = {
    section: document.querySelector(".intro__main"),
    get chars() {
        return this.section.querySelectorAll(
            ".intro__heading .word > .char, .whitespace"
        )
    }
}

const timelineSettings = {
    staggerValue: 0.014,
    charsDuration: 0.5
}

const timeline = gsap
    .timeline({ paused: true })
    .set(DOM.chars, {
        ease: "Power3.out",
        y: "100%",
        opacity: 0
    })
    .to(DOM.chars, {
        duration: timelineSettings.charsDuration,
        ease: "Power3.out",
        y: "0%",
        opacity: 1,
        stagger: timelineSettings.staggerValue
    })

timeline.play()
