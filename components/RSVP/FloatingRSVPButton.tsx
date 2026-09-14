"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 20.5s-7.6-4.9-10.2-9.6C.4 8 1.6 4.6 4.9 3.7c2-.5 4 .3 5.1 2 .3.5.7 1.3 2 1.3s1.7-.8 2-1.3c1.1-1.7 3.1-2.5 5.1-2 3.3.9 4.5 4.3 3.1 7.2C19.6 15.6 12 20.5 12 20.5Z" />
    </svg>
  );
}

export default function FloatingRSVPButton() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const rsvpEl = document.getElementById("rsvp");
    if (!rsvpEl) return;

    const rsvpObserver = new IntersectionObserver(
      ([entry]) => {
        // Never show the button while the RSVP section itself is in view —
        // no need to offer a shortcut to where the guest already is.
        setVisible(!entry.isIntersecting && window.scrollY > window.innerHeight * 0.6);
      },
      { threshold: 0 }
    );
    rsvpObserver.observe(rsvpEl);

    const handleScroll = () => {
      const rsvpRect = rsvpEl.getBoundingClientRect();
      const rsvpInView = rsvpRect.top < window.innerHeight && rsvpRect.bottom > 0;
      setVisible(!rsvpInView && window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      rsvpObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    document.getElementById("rsvp")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 rounded-full bg-olive-dark px-3.5 py-2 text-[10px] tracking-[.1em] text-paper shadow-[0_8px_20px_-8px_rgba(51,58,34,0.55)] sm:bottom-5 sm:right-5 sm:gap-2 sm:px-5 sm:py-3 sm:text-[12px] sm:tracking-[.12em]"
        >
          <HeartIcon className="h-3 w-3 text-rose sm:h-3.5 sm:w-3.5" />
          RSVP
        </motion.button>
      )}
    </AnimatePresence>
  );
}
