import gsap from "gsap"

const CardAnimation = () => {
    const el = {
        cardWork: document.querySelector(".selectedwork__card .image-wrapper")
    }

    let mouseX = 0,
        mouseY = 0

    function handleMouseover() {
        gsap.to(el.cardWork, {
            ease: "Power3.easeOut",
            duration: 0.5,
            scale: 0.98
        })
    }

    function getMousePos(e) {
        e = e || window.event

        mouseX = e.pageX
        mouseY = e.pageY

        let xPos = mouseX / window.innerWidth - 0.5
        let yPos = mouseY / window.innerHeight - 0.5
        let rotationYValue = 1.5 * xPos
        let rotationXValue = 1.5 * yPos

        handleMousemove(rotationYValue, rotationXValue)
    }

    function handleMouseout() {
        gsap.to(el.cardWork, {
            ease: "Power3.easeOut",
            duration: 0.5,
            scale: 1
        })

        gsap.to(el.cardWork, {
            ease: "Power3.easeOut",
            duration: 0.5,
            rotationY: 0,
            rotationX: 0
        })
    }

    function handleMousemove(rotationYValue, rotationXValue) {
        gsap.to(el.cardWork, {
            ease: "Power3.easeOut",
            duration: 0.5,
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
