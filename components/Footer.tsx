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

export default function Footer() {
  return (
    <footer className="bg-olive-dark px-5 py-16 text-center text-cream">
      <SprigIcon className="mx-auto mb-4 h-6 w-6 text-rose" />

      <p className="mb-4 font-display text-[42px] italic tracking-[.01em] text-rose">
        Benjamin &amp; Rofamae
      </p>

      <div className="mx-auto mb-5 flex items-center justify-center gap-3">
        <span className="h-px w-14 bg-rose/40 sm:w-20" />
        <HeartIcon className="h-3 w-3 text-rose" />
        <span className="h-px w-14 bg-rose/40 sm:w-20" />
      </div>

      <p className="my-1.5 text-[17px] tracking-[.04em]">
        September 23, 2026 &middot; 4:00 PM
      </p>
      <p className="my-1.5 text-[17px] tracking-[.04em]">
        Eagle&apos;s Ridge, Diversion Road, Davao City
      </p>

      <div className="mx-auto mt-7 flex items-center justify-center gap-3 text-rose/50">
        <span className="h-px w-9 bg-rose/30" />
        <SprigIcon className="h-3.5 w-3.5 rotate-90" />
        <span className="h-px w-9 bg-rose/30" />
      </div>
    </footer>
  );
}
