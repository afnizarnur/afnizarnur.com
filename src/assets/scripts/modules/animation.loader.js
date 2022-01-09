import imagesLoaded from "imagesloaded"
import { gsap } from "gsap"
import Splitting from "splitting"

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
let imgLoad = imagesLoaded(".main")

let progressBar = document.querySelector(".loader__fill"),
    count = document.querySelector(".loader__percentage"),
    images = document.getElementsByTagName("img").length,
    loadedCount = 0,
    loadingProgress = 0

const timelineSettings = {
    staggerValue: 0.014,
    charsDuration: 0.5
}

imgLoad.on("progress", function () {
    loadProgress()
})

function loadProgress() {
    loadedCount++
    loadingProgress = loadedCount / images
    tl.progress(loadingProgress)
}

document.getElementsByTagName("body")[0].style =
    "overflow: hidden; height: 100vh;"

const tl = gsap.timeline({
    paused: true,
    delay: 1.5,
    onUpdate: function () {
        var newPercent = (tl.progress() * 100).toFixed()
        count.innerHTML = newPercent + "%"
    },
    onComplete: loadComplete()
})

tl.set(progressBar, {
    ease: "Power3.easeInOut",
    width: "0%"
}).to(progressBar, {
    ease: "Power3.easeInOut",
    duration: 1.2,
    width: "100%"
})

const tlPercentage = gsap
    .timeline({ delay: 1.5 })
    .set(count, {
        ease: "Power3.easeOut",
        y: "0%"
    })
    .to(count, {
        duration: timelineSettings.charsDuration,
        ease: "Power3.easeOut",
        y: "100%"
    })

function loadComplete() {
    const tlComplete = gsap
        .timeline({ delay: 1.5 })
        .set(document.querySelector(".loader"), {
            ease: "Power3.easeInOut",
            autoAlpha: 1
        })
        .to(document.querySelector(".loader"), {
            duration: 1.5,
            ease: "Power3.easeInOut",
            autoAlpha: 0,
            onComplete: () => {
                document.querySelector(".loader").style.display = "none"
            }
        })
}

const tlheading = gsap
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

tlheading.play()

tl.play()
