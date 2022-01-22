import LoaderAnimation from "./animation/animation.loader"
import HomeAnimation from "./animation/animation.home"

const handleInitialLoad = (e) => {
    // LoaderAnimation().play()

    if (document.querySelector(".aboutme")) {
        HomeAnimation()
    }
}

document.addEventListener("DOMContentLoaded", (e) => {
    handleInitialLoad(e)
})
