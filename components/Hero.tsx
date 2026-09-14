"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

// Luxurious, no-bounce deceleration — strong ease-out with a long tail.
const LUXE_EASE = [0.16, 1, 0.3, 1] as const;

// 5 lines staggered 0.25s apart, each a 1.5s fade+slide — the full
// sequence resolves at ~2.5s total, timed to feel like one slow reveal.
//
// When reduced motion is preferred, "hidden" collapses to the same resting
// state as "visible" (rather than just omitting the animation props) so the
// text can never get stuck mid-transition if the preference is detected
// after the component has already mounted.
function getNameVariants(reduceMotion: boolean): {
  container: Variants;
  line: Variants;
} {
  if (reduceMotion) {
    return {
      container: { hidden: {}, visible: {} },
      line: { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } },
    };
  }

  return {
    container: {
      hidden: {},
      visible: { transition: { staggerChildren: 0.25 } },
    },
    line: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.5, ease: LUXE_EASE },
      },
    },
  };
}

type SparklePoint = {
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
};

// Scattered around the edges of the frame so the twinkle never sits behind
// the invitation text in the center column.
const SPARKLES: SparklePoint[] = [
  { top: "10%", left: "9%", size: 15, delay: 0, duration: 2.8 },
  { top: "20%", left: "89%", size: 11, delay: 1.1, duration: 3.2 },
  { top: "34%", left: "4%", size: 9, delay: 2.1, duration: 2.6 },
  { top: "48%", left: "93%", size: 13, delay: 0.5, duration: 3 },
  { top: "64%", left: "6%", size: 10, delay: 1.7, duration: 3.4 },
  { top: "76%", left: "90%", size: 15, delay: 0.9, duration: 2.9 },
  { top: "88%", left: "16%", size: 9, delay: 2.5, duration: 3.1 },
  { top: "6%", left: "60%", size: 8, delay: 1.4, duration: 2.7 },
];

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M8 0 9.5 6.5 16 8l-6.5 1.5L8 16 6.5 9.5 0 8l6.5-1.5Z" />
    </svg>
  );
}

function SparkleField({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-gold"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          initial={{ opacity: reduceMotion ? 0.35 : 0, scale: reduceMotion ? 1 : 0.6 }}
          animate={
            reduceMotion
              ? { opacity: 0.35, scale: 1 }
              : { opacity: [0, 0.9, 0], scale: [0.6, 1, 0.6] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: s.duration,
                  delay: s.delay,
                  repeat: Infinity,
                  repeatDelay: 1.4,
                  ease: "easeInOut",
                }
          }
        >
          <SparkleIcon className="h-full w-full" />
        </motion.span>
      ))}
    </div>
  );
}

function SprigIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      className={className}
    >
      <path d="M12 21V7" />
      <path d="M12 13c0-4 3-6.5 6.5-7-1 3.5-2 6.5-6.5 7Z" />
      <path d="M12 17c0-3.5-2.5-5.5-5.5-6 .8 3 1.8 5.5 5.5 6Z" />
    </svg>
  );
}

function CalendarIcon({ className = "h-7 w-7 shrink-0" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      className={className}
    >
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3v3.5" />
      <path d="M16 3v3.5" />
    </svg>
  );
}

function ClockIcon({ className = "h-7 w-7 shrink-0" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      className={className}
    >
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.75V12l3 2" />
    </svg>
  );
}

