import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useScroll } from "@react-three/drei";
import { gsap } from "gsap";

const ScrollManager = (props) => {
  const { section, onSectionChange } = props;

  const scrollData = useScroll();
  const lastScrollPosition = useRef(0);
  const isAnimating = useRef(false);
  const lastPropSection = useRef(section);

  // Intercept section prop changes from dropdown/buttons immediately during render
  // to prevent useFrame from resetting the section before useEffect and GSAP execute.
  if (section !== lastPropSection.current) {
    isAnimating.current = true;
    lastPropSection.current = section;
  }

  // Configure the scroll container styles
  useEffect(() => {
    if (scrollData.fill) {
      scrollData.fill.classList.add("top-0", "absolute");
    }
  }, [scrollData]);

  // Listen for active section changes (e.g. from Menu clicks or snap triggers)
  useEffect(() => {
    const targetScroll = section * scrollData.el.clientHeight;
    const currentScroll = scrollData.el.scrollTop;

    // Check if the scroll offset is significant to avoid redundant animations
    if (Math.abs(currentScroll - targetScroll) > 10) {
      isAnimating.current = true;
      gsap.to(scrollData.el, {
        duration: 0.8,
        scrollTop: targetScroll,
        ease: "power2.out",
        onStart: () => {
          isAnimating.current = true;
        },
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    }
  }, [section, scrollData]);

  useFrame(() => {
    if (isAnimating.current) {
      lastScrollPosition.current = scrollData.scroll.current;
      return;
    }

    // Determine current section based on scroll progress (0 to 1)
    const currentSection = Math.round(
      scrollData.scroll.current * (scrollData.pages - 1)
    );

    // If the scroll has drifted into a new section, update parent state (triggers snapping)
    if (currentSection !== section) {
      onSectionChange(currentSection);
    }

    lastScrollPosition.current = scrollData.scroll.current;
  });

  return null;
};

export default ScrollManager;
