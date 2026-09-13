"use client";

import { useEffect, useState } from "react";
import CornerFloral from "./CornerFloral";
import VineFlourish from "./VineFlourish";

const WEDDING_DATE = new Date("2026-09-23T16:00:00+08:00").getTime();

function getTimeLeft() {
  const diff = Math.max(WEDDING_DATE - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    secs: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
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

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 20.5s-7.6-4.9-10.2-9.6C.4 8 1.6 4.6 4.9 3.7c2-.5 4 .3 5.1 2 .3.5.7 1.3 2 1.3s1.7-.8 2-1.3c1.1-1.7 3.1-2.5 5.1-2 3.3.9 4.5 4.3 3.1 7.2C19.6 15.6 12 20.5 12 20.5Z" />
    </svg>
  );
}

function DoubleHeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" fill="currentColor" className={className}>
      <path d="M12.5 18S5.8 13.9 3.6 9.9C2.3 7.4 3.3 4.5 6 3.8c1.7-.4 3.4.3 4.3 1.7.3.5.6 1 1.4 1s1.1-.5 1.4-1c.9-1.4 2.6-2.1 4.3-1.7 2.7.7 3.7 3.6 2.4 6.1C17.4 13.9 12.5 18 12.5 18Z" />
      <path d="M20 16S14.5 12.6 12.7 9.4c-1-1.9-.2-4.2 1.9-4.8 1.4-.4 2.8.2 3.6 1.4.2.4.5.8 1.1.8s.9-.4 1.1-.8c.8-1.2 2.2-1.8 3.6-1.4 2.1.6 2.9 2.9 1.9 4.8C24.1 12.6 20 16 20 16Z" />
    </svg>
  );
}

function DiamondAccent({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`hidden items-center gap-2 text-mauve/60 md:flex ${
        flip ? "flex-row-reverse" : ""
      }`}
    >
      <span className="h-px w-16 bg-mauve/35 lg:w-24" />
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 shrink-0">
        <path d="M8 0 9.5 6.5 16 8l-6.5 1.5L8 16 6.5 9.5 0 8l6.5-1.5Z" />
      </svg>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(
    null
  );

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: Array<[string, number]> = [
    ["Days", time?.days ?? 0],
    ["Hours", time?.hours ?? 0],
    ["Minutes", time?.mins ?? 0],
    ["Seconds", time?.secs ?? 0],
  ];

  return (
    <section className="relative overflow-hidden bg-paper px-5 py-16 sm:py-20">
      <CornerFloral position="tl" />
      <CornerFloral position="tr" />
      <CornerFloral position="bl" />
      <CornerFloral position="br" />

      <div className="relative z-10 mx-auto max-w-[760px] text-center">
        <VineFlourish className="absolute bottom-0 left-0 hidden h-20 w-20 text-wine/70 sm:block" />
        <VineFlourish
          flip
          className="absolute bottom-0 right-0 hidden h-20 w-20 text-wine/70 sm:block"
        />

        <SprigIcon className="mx-auto mb-3 h-6 w-6 text-mauve" />

        <p className="text-[15px] tracking-[.28em] text-ink">
          COUNTING DOWN TO THE CEREMONY
        </p>

        <div className="mx-auto mb-10 mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-14 bg-mauve/45 sm:w-20" />
          <HeartIcon className="h-3 w-3 text-mauve" />
          <span className="h-px w-14 bg-mauve/45 sm:w-20" />
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <DiamondAccent />

          {units.map(([label, value]) => (
            // Each of these is a natural spot for a per-tick flip/scale transition
            <div
              key={label}
              className="flex w-[74px] flex-col items-center rounded-2xl border border-olive-dark/10 bg-paper/80 py-4 shadow-[0_10px_30px_-15px_rgba(51,58,34,0.4)] backdrop-blur-sm sm:w-[110px] sm:py-6"
            >
              <span className="font-display text-[32px] font-semibold leading-none text-olive-dark sm:text-[46px]">
                {pad(value)}
              </span>
              <span className="mt-2 text-[11px] tracking-[.18em] text-olive-dark sm:text-[13px] sm:tracking-[.22em]">
                {label.toUpperCase()}
              </span>
              <SprigIcon className="mt-2 h-3 w-3 text-mauve/60" />
            </div>
          ))}

          <DiamondAccent flip />
        </div>

        <div className="mx-auto mt-10 flex items-center justify-center gap-3">
          <span className="h-px w-14 bg-mauve/45 sm:w-20" />
          <DoubleHeartIcon className="h-4 w-6 text-mauve" />
          <span className="h-px w-14 bg-mauve/45 sm:w-20" />
        </div>
      </div>
    </section>
  );
}
