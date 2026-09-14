"use client";

import { useState } from "react";

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

type Attendance = "yes" | "no";

export default function AttendanceStep({
  onContinue,
  submitting,
}: {
  onContinue: (attending: boolean) => void;
  submitting: boolean;
}) {
  const [choice, setChoice] = useState<Attendance | null>(null);

  const options: { value: Attendance; label: string }[] = [
    { value: "yes", label: "Yes, I'll be there" },
    { value: "no", label: "Sorry, I can't make it" },
  ];

  return (
    <div>
      <p className="mb-6 text-center font-display text-[26px] italic tracking-[-0.01em] text-wine">
        Will you be attending?
      </p>

      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setChoice(opt.value)}
            className={`flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left text-[15px] transition-colors ${
              choice === opt.value
                ? "border-wine/50 bg-wine/[0.06] text-wine"
                : "border-olive-dark/15 bg-paper/60 text-ink hover:border-olive-dark/30"
            }`}
          >
            <span>{opt.label}</span>
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                choice === opt.value
                  ? "border-wine bg-wine text-paper"
                  : "border-olive-dark/25 text-transparent"
              }`}
            >
              <CheckIcon className="h-3 w-3" />
            </span>
          </button>
        ))}
      </div>

      {choice && (
        <button
          type="button"
          disabled={submitting}
          onClick={() => onContinue(choice === "yes")}
          className="mt-6 w-full rounded-full bg-olive-dark px-6 py-3 text-[13px] tracking-[.15em] text-paper transition-opacity disabled:opacity-60"
        >
          CONTINUE
        </button>
      )}
    </div>
  );
}
