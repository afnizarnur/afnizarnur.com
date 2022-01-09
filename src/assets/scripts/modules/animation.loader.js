import { gsap } from "gsap"
import Splitting from "splitting"

// Loader
// let perfData = window.PerformanceNavigationTiming,
//     EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
//     time = parseInt((EstimatedTime / 1000) % 60) * 100

// function animateLoader(start, end, duration) {
//     let range = end - start,
//         current = start,
//         increment = end > start ? 1 : -1,
//         stepTime = Math.abs(Math.floor(duration / range)),
//         textTarget = document.querySelector(".loader__percentage")

//     let timer = setInterval(function () {
//         current += increment
//         textTarget.innerHTML = current + "%"

//         if (current == end) {
//             clearInterval(timer)
//         }
//     }, stepTime)
// }

// animateLoader(0, 100, time)

// Animation
Splitting()

let DOM = {
    section: document.querySelector(".loader__main"),
    get chars() {
        return this.section.querySelectorAll(
            ".loader__heading .word > .char, .whitespace"
        )
    }
}

const timelineSettings = {
    staggerValue: 0.014,
    charsDuration: 0.5
}

const timelineHeading = gsap
    .timeline({ paused: true, delay: 1 })
    .set(DOM.chars, {
        ease: "Power3.easeOut",
        y: "0%"
    })
    .to(DOM.chars, {
        duration: timelineSettings.charsDuration,
        ease: "Power3.easeOut",
        y: "100%",
        stagger: timelineSettings.staggerValue
    })

// const timelinePercentage = gsap
//     .timeline({ paused: true, delay: 1.5 })
//     .set(document.querySelector(".loader__percentage"), {
//         ease: "Power3.easeOut",
//         y: "0%"
//     })
//     .to(document.querySelector(".loader__percentage"), {
//         duration: timelineSettings.charsDuration,
//         ease: "Power3.easeOut",
//         y: "100%",
//         stagger: timelineSettings.staggerValue
//     })

// const timelineLine = gsap
//     .timeline({ paused: true, delay: 1 })
//     .set(document.querySelector(".loader__line .loader__fill"), {
//         ease: "Power3.easeInOut",
//         width: "0%"
//     })
//     .to(document.querySelector(".loader__line .loader__fill"), {
//         duration: 1.2,
//         ease: "Power3.easeInOut",
//         width: "100%"
//     })
//     .set(document.querySelector(".loader"), {
//         ease: "Power3.easeInOut",
//         autoAlpha: 1
//     })
//     .to(document.querySelector(".loader"), {
//         duration: 1,
//         ease: "Power3.easeInOut",
//         autoAlpha: 0
//     })

// timelineLine.play()
timelineHeading.play()
// timelinePercentage.play()

// document.getElementsByTagName("body")[0].style =
//     "overflow: hidden; height: 100vh;"

// var bt = document.querySelector("[data-js-preloader]"),
//     Et = setTimeout(function () {
//         ;(bt.style.visibility = "hidden"),
//             (document.getElementsByTagName("body")[0].style =
//                 "overflow: visible")
//     }, 2500)
// window.addEventListener("load", function () {
//     return Et
// })
