import gsap from "gsap"
import Splitting from "splitting"
import imagesLoaded from "imagesloaded"
import IntroAnimation from "./animation.intro"

Splitting()

const LoaderAnimation = () => {
    const timelineSettings = {
        staggerValue: 0.014,
        charsDuration: 0.5
    }

    const el = {
        loaderContainer: document.querySelector(".loader"),
        loaderMain: document.querySelector(".loader__main"),
        get loaderHeadingChars() {
            return this.loaderMain.querySelectorAll(
                ".loader__heading .word > .char, .whitespace"
            )
        },
        progressBar: document.querySelector(".loader__fill"),
        count: document.querySelector(".loader__percentage")
    }

    let imgLoad = imagesLoaded("body"),
        images = document.getElementsByTagName("img").length,
        loadedCount = 0,
        loadingProgress = 0

    imgLoad.on("progress", function (instance, image) {
        loadProgress()
    })

    document.body.style.overflow = "hidden"

    function loadProgress() {
        loadedCount++
        loadingProgress = loadedCount / images

        tl.progress(loadingProgress)
    }

    const tl = gsap
        .timeline({
            paused: true,
            defaults: { ease: "Power3.easeInOut" },
            onUpdate: function () {
                var newPercent = (tl.progress() * 100).toFixed()
                el.count.innerHTML = newPercent + "%"
            },
            onComplete: function () {
                if (document.querySelector(".aboutme")) {
                    imgLoad.on("done", function (instance, image) {
                        loadComplete()
                    })
                } else {
                    loadComplete()
                }
            }
        })
        .to(el.progressBar, {
            width: "100%"
        })

    function loadComplete() {
        const tlc = gsap
            .timeline({ delay: 1 })
            .addLabel("loaderHeadingExit")
            .fromTo(
                el.loaderHeadingChars,
                {
                    ease: "Power3.easeOut",
                    y: "0%",
                    autoAlpha: 1
                },
                {
                    duration: timelineSettings.charsDuration,
                    ease: "Power3.easeOut",
                    y: "100%",
                    autoAlpha: 0,
                    stagger: timelineSettings.staggerValue
                }
            )
            .addLabel("loaderProgressBarExit")
            .fromTo(
                el.progressBar,
                {
                    width: "0%"
                },
                {
                    duration: 1,
                    width: "100%",
                    onComplete: () => {
                        document.body.style.overflow = "auto"
                        if (document.querySelector(".aboutme")) {
                            IntroAnimation().play().delay(0.5)
                        }
                    }
                }
            )
            .addLabel("percentageExit")
            .fromTo(
                el.count,
                {
                    ease: "Power3.easeOut",
                    y: "0%",
                    autoAlpha: 1
                },
                {
                    duration: 1,
                    ease: "Power3.easeOut",
                    y: "100%",
                    autoAlpha: 0
                },
                "loaderProgressBarExit"
            )
            .addLabel("loaderContainerExit")
            .fromTo(
                el.loaderContainer,
                {
                    autoAlpha: 1
                },
                {
                    autoAlpha: 0,
                    onComplete: () => {
                        el.loaderContainer.style.display = "none"
                    }
                },
                "percentageExit"
            )
    }

    return tl
}

export default LoaderAnimation
