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

export default function RSVPConfirmation({ name }: { name: string }) {
  return (
    <div className="py-4 text-center">
      <SprigIcon className="mx-auto mb-4 h-7 w-7 text-mauve" />
      <p className="font-display text-[28px] italic tracking-[-0.01em] text-wine">
        Thank You, {name}! 🤍
      </p>
      <p className="mx-auto mt-3 max-w-[340px] text-[15px] italic leading-relaxed text-ink/85">
        We&apos;re so excited to celebrate with you on our special day.
      </p>
      <p className="mt-1 text-[15px] italic text-ink/85">
        See you at the wedding! 🌿
      </p>
    </div>
  );
}
