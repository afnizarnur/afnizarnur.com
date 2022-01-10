import imagesLoaded from "imagesloaded"
import { gsap } from "gsap"
import Splitting from "splitting"

Splitting()

let DOMLoader = {
    section: document.querySelector(".loader__main"),
    get chars() {
        return this.section.querySelectorAll(
            ".loader__heading .word > .char, .whitespace"
        )
    }
}

let DOMIntro = {
    section: document.querySelector(".intro__main"),
    get chars() {
        return this.section.querySelectorAll(
            ".intro__heading .word > .char, .whitespace"
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

export const timelineIntro = gsap
    .timeline({ paused: true })
    .to(DOMIntro.chars, {
        duration: timelineSettings.charsDuration,
        ease: "Power3.easeInOut",
        y: "0%",
        autoAlpha: 1,
        stagger: timelineSettings.staggerValue
    })

imgLoad.on("progress", function () {
    loadProgress()
})

function loadProgress() {
    loadedCount++
    loadingProgress = loadedCount / images
    tl.progress(loadingProgress)
}

const tl = gsap
    .timeline({
        paused: true,
        delay: 1.2,
        onUpdate: function () {
            var newPercent = (tl.progress() * 100).toFixed()
            count.innerHTML = newPercent + "%"
        },
        onComplete: loadComplete()
    })
    .set(progressBar, {
        ease: "Power3.easeInOut"
    })
    .to(progressBar, {
        ease: "Power3.easeInOut"
    })
    .set(DOMIntro.chars, {
        ease: "Power3.easeOut",
        y: "100%",
        autoAlpha: 0
    })

const tlPercentage = gsap
    .timeline({ delay: 2 })
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
        .timeline({ delay: 2.2 })
        .set(document.querySelector(".loader"), {
            ease: "Power3.easeInOut",
            autoAlpha: 1
        })
        .to(document.querySelector(".loader"), {
            duration: 0.8,
            ease: "Power3.easeInOut",
            autoAlpha: 0,
            onComplete: () => {
                document.querySelector(".loader").style.display = "none"
            }
        })

    const tlComplete2 = gsap
        .timeline({ delay: 1.2 })
        .set(progressBar, {
            ease: "Power3.easeInOut",
            width: "0%"
        })
        .to(progressBar, {
            ease: "Power3.easeInOut",
            duration: 1.2,
            width: "100%",
            onComplete: () => {
                timelineIntro.play()
            }
        })
}

const tlheading = gsap
    .timeline({ paused: true, delay: 1 })
    .set(DOMLoader.chars, {
        ease: "Power3.easeOut",
        y: "0%"
    })
    .to(DOMLoader.chars, {
        duration: timelineSettings.charsDuration,
        ease: "Power3.easeOut",
        y: "100%",
        stagger: timelineSettings.staggerValue
    })

tlheading.play()
tl.play()
