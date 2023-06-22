import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger)

function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 75%",
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


    // Add animation for image hover
    const imgSelected = document.querySelector(".thumbnail-wrapper img")
    const viewDetail = document.querySelector(".btn-view-detail")

    if (!isMobileOrTablet()) {
        imgSelected.addEventListener("mouseenter", showDetail);
        imgSelected.addEventListener("mouseleave", hideDetail);
        imgSelected.addEventListener("mousemove", moveDetail);
      }

    function showDetail() {
      gsap.to(viewDetail, { opacity: 1 })
    }

    function hideDetail() {
      gsap.to(viewDetail, { opacity: 0 })
    }

    function moveDetail(e) {
        const x = e.clientX - imgSelected.offsetLeft;
        const y = e.clientY - imgSelected.offsetTop;
    
        gsap.to(viewDetail, { x: x, y: y });
      }

    // Avoid flash of unstyled content
    const textSplitElements = document.querySelectorAll("[text-split]")
    gsap.set(textSplitElements, { opacity: 1 })
})
