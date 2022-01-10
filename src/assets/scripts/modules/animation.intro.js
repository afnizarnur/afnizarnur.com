import gsap from "gsap"

const IntroAnimation = () => {
    const timelineSettings = {
        staggerValue: 0.014,
        charsDuration: 0.5
    }

    const el = {
        introMain: document.querySelector(".intro__main"),
        get introHeadingChars() {
            return this.introMain.querySelectorAll(
                ".intro__heading .word > .char, .whitespace"
            )
        }
    }

    const tl = gsap.timeline({ paused: "true" }).fromTo(
        el.introHeadingChars,
        {
            ease: "Power3.easeOut",
            y: "100%",
            autoAlpha: 0
        },
        {
            duration: timelineSettings.charsDuration,
            ease: "Power3.easeInOut",
            y: "0%",
            autoAlpha: 1,
            stagger: timelineSettings.staggerValue
        }
    )

    return tl
}

export default IntroAnimation
