import imagesLoaded from "imagesloaded"
import { gsap } from "gsap"
import { TweenMax } from "gsap/gsap-core"

let imgLoad = imagesLoaded(".main")

let progressBar = document.querySelector(".loader__fill"),
    count = document.querySelector(".loader__percentage"),
    images = document.getElementsByTagName("img").length,
    loadedCount = 0,
    loadingProgress = 0

imgLoad.on("progress", function (instance, image) {
    loadProgress()
})

function loadProgress() {
    loadedCount++

    loadingProgress = loadedCount / images
    timelineLoader.to(progressBar, 1, { progress: loadingProgress })
}

const timelineLoader = gsap.timeline({
    paused: true,
    onUpdate: countPercent,
    onComplete: loadComplete
})

timelineLoader.to(progressBar, 1, { width: "100%" })

function countPercent() {
    let newPercent = (timelineLoader.progress() * 100).toFixed()
    count.innerHTML = newPercent + "%"
}

function loadComplete() {
    const timelineComplete = gsap
        .to(count, 0.5, { autoAlpha: 0 })
        .to(".loader", 0.5, { autoAlpha: 0 })

    timelineComplete.play()
}

timelineLoader.play()
