import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger)

function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 75%",
        onEnter: () => timeline.play()
    })
}

function isMobileOrTablet() {
    return window.matchMedia("(max-width: 1024px)").matches;
  }

document.addEventListener("DOMContentLoaded", function () {
    const typeSplit = new SplitType("[text-split]", {
        types: "words, chars",
        tagName: "span"
    })

    // Animation text reveal 
    document.querySelectorAll("[letters-slide-up]").forEach(function (element) {
        const tl = gsap.timeline({ paused: true })
        const chars = element.querySelectorAll(".char")

        tl.from(chars, {
            yPercent: 100,
            duration: 0.2,
            ease: "power1.out",
            stagger: { amount: 0.6 }
        })

        createScrollTrigger(element, tl)
    })


    // Add animation for image hover
    const imgSelectedList = document.querySelectorAll(".thumbnail-wrapper img");
    const viewDetailList = document.querySelectorAll(".btn-view-detail");
    
    if (!isMobileOrTablet()) {
      imgSelectedList.forEach((imgSelected, index) => {
        const viewDetail = viewDetailList[index];
        imgSelected.addEventListener("mouseenter", () => showDetail(imgSelected, viewDetail));
        imgSelected.addEventListener("mouseleave", () => hideDetail(viewDetail));
        imgSelected.addEventListener("mousemove", (e) => moveDetail(e, imgSelected, viewDetail));
      });
    }
    
    function showDetail(imgSelected, viewDetail) {
      const storedX = viewDetail.style.getPropertyValue('--stored-x');
      const storedY = viewDetail.style.getPropertyValue('--stored-y');
    
      if (storedX && storedY) {
        gsap.to(viewDetail, { x: storedX, y: storedY, opacity: 1  });
      } else {
        gsap.to(viewDetail, { opacity: 1 });
      }
    }
    
    function hideDetail(viewDetail) {
      gsap.to(viewDetail, { opacity: 0 });
    }
    
    function moveDetail(e, imgSelected, viewDetail) {
      const x = e.clientX - imgSelected.offsetLeft;
      const y = e.clientY - imgSelected.offsetTop;
    
      viewDetail.style.setProperty('--stored-x', x + 'px');
      viewDetail.style.setProperty('--stored-y', y + 'px');
    
      gsap.to(viewDetail, { x: x, y: y });
    }
    
    // Avoid flash of unstyled content
    const textSplitElements = document.querySelectorAll("[text-split]")
    gsap.set(textSplitElements, { opacity: 1 })
})