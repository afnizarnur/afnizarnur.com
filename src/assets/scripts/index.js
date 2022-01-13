import LoaderAnimation from "./animation/animation.loader"
import HomeAnimation from "./animation/animation.home"
import CardAnimation from "./animation/animation.card"

const handleInitialLoad = (e) => {
    LoaderAnimation().play()

    if (document.querySelector(".aboutme")) {
        HomeAnimation()
        CardAnimation()
    }
}

document.addEventListener("DOMContentLoaded", (e) => {
    handleInitialLoad(e)
})
