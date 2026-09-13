"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import CornerFloral from "./CornerFloral";
import VineFlourish from "./VineFlourish";

const LUXE_EASE = [0.16, 1, 0.3, 1] as const;

const swatches = ["#3E4A2E", "#6B7A4F", "#B98A94", "#CBA3A3", "#F3ECDD"];

// Collapses to the resting state when reduced motion is preferred, so the
// card can never get stuck mid-transition if the preference is detected
// after mount (see Hero.tsx for the same pattern).
function getRevealVariants(reduceMotion: boolean): Variants {
  if (reduceMotion) {
    return { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: LUXE_EASE },
    },
  };
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

function HeartOutlineIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      className={className}
    >
      <path d="M12 20.3s-7.3-4.7-9.8-9.2C.7 7.8 1.9 4.6 5 3.8c1.9-.5 3.8.3 4.8 1.9.3.5.7 1.2 1.9 1.2s1.6-.7 1.9-1.2c1-1.6 2.9-2.4 4.8-1.9 3.1.8 4.3 4 3.1 7.3-2.5 4.5-9.5 9.2-9.5 9.2Z" />
    </svg>
  );
}

function TwinHeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      className={className}
    >
      <path d="M11.5 17.5S5.5 13.7 3.6 10.1c-1.1-2.1-.2-4.6 2.1-5.2 1.5-.4 3 .3 3.8 1.5.3.4.5.9 1.2.9s1-.5 1.2-.9c.8-1.2 2.3-1.9 3.8-1.5 2.3.6 3.2 3.1 2.1 5.2-1.9 3.6-6.3 7.4-6.3 7.4Z" />
      <path d="M19 15.7s-4.6-3.2-6.1-6.1c-.9-1.7-.1-3.7 1.7-4.2 1.2-.3 2.4.3 3 1.2.3.4.4.7 1 .7s.7-.3 1-.7c.6-.9 1.8-1.5 3-1.2 1.8.5 2.6 2.5 1.7 4.2-1.5 2.9-5.3 6.1-5.3 6.1Z" />
    </svg>
  );
}

function EnvelopeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      className={className}
    >
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

function DressIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      className={className}
    >
      <circle cx="12" cy="4" r="1.2" />
      <path d="M7.5 6.5h9" />
      <path d="M9.5 6.5 5 20.5h14L13.5 6.5" />
    </svg>
  );
}

function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      className={className}
    >
      <path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16Z" />
      <path d="M6.5 17.5c4-4 8-7.5 11.5-11.5" />
    </svg>
  );
}

function DiamondDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2.5 ${className}`}>
      <span className="h-px w-8 bg-mauve/30" />
      <span className="h-1.5 w-1.5 rotate-45 bg-wine/70" />
      <span className="h-px w-8 bg-mauve/30" />
    </div>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <p>
      <LeafIcon className="mr-1.5 inline-block h-3 w-3 -translate-y-px text-wine/60" />
      {children}
    </p>
  );
}

function Column({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 py-9 text-center sm:px-9 lg:px-11">
      <div className="mx-auto mb-3 flex h-7 items-center justify-center text-olive-dark">
        {icon}
      </div>
      <h3 className="font-display text-[30px] italic tracking-[-0.01em] text-wine sm:text-[36px]">
        {title}
      </h3>
      <DiamondDivider className="my-3" />
      <div className="space-y-1 text-base leading-relaxed text-ink/85 sm:text-[17px]">
        {children}
      </div>
    </div>
  );
}

export default function Details() {
  const reduceMotion = useReducedMotion();
  const reveal = getRevealVariants(!!reduceMotion);

  return (
    <section className="relative overflow-hidden bg-paper py-16 sm:py-20">
      <CornerFloral position="tl" top="top-[150px] sm:top-[168px]" />
      <CornerFloral position="tr" top="top-[150px] sm:top-[168px]" />
      <CornerFloral position="bl" />
      <CornerFloral position="br" />

      <div className="relative z-10">
        <p className="mb-3 text-center font-serif text-[34px] italic text-wine sm:text-[40px]">
          The Details
        </p>
        <div className="mx-auto mb-10 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-olive-dark/30" />
          <SprigIcon className="h-3.5 w-3.5 rotate-90 text-mauve/70" />
          <span className="h-px w-10 bg-olive-dark/30" />
        </div>

        <motion.div
          className="relative mx-auto w-[92vw] max-w-[1600px] rounded-[26px] border border-olive-dark/25 bg-cream/70 shadow-[0_30px_70px_-40px_rgba(51,58,34,0.45)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          variants={reveal}
        >
          <HeartOutlineIcon className="absolute left-[8%] top-0 h-4 w-4 -translate-y-1/2 text-mauve/70" />
          <HeartOutlineIcon className="absolute right-[8%] top-0 h-4 w-4 -translate-y-1/2 text-mauve/70" />

          <VineFlourish className="absolute bottom-4 left-4 hidden h-20 w-20 text-wine/70 sm:block" />
          <VineFlourish
            flip
            className="absolute bottom-4 right-4 hidden h-20 w-20 text-wine/70 sm:block"
          />

          <div className="relative z-10 grid grid-cols-1 divide-y divide-olive-dark/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <Column icon={<EnvelopeIcon className="h-7 w-7" />} title="RSVP">
              <Line>We have reserved seat(s) for you.</Line>
              <Line>
                The favor of your reply is requested on or before September
                15, 2026.
              </Line>
              <Line>Please message us to confirm.</Line>
            </Column>

            <Column icon={<DressIcon className="h-7 w-7" />} title="Attire">
              <Line>Semi-Formal</Line>
              <Line>Kindly refrain from wearing white.</Line>

              <DiamondDivider className="my-4" />

              <p className="font-display text-xl italic tracking-[-0.01em] text-wine">
                Color Palette
              </p>
              <div className="my-3.5 flex justify-center gap-2.5">
                {swatches.map((color) => (
                  <span
                    key={color}
                    className="h-9 w-9 rounded-md border border-black/10 shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <Line>
                <span className="italic">
                  We would love to see you in these shades.
                </span>
              </Line>
            </Column>

            <Column
              icon={<TwinHeartIcon className="h-5 w-8" />}
              title="Reminders"
            >
              <Line>
                Given our venue&apos;s strict capacity, the invitation is
                specifically for the person named only.
              </Line>
              <Line>
                We kindly ask that no additional guests be brought, and
                respectfully request no children at our wedding. Thank you!
              </Line>
            </Column>
          </div>

          <div className="relative z-10 flex justify-center pb-5">
            <HeartOutlineIcon className="h-4 w-4 text-mauve/70" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
