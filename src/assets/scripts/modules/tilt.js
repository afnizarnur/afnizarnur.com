import gsap from "gsap"

class Tilt {
    constructor({ el }) {
        this.el = document.querySelector(el)

        this.handleMousemove = getMousePos(addEventListener)
        this.handleMouseout = handleMouseout().bind(this)
        this.init()
    }

    getMousePos(e) {
        e = e || window.event
        let mouseX = 0,
            mouseY = 0

        this.mouseX = e.offsetX
        this.mouseY = e.offsetY

        let xPos = -(mouseX - this.el.clientWidth / 2) / 3 / 3
        let yPos = (mouseY - this.el.clientHeight / 2) / 3 / 3
        let rotationYValue = 0.2 * yPos.toFixed(2)
        let rotationXValue = 0.2 * xPos.toFixed(2)

        this.handleMousemove(rotationYValue, rotationXValue)
    }

    handleMouseout() {
        gsap.to(this.el, {
            ease: "Power3.easeOut",
            duration: 0.5
        })

        gsap.to(this.el, {
            ease: "Power3.easeOut",
            duration: 1,
            rotationY: 0,
            rotationX: 0,
            transformPerspective: 1200,
            transformOrigin: "center"
        })
    }

    handleMousemove(rotationYValue, rotationXValue) {
        gsap.to(this.el, {
            ease: "Power3.easeOut",
            duration: 1,
            rotationY: rotationYValue,
            rotationX: rotationXValue,
            transformPerspective: 1200,
            transformOrigin: "center"
        })
    }

    init() {
        this.el.addEventListener("mouseover", getMousePos)
        this.el.addEventListener("mouseout", handleMouseout)
        this.el.addEventListener("mousemove", handleMousemove)
    }
}

new Tilt({ el: ".designtooling__card" })
