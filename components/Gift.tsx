import CornerFloral from "./CornerFloral";

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

const TICKET_CLIP =
  "polygon(14px 0,calc(100% - 14px) 0,100% 14px,100% calc(100% - 14px),calc(100% - 14px) 100%,14px 100%,0 calc(100% - 14px),0 14px)";

export default function Gift() {
  return (
    <section className="relative overflow-hidden bg-paper py-16 sm:py-20">
      <CornerFloral position="tl" top="top-10 sm:top-14" />
      <CornerFloral position="tr" top="top-10 sm:top-14" />
      <CornerFloral position="bl" bottom="bottom-10 sm:bottom-14" />
      <CornerFloral position="br" bottom="bottom-10 sm:bottom-14" />

      <div className="relative z-10 px-5 text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-olive-dark/30" />
          <SprigIcon className="h-5 w-5 text-mauve" />
          <span className="h-px w-10 bg-olive-dark/30" />
        </div>

        <p className="font-serif text-[36px] italic text-wine sm:text-[46px]">
          Notes on Gift
        </p>

        <div className="mt-3 mb-10 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-olive-dark/30" />
          <HeartIcon className="h-3 w-3 text-mauve" />
          <span className="h-px w-10 bg-olive-dark/30" />
        </div>

        <div className="relative mx-auto max-w-[640px]">
          <span className="absolute left-0 top-1/2 z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper" />
          <span className="absolute right-0 top-1/2 z-10 h-6 w-6 -translate-y-1/2 translate-x-1/2 rounded-full bg-paper" />

          <div
            className="border border-mauve/40 bg-cream/80 px-8 py-11 shadow-[0_20px_50px_-30px_rgba(51,58,34,0.4)] sm:px-14 sm:py-12"
            style={{ clipPath: TICKET_CLIP }}
          >
            <div className="mb-5 flex items-center justify-center gap-3 text-mauve/60">
              <span className="h-px w-12 bg-mauve/30" />
              <SprigIcon className="h-4 w-4 text-mauve/70" />
              <span className="h-px w-12 bg-mauve/30" />
            </div>

            <div className="space-y-2 font-serif text-xl italic leading-relaxed text-ink/85 sm:text-[23px]">
              <p>With all that we have, we&apos;ve been truly blessed.</p>
              <p>Your presence and prayers are all that we request.</p>
              <p>But if you desire to give nonetheless,</p>
              <p>a monetary gift is one we suggest.</p>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3 text-mauve/60">
              <span className="h-px w-12 bg-mauve/30" />
              <SprigIcon className="h-4 w-4 rotate-180 text-mauve/70" />
              <span className="h-px w-12 bg-mauve/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
