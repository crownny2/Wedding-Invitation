"use client";

import { useState } from "react";

const MAX_GUESTS = 10;

export default function GuestInformationStep({
  attending,
  onSubmit,
  submitting,
  error,
}: {
  attending: boolean;
  onSubmit: (data: { name: string; guestCount: number; message: string }) => void;
  submitting: boolean;
  error: string | null;
}) {
  const [name, setName] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const nameIsEmpty = touched && name.trim().length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!name.trim()) return;
    onSubmit({ name, guestCount, message });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-6 text-center text-[15px] italic text-ink/85">
        {attending
          ? "We're so happy you'll be joining us! 🤍"
          : "We're sorry you can't make it — thank you for letting us know. 🤍"}
      </p>

      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-[12px] tracking-[.12em] text-olive-dark/80">
            YOUR NAME
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Full name"
            className={`w-full rounded-lg border bg-paper/60 px-4 py-2.5 text-[15px] text-ink shadow-sm outline-none transition-colors placeholder:text-ink/35 focus:border-wine/50 ${
              nameIsEmpty ? "border-wine/60" : "border-olive-dark/15"
            }`}
          />
          {nameIsEmpty && (
            <p className="mt-1.5 text-[13px] text-wine">
              Please enter your name.
            </p>
          )}
        </div>

        {attending && (
          <div>
            <label className="mb-1.5 block text-[12px] tracking-[.12em] text-olive-dark/80">
              NUMBER OF GUESTS
            </label>
            <div className="flex w-fit items-center gap-4 rounded-lg border border-olive-dark/15 bg-paper/60 px-4 py-2 shadow-sm">
              <button
                type="button"
                aria-label="Decrease guests"
                onClick={() => setGuestCount((n) => Math.max(1, n - 1))}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-olive-dark/25 text-olive-dark disabled:opacity-30"
                disabled={guestCount <= 1}
              >
                −
              </button>
              <span className="w-4 text-center text-[15px] text-ink">
                {guestCount}
              </span>
              <button
                type="button"
                aria-label="Increase guests"
                onClick={() => setGuestCount((n) => Math.min(MAX_GUESTS, n + 1))}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-olive-dark/25 text-olive-dark disabled:opacity-30"
                disabled={guestCount >= MAX_GUESTS}
              >
                +
              </button>
            </div>
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-[12px] tracking-[.12em] text-olive-dark/80">
            MESSAGE FOR THE COUPLE (OPTIONAL)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Leave a note for Benjamin & Rofamae..."
            className="w-full resize-none rounded-lg border border-olive-dark/15 bg-paper/60 px-4 py-2.5 text-[15px] text-ink shadow-sm outline-none transition-colors placeholder:text-ink/35 focus:border-wine/50"
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-center text-[13px] text-wine">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-7 w-full rounded-full bg-olive-dark px-6 py-3 text-[13px] tracking-[.15em] text-paper transition-opacity disabled:opacity-60"
      >
        {submitting
          ? "SUBMITTING…"
          : attending
            ? "CONFIRM ATTENDANCE"
            : "SUBMIT RSVP"}
      </button>
    </form>
  );
}
