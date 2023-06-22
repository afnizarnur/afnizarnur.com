import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger)

// Link timelines to scroll position
function createScrollTrigger(triggerElement, timeline) {
    // Reset timeline when scrolling out of view past the bottom of the screen
    ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom",
        onLeaveBack: () => {
            timeline.progress(0)
            timeline.pause()
        }
    })

    // Play timeline when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 60%",
        onEnter: () => timeline.play()
    })
}

document.addEventListener("DOMContentLoaded", function () {
    const typeSplit = new SplitType("[text-split]", {
        types: "words, chars",
        tagName: "span"
    })

    document.querySelectorAll("[letters-slide-up]").forEach(function (element) {
        const tl = gsap.timeline({ paused: true })
        const chars = element.querySelectorAll(".char")

        tl.from(chars, {
            yPercent: 100,
            duration: 0.2,
            ease: "power1.out",
            stagger: { amount: 0.6 }
        })

        createScrollTrigger(element, tl)
    })

    // Avoid flash of unstyled content
    const textSplitElements = document.querySelectorAll("[text-split]")
    gsap.set(textSplitElements, { opacity: 1 })
})
