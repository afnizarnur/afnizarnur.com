import gsap from "gsap"

const CardAnimation = () => {
    const el = {
        cardWork: document.querySelector(".designtooling__card")
    }

    let mouseX = 0,
        mouseY = 0

    function handleMouseover() {
        gsap.to(el.cardWork, {
            ease: "Power3.easeOut",
            duration: 0.5
        })
    }

    function getMousePos(e) {
        e = e || window.event

        mouseX = e.offsetX
        mouseY = e.offsetY

        let xPos = -(mouseX - el.cardWork.clientWidth / 2) / 3 / 3
        let yPos = (mouseY - el.cardWork.clientHeight / 2) / 3 / 3
        let rotationYValue = 0.2 * yPos.toFixed(2)
        let rotationXValue = 0.2 * xPos.toFixed(2)

        handleMousemove(rotationYValue, rotationXValue)
    }

    function handleMouseout() {
        gsap.to(el.cardWork, {
            ease: "Power3.easeOut",
            duration: 0.5
        })

        gsap.to(el.cardWork, {
            ease: "Power3.easeOut",
            duration: 1,
            rotationY: 0,
            rotationX: 0,
            transformPerspective: 1200,
            transformOrigin: "center"
        })
    }

    function handleMousemove(rotationYValue, rotationXValue) {
        gsap.to(el.cardWork, {
            ease: "Power3.easeOut",
            duration: 1,
            rotationY: rotationYValue,
            rotationX: rotationXValue,
            transformPerspective: 1200,
            transformOrigin: "center"
        })
    }

    function handleLoad() {
        el.cardWork.addEventListener("mouseover", handleMouseover)
        el.cardWork.addEventListener("mouseout", handleMouseout)
        el.cardWork.addEventListener("mousemove", getMousePos)
    }

    handleLoad()
}

export default CardAnimation
