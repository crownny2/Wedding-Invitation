"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSubmitting(false);

    if (signInError) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin/rsvp");
    router.refresh();
  };

  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-cream px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[380px] rounded-2xl border border-olive-dark/15 bg-paper/70 px-7 py-9 shadow-[0_20px_50px_-30px_rgba(51,58,34,0.4)]"
      >
        <p className="mb-1 text-center font-display text-[26px] italic tracking-[-0.01em] text-wine">
          Admin Sign In
        </p>
        <p className="mb-6 text-center text-[13px] text-ink/60">
          RSVP dashboard access
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[12px] tracking-[.12em] text-olive-dark/80">
              EMAIL
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-olive-dark/15 bg-paper/60 px-4 py-2.5 text-[15px] text-ink shadow-sm outline-none focus:border-wine/50"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] tracking-[.12em] text-olive-dark/80">
              PASSWORD
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-olive-dark/15 bg-paper/60 px-4 py-2.5 text-[15px] text-ink shadow-sm outline-none focus:border-wine/50"
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
          {submitting ? "SIGNING IN…" : "SIGN IN"}
        </button>
      </form>
    </main>
  );
}
