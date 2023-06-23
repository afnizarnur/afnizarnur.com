import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger)

function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 90%",
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

    // Animation on selected work
    const selectedWorkItems = document.querySelectorAll(".selected-work--item");

    selectedWorkItems.forEach((item, index) => {
        const timeline = gsap.timeline({ paused: true });
        timeline.fromTo(
            item,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.5 }
        );

        ScrollTrigger.create({
            trigger: item, 
            start: "top 90%", 
            onEnter: () => timeline.play(), 
        });
    });

        // Animation on selected work
        const designToolingCards = document.querySelectorAll(".design-tooling-card");
        // Create a GSAP timeline for each row
        const timelines = [];
      
        // Iterate over each design tooling card and create timelines for each row
        designToolingCards.forEach((card, index) => {
          const rowIndex = Math.floor(index / 2); // Calculate the row index based on the card index
      
          if (!timelines[rowIndex]) {
            // If a timeline for the row doesn't exist, create a new timeline
            timelines[rowIndex] = gsap.timeline({ paused: true });
          }
      
          // Add the card to the corresponding row timeline
          timelines[rowIndex].fromTo(
            card,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            index % 2 === 0 ? 0 : 0.2 // Staggered delay within the row
          );
        });
      
        // Create a scroll trigger for each row timeline
        timelines.forEach((timeline, index) => {
          const rowStart = index === 0 ? "top 90%" : `top+=${index * 10}%`; // Start the animation when the trigger element is 80% in view for the first row, and staggered for subsequent rows
          ScrollTrigger.create({
            trigger: designToolingCards[index * 2], // Trigger element (first card in the row)
            start: rowStart,
            onEnter: () => timeline.play(), // Play the timeline animation when the trigger element enters the viewport
          });
        });

    // Avoid flash of unstyled content
    const textSplitElements = document.querySelectorAll("[text-split]")
    gsap.set(textSplitElements, { opacity: 1 })
})