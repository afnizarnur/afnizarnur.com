import LoaderAnimation from "./animation/animation.loader"
import HomeAnimation from "./animation/animation.home"
import VanillaTilt from "vanilla-tilt"

const handleInitialLoad = (e) => {
    LoaderAnimation().play()

    // Vanillatilt
    VanillaTilt.init(
        document.querySelectorAll(".selectedwork__card .image-wrapper"),
        {
            max: 2,
            gyroscope: false
        }
    )

    VanillaTilt.init(document.querySelectorAll(".designtooling__card"), {
        max: 2,
        gyroscope: false
    })

    if (document.querySelector(".aboutme")) {
        HomeAnimation()
    }
}

document.addEventListener("DOMContentLoaded", (e) => {
    handleInitialLoad(e)
})
