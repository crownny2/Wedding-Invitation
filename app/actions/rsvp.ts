"use server";

import { createClient } from "@/lib/supabase/server";

export type RsvpResult = { ok: true } | { ok: false; error: string };

export async function submitDecline(input: {
  name: string;
  message: string;
}): Promise<RsvpResult> {
  const name = input.name.trim();
  const message = input.message.trim();

  if (!name) {
    return { ok: false, error: "Please enter your name." };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("rsvps").insert({
    name,
    guest_count: null,
    message: message || null,
    attending: false,
  });

  if (error) {
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}

export async function submitAttendance(input: {
  name: string;
  guestCount: number;
  message: string;
}): Promise<RsvpResult> {
  const name = input.name.trim();
  const guestCount = Math.min(Math.max(Math.round(input.guestCount), 1), 10);
  const message = input.message.trim();

  if (!name) {
    return { ok: false, error: "Please enter your name." };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("rsvps").insert({
    name,
    guest_count: guestCount,
    message: message || null,
    attending: true,
  });

  if (error) {
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}