function PinIcon({ className = "h-[18px] w-[18px] shrink-0" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      className={className}
    >
      <path d="M12 21s-6.5-5.7-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.3-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { container: nameContainer, line: nameLine } = getNameVariants(
    !!reduceMotion
  );

  return (
    <section className="relative flex min-h-[100vh] flex-col sm:block">
      {/* Garden backdrop — the source photo is a wide landscape frame with
          all the floral detail packed into its corners and a blank center.
          bg-cover on a tall portrait phone would crop straight through that
          blank middle, hiding the garden entirely — so on mobile we show
          the whole frame uncropped (bg-contain, anchored to the top) and
          let the matching cream fill carry the rest of the section, then
          switch back to a full-bleed cover crop once there's a wide enough
          viewport for it to still read as a garden. */}
      <div
        className="absolute inset-0 bg-contain bg-top bg-no-repeat sm:bg-cover sm:bg-center"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundColor: "var(--color-cream)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/5 to-cream/25" />

      {/* Couple portrait — background-removed cutout so the garden shows
          through around them instead of a rectangular photo edge. A top
          banner on mobile (in-flow, so the text below never overlaps it);
          absolutely positioned on larger screens so it can't affect where
          the text column centers itself. */}
      <div className="relative h-[48vh] w-full shrink-0 sm:absolute sm:inset-y-0 sm:left-[5vw] sm:h-auto sm:w-[380px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/wed-cutout.png"
          alt="Benjamin and Rofamae"
          className="absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2 object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_92%,transparent_100%)] sm:left-0 sm:translate-x-0 sm:[object-position:0%_92%]"
          style={{ filter: "drop-shadow(0 18px 22px rgba(51,40,30,0.28))" }}
        />
      </div>

      <SparkleField reduceMotion={!!reduceMotion} />

      <div className="relative z-10 flex w-full flex-1 items-center justify-center px-5 py-10 text-center sm:min-h-[100vh] sm:flex-none sm:px-10 sm:py-16">
        <div className="mx-auto w-full max-w-[480px]">
        <SprigIcon className="mx-auto mb-4 h-6 w-6 text-mauve" />

        <p className="text-[14px] tracking-[.28em] text-ink">
          YOU ARE CORDIALLY INVITED TO
        </p>
        <p className="text-[14px] tracking-[.28em] text-ink">
          THE WEDDING OF
        </p>

        <div className="mx-auto my-5 flex items-center justify-center gap-2.5">
          <span className="h-px w-9 bg-olive-dark/40" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-9 bg-olive-dark/40" />
        </div>

        <motion.h1
          className="font-display italic leading-[1.18] tracking-[-0.01em] text-wine"
          style={{ textShadow: "0 6px 28px rgba(255, 251, 244, 0.65)" }}
          variants={nameContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={nameLine}
            className="block whitespace-nowrap text-[clamp(26px,7vw,46px)] font-medium"
          >
            Benjamin Campbell
          </motion.span>
          <motion.span
            variants={nameLine}
            className="my-1.5 block text-[clamp(32px,7vw,44px)] leading-none tracking-normal text-mauve"
            style={{ fontFamily: "'Mrs Saint Delafield', cursive" }}
          >
            &amp;
          </motion.span>
          <motion.span
            variants={nameLine}
            className="block whitespace-nowrap text-[clamp(26px,7vw,46px)] font-medium"
          >
            Rofamae Blase
          </motion.span>
        </motion.h1>

        {/* Details card */}
        <div className="mx-auto mt-9 flex max-w-[420px] items-center justify-center gap-3 rounded-2xl border border-olive-dark/15 bg-paper/85 px-4 py-4 shadow-[0_8px_24px_-12px_rgba(51,58,34,0.35)] backdrop-blur-sm sm:gap-7 sm:px-7 sm:py-5">
          <div className="flex items-center gap-2 text-olive-dark sm:gap-3">
            <CalendarIcon className="h-5 w-5 shrink-0 sm:h-7 sm:w-7" />
            <div className="text-left leading-tight">
              <div className="whitespace-nowrap text-[12px] tracking-wide sm:text-[15px]">
                Wednesday
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[20px] font-semibold text-wine sm:text-[28px]">
                  23
                </span>
                <span className="whitespace-nowrap text-[10px] tracking-wide text-olive-dark/80 sm:text-[13px]">
                  September 2026
                </span>
              </div>
            </div>
          </div>

          <div className="h-10 w-px shrink-0 bg-olive-dark/20" />

          <div className="flex items-center gap-2 text-olive-dark sm:gap-2.5">
            <ClockIcon className="h-5 w-5 shrink-0 sm:h-7 sm:w-7" />
            <span className="whitespace-nowrap text-[14px] tracking-wide sm:text-[17px]">
              4:00 PM
            </span>
          </div>
        </div>

        <p className="mx-auto mt-4 flex max-w-[340px] items-start justify-center gap-1.5 text-center text-[13px] leading-snug tracking-[.02em] text-ink sm:max-w-none sm:text-[16px] sm:tracking-[.05em]">
          <PinIcon className="mt-0.5 h-[15px] w-[15px] shrink-0 sm:mt-0 sm:h-[18px] sm:w-[18px]" />
          <span>Eagle&apos;s Ridge, Diversion Road, Davao City</span>
        </p>

        <div className="mt-7 flex items-center justify-center gap-2 text-olive-dark/40 sm:gap-3">
          <span className="h-px w-7 bg-olive-dark/30 sm:w-9" />
          <SprigIcon className="h-3.5 w-3.5 shrink-0 rotate-90 text-mauve/70" />
          <span className="h-px w-7 bg-olive-dark/30 sm:w-9" />
        </div>
        <p className="mt-2 text-[11px] tracking-[.2em] text-mauve sm:text-[13px] sm:tracking-[.32em]">
          TOGETHER FOREVER
        </p>
        </div>
      </div>
    </section>
  );
}
