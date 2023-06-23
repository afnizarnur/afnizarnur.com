import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger)

function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 90%",
        onEnter: () => timeline.play()
    })
}

function isMobileOrTablet() {
    return window.matchMedia("(max-width: 1024px)").matches;
  }

document.addEventListener("DOMContentLoaded", function () {
    const typeSplit = new SplitType("[text-split]", {
        types: "words, chars",
        tagName: "span"
    })

    // Animation text reveal 
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

    // Get all the div elements with the class "selected-work--item"
    const selectedWorkItems = document.querySelectorAll(".selected-work--item");

    selectedWorkItems.forEach((item, index) => {
        const timeline = gsap.timeline({ paused: true });
        timeline.fromTo(
            item,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.5 }
        );

        ScrollTrigger.create({
            trigger: item, 
            start: "top 90%", 
            onEnter: () => timeline.play(), 
        });
    });

    // Avoid flash of unstyled content
    const textSplitElements = document.querySelectorAll("[text-split]")
    gsap.set(textSplitElements, { opacity: 1 })
})