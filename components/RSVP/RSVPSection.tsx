"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { submitAttendance, submitDecline } from "@/app/actions/rsvp";
import CornerFloral from "../CornerFloral";
import AttendanceStep from "./AttendanceStep";
import GuestInformationStep from "./GuestInformationStep";
import RSVPConfirmation from "./RSVPConfirmation";
import RSVPProgress from "./RSVPProgress";

const LUXE_EASE = [0.16, 1, 0.3, 1] as const;

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

type Step = "attendance" | "guest-info" | "confirmed";

export default function RSVPSection() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<Step>("attendance");
  const [attending, setAttending] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedName, setConfirmedName] = useState("");

  const handleGuestSubmit = async (data: {
    name: string;
    guestCount: number;
    message: string;
  }) => {
    setSubmitting(true);
    setError(null);
    const result = attending
      ? await submitAttendance(data)
      : await submitDecline({ name: data.name, message: data.message });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setConfirmedName(data.name.trim());
    setStep("confirmed");
  };

  const fadeVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
      };

  const stepNumber = step === "attendance" ? 1 : step === "guest-info" ? 2 : 3;

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-paper px-5 py-16 sm:py-20"
    >
      <CornerFloral position="tl" top="top-10 sm:top-14" />
      <CornerFloral position="tr" top="top-10 sm:top-14" />
      <CornerFloral position="bl" bottom="bottom-10 sm:bottom-14" />
      <CornerFloral position="br" bottom="bottom-10 sm:bottom-14" />

      <div className="relative z-10">
        <p className="mb-3 text-center font-serif text-[36px] italic text-wine sm:text-[46px]">
          RSVP
        </p>
        <div className="mx-auto mb-10 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-olive-dark/30" />
          <SprigIcon className="h-3.5 w-3.5 rotate-90 text-mauve/70" />
          <span className="h-px w-10 bg-olive-dark/30" />
        </div>

      <div className="mx-auto max-w-[440px] rounded-2xl border border-olive-dark/15 bg-cream/70 px-7 py-9 shadow-[0_20px_50px_-30px_rgba(51,58,34,0.4)] sm:px-9">
        <RSVPProgress step={stepNumber} totalSteps={3} />

        <AnimatePresence mode="wait">
          {step === "attendance" && (
            <motion.div
              key="attendance"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5, ease: LUXE_EASE }}
            >
              <AttendanceStep
                submitting={submitting}
                onContinue={(isAttending) => {
                  setAttending(isAttending);
                  setStep("guest-info");
                }}
              />
            </motion.div>
          )}

          {step === "guest-info" && (
            <motion.div
              key="guest-info"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5, ease: LUXE_EASE }}
            >
              <GuestInformationStep
                attending={attending}
                submitting={submitting}
                error={error}
                onSubmit={handleGuestSubmit}
              />
            </motion.div>
          )}

          {step === "confirmed" && (
            <motion.div
              key="confirmed"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, ease: LUXE_EASE }}
            >
              <RSVPConfirmation name={confirmedName} attending={attending} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

        <div className="mt-9 flex items-center justify-center gap-3 text-olive-dark/40">
          <span className="h-px w-9 bg-olive-dark/30" />
          <HeartIcon className="h-3 w-3 text-mauve/70" />
          <span className="h-px w-9 bg-olive-dark/30" />
        </div>
      </div>
    </section>
  );
}
